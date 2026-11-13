// ---------------------------------------------------------------------------
// Everything the site shows is defined in this file.
//
// - To update predictions: replace the JSON file in src/data/ (keep the same
//   column names: id, district, actual, predicted — or week_8 … week_0).
// - To change a map: set the VITE_MAP_* variable in Vercel, or edit MAPS below.
// - To add a page or crop: copy an existing entry and change it.
// ---------------------------------------------------------------------------

import yieldWheat from './data/yield_wheat.json';
import yieldCorn from './data/yield_corn.json';
import yieldWheatAvg from './data/yield_wheat_avg_3yr.json';
import yieldCornAvg from './data/yield_corn_avg_3yr.json';
import earlyWheat from './data/early_wheat.json';
import earlyRice from './data/early_rice.json';
import variabilityWheat from './data/variability_wheat.json';
import variabilityRice from './data/variability_rice.json';
import nccWheat from './data/ncc_wheat.json';
import nccRice from './data/ncc_rice.json';
import nccWheatPresent from './data/ncc_wheat_present.json';
import nccRicePresent from './data/ncc_rice_present.json';
import cypWheat from './data/cyp_wheat.json';

import yieldWheatPerfTable from './images/yield_wheat_performance_table.jpg';
import yieldWheatPerfGraph from './images/yield_wheat_performance_graph.jpg';
import yieldCornPerf from './images/yield_corn_performance.jpg';
import earlyWheatPerf from './images/early_wheat_performance.png';
import earlyRicePerf from './images/early_rice_performance.png';
import variabilityWheatPerf from './images/variability_wheat_performance.png';
import variabilityRicePerf from './images/variability_rice_performance.png';

const env = import.meta.env;

export const SITE = {
  name: 'AICoE',
  footer: '© 2024 BITS Pilani',
};

// Datawrapper map embeds. Replace with your own chart URLs.
export const MAPS = {
  wheat: env.VITE_MAP_WHEAT_URL || 'https://datawrapper.dwcdn.net/yFKAB/1/',
  rice: env.VITE_MAP_RICE_URL || 'https://datawrapper.dwcdn.net/zkBDx/1/',
  corn: env.VITE_MAP_CORN_URL || 'https://datawrapper.dwcdn.net/0qze0/1/',
};

const WEEKS = [8, 7, 6, 5, 4, 3, 2, 1, 0];

// Shared "Data & Model" rows
const landsat = ['Satellite used', 'Landsat-8'];
const imageSeries = ['Data modality', 'Image time series'];
const histogram = ['Data modality', 'Histogram'];
const satran = ['Model', 'SaTran (Foundation Model)'];
const cropYieldNet = ['Model', 'CropYieldNet'];
const training = ['Training data', '2014–2019'];
const predictionFor = ['Prediction for', '2020'];
const unit = ['Unit', 'Bu/ac'];
const metrics = (rmseBest, rmseAvg, maeBest, maeAvg) => [
  ['RMSE (best case)', rmseBest],
  ['RMSE (average ± std dev)', rmseAvg],
  ['MAE (best case)', maeBest],
  ['MAE (average ± std dev)', maeAvg],
];

