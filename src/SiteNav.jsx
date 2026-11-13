import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

// Links between the site's own pages. Paths are relative, so they always
// stay on whichever domain the site is deployed to.
const PAGES = [
  { path: '/', label: 'Crop Yield Prediction' },
  { path: '/early_prediction', label: 'Early Prediction' },
  { path: '/variability_prediction', label: 'Variability Prediction' },
  { path: '/next_crop_cycle', label: 'Next Crop Cycle' },
  { path: '/cyp_with_crop', label: 'CYP with Crop Model' },
];

export default function SiteNav() {
  return (
    <Nav className="me-auto">
      {PAGES.map((p) => (
        <Nav.Link key={p.path} as={NavLink} to={p.path} end>
          {p.label}
        </Nav.Link>
      ))}
    </Nav>
  );
}
