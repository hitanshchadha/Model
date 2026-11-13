import { useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MapEmbed from './MapEmbed.jsx';
import Advisory from './Advisory.jsx';
import { round } from '../format.js';

const ALL_WEEKS = 'all';

export default function PredictionPage({ page }) {
  const [cropKey, setCropKey] = useState('');
  const [selected, setSelected] = useState([]);
  const [week, setWeek] = useState(ALL_WEEKS);
  const [results, setResults] = useState(null);
  const [showPerf, setShowPerf] = useState(false);
  const [showBaseline, setShowBaseline] = useState(false);
  const [advisoryId, setAdvisoryId] = useState(null);

  const crop = page.crops.find((c) => c.key === cropKey);
  const byId = useMemo(() => new Map((crop?.predictions ?? []).map((r) => [r.id, r])), [crop]);
  const baselineById = useMemo(() => new Map((crop?.baseline ?? []).map((r) => [r.id, r])), [crop]);

  const chooseCrop = (key) => {
    setCropKey(key);
    setSelected([]);
    setWeek(ALL_WEEKS);
    setResults(null);
    setShowPerf(false);
    setShowBaseline(false);
    setAdvisoryId(null);
  };

  const predict = () => {
    setResults(selected.map((id) => byId.get(id)).filter(Boolean));
    setAdvisoryId(null);
  };

  const weekColumns = page.weeks ? (week === ALL_WEEKS ? page.weeks : [week]) : null;
  const advisoryRow = advisoryId != null ? byId.get(advisoryId) : null;
  const advisoryBase = advisoryId != null ? baselineById.get(advisoryId) : null;

  return (
    <section className="page-section">
      <h2 className="page-title">{page.title}</h2>

      <div className="controls">
        <FormControl sx={{ m: 1, width: 300, maxWidth: '100%' }}>
          <InputLabel id="crop-label">Crop</InputLabel>
          <Select labelId="crop-label" value={cropKey} onChange={(e) => chooseCrop(e.target.value)}
            input={<OutlinedInput label="Crop" />}>
            {page.crops.map((c) => <MenuItem key={c.key} value={c.key}>{c.label}</MenuItem>)}
            {(page.comingSoon ?? []).map((name) => (
              <MenuItem key={name} value={name} disabled>{name} (coming soon)</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {crop && (
        <>
          <div className="crop-info card-box">
            <div className="model-info">
              <h3>Data &amp; Model</h3>
              <Table striped bordered hover size="sm">
                <tbody>
                  {crop.info.map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}
                </tbody>
              </Table>
            </div>
            <MapEmbed key={crop.map} src={crop.map} title={crop.mapTitle} />
          </div>

          <div className="controls">
            <FormControl sx={{ m: 1, width: 350, maxWidth: '100%' }}>
              <InputLabel id="district-label">District</InputLabel>
              <Select
                labelId="district-label"
                multiple
                value={selected}
                onChange={(e) => { setSelected(e.target.value); setAdvisoryId(null); }}
                input={<OutlinedInput label="District" />}
                renderValue={(ids) => ids.map((id) => byId.get(id)?.district).join(', ')}
                MenuProps={{ PaperProps: { sx: { maxHeight: 320 } } }}
              >
                {crop.predictions.map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    <Checkbox checked={selected.includes(r.id)} />
                    <ListItemText primary={r.district} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {page.weeks && (
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="week-label">Weeks before harvest</InputLabel>
                <Select labelId="week-label" value={week} onChange={(e) => setWeek(e.target.value)}
                  input={<OutlinedInput label="Weeks before harvest" />}>
                  <MenuItem value={ALL_WEEKS}>All weeks</MenuItem>
                  {page.weeks.map((w) => <MenuItem key={w} value={w}>Week {w}</MenuItem>)}
                </Select>
              </FormControl>
            )}

            <Button className="m-2" onClick={predict} disabled={selected.length === 0}>Predict Yield</Button>
            {crop.performance && (
              <Button className="m-2" variant="outline-primary" onClick={() => setShowPerf((v) => !v)}>
                {showPerf ? 'Hide' : 'Show'} Model Performance
              </Button>
            )}
          </div>

          {results && (
            <div className="results">
              {results.length === 0 ? <p>No predictions available for the selected districts.</p> : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>District</th>
                      <th>Actual</th>
                      {weekColumns
                        ? weekColumns.map((w) => <th key={w}>Week {w}</th>)
                        : <th>Predicted</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r) => (
                      <tr key={r.id}>
                        <td>{r.district}</td>
                        <td>{r.actual}</td>
                        {weekColumns
                          ? weekColumns.map((w) => <td key={w}>{r[`week_${w}`]}</td>)
                          : <td>{r.predicted}</td>}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          )}

          {showPerf && crop.performance && (
            <div className="performance">
              <h3>Model Performance</h3>
              <div className="performance-images">
                {crop.performance.map((src) => <img key={src} src={src} alt={`${crop.label} model performance`} />)}
              </div>
            </div>
          )}

          {page.advisory && crop.baseline && (
            <div className="advisory-section">
              <Button className="m-2" onClick={() => setShowBaseline(true)} disabled={selected.length === 0}>
                {page.advisory.button}
              </Button>

              {showBaseline && selected.length > 0 && (
                <>
                  <p className="hint">Click a row to see the advisory for that district.</p>
                  <Table striped bordered hover className="baseline-table">
                    <thead>
                      <tr><th>District</th><th>{page.advisory.baselineLabel}</th></tr>
                    </thead>
                    <tbody>
                      {selected.map((id) => {
                        const b = baselineById.get(id);
                        return (
                          <tr key={id} className={b ? 'clickable' : ''} onClick={() => b && setAdvisoryId(id)}>
                            <td>{byId.get(id)?.district}</td>
                            <td>{b ? round(b.yield) : 'No data'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </>
              )}

              {advisoryRow && advisoryBase && (
                <Advisory
                  style={page.advisory.style}
                  level={advisoryRow.predicted > advisoryBase.yield ? 'high' : 'low'}
                  district={advisoryRow.district}
                  predicted={advisoryRow.predicted}
                  baseline={advisoryBase.yield}
                />
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