export const PAGES = [
  {
    path: '/',
    navLabel: 'Crop Yield Prediction',
    title: 'Crop Yield Prediction',
    advisory: {
      button: 'Get average yield for the last 3 years',
      baselineLabel: 'Avg yield for last 3 years',
      style: 'detailed',
    },
    comingSoon: ['Rice', 'Soya'],
    crops: [
      {
        key: 'wheat',
        label: 'Wheat',
        map: MAPS.wheat,
        mapTitle: 'Wheat producing districts',
        info: [landsat, imageSeries, satran, training, predictionFor, ['No. of districts', '356'], unit,
          ...metrics('4.850', '5.189 ± 1.66', '3.381', '3.922 ± 1.41')],
        predictions: yieldWheat,
        baseline: yieldWheatAvg,
        performance: [yieldWheatPerfTable, yieldWheatPerfGraph],
      },
      {
        key: 'corn',
        label: 'Corn',
        map: MAPS.corn,
        mapTitle: 'Corn producing districts',
        info: [landsat, histogram, cropYieldNet, training, predictionFor, ['No. of districts', '450'], unit,
          ...metrics('14.578', '15.875 ± 1.65', '8.554', '9.79 ± 0.93')],
        predictions: yieldCorn,
        baseline: yieldCornAvg,
        performance: [yieldCornPerf],
      },
    ],
  },
  {
    path: '/early_prediction',
    navLabel: 'Early Prediction',
    title: 'Early Prediction',
    weeks: WEEKS,
    crops: [
      {
        key: 'wheat',
        label: 'Wheat',
        map: MAPS.wheat,
        mapTitle: 'Wheat producing districts',
        info: [landsat, imageSeries, satran, training, predictionFor, ['No. of districts', '356'], unit,
          ...metrics('10.763', '11.837 ± 1.16', '9.393', '10.497 ± 1.69')],
        predictions: earlyWheat,
        performance: [earlyWheatPerf],
      },
      {
        key: 'rice',
        label: 'Rice',
        map: MAPS.rice,
        mapTitle: 'Rice producing districts',
        info: [landsat, imageSeries, satran, training, predictionFor, ['No. of districts', '296'], unit,
          ...metrics('7.132', '8.985 ± 1.29', '6.113', '6.984 ± 0.73')],
        predictions: earlyRice,
        performance: [earlyRicePerf],
      },
    ],
  },
  {
    path: '/variability_prediction',
    navLabel: 'Variability Prediction',
    title: 'Variability Prediction',
    crops: [
      {
        key: 'wheat',
        label: 'Wheat',
        map: MAPS.wheat,
        mapTitle: 'Wheat producing districts',
        info: [landsat, imageSeries, satran, training, predictionFor, ['No. of districts', '356'], unit,
          ...metrics('3.850', '4.839 ± 1.32', '2.376', '2.928 ± 1.67')],
        predictions: variabilityWheat,
        performance: [variabilityWheatPerf],
      },
      {
        key: 'rice',
        label: 'Rice',
        map: MAPS.rice,
        mapTitle: 'Rice producing districts',
        info: [landsat, imageSeries, satran, training, predictionFor, ['No. of districts', '296'], unit,
          ...metrics('2.822', '3.736 ± 0.98', '2.061', '2.625 ± 0.83')],
        predictions: variabilityRice,
        performance: [variabilityRicePerf],
      },
    ],
  },
  {
    path: '/next_crop_cycle',
    navLabel: 'Next Crop Cycle',
    title: 'Next Crop Cycle Prediction',
    advisory: {
      button: 'Get present yield',
      baselineLabel: 'Present yield',
      style: 'short',
    },
    crops: [
      {
        key: 'wheat',
        label: 'Wheat',
        map: MAPS.wheat,
        mapTitle: 'Wheat producing districts',
        info: [landsat, histogram, cropYieldNet, training, predictionFor, ['No. of districts', '356'], unit,
          ...metrics('12.758', '13.941 ± 1.83', '10.053', '11.483 ± 0.77')],
        predictions: nccWheat,
        baseline: nccWheatPresent,
      },
      {
        key: 'rice',
        label: 'Rice',
        map: MAPS.rice,
        mapTitle: 'Rice producing districts',
        info: [landsat, histogram, cropYieldNet, training, predictionFor, ['No. of districts', '450'], unit,
          ...metrics('12.019', '12.994 ± 1.24', '9.561', '10.276 ± 1.38')],
        predictions: nccRice,
        baseline: nccRicePresent,
      },
    ],
  },
  {
    path: '/cyp_with_crop',
    navLabel: 'CYP with Crop Model',
    title: 'CYP with Crop Model',
    crops: [
      {
        key: 'wheat',
        label: 'Wheat',
        map: MAPS.wheat,
        mapTitle: 'Wheat producing districts',
        info: [landsat, imageSeries, ['Model', 'APSIM (with Kansas settings)'], training, predictionFor,
          ['No. of districts', '356'], unit],
        predictions: cypWheat,
      },
    ],
  },
];
