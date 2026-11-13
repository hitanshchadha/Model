# AICoE Crop Yield Prediction Website

A React + Vite site showing district-level crop yield predictions for India.
It has no backend: all predictions are stored as JSON files in this repo.

## Pages

| Path | Page | Crops |
|---|---|---|
| `/` | Crop Yield Prediction (with advisory) | Wheat, Corn |
| `/early_prediction` | Early Prediction (8 weeks before harvest → 0) | Wheat, Rice |
| `/variability_prediction` | Variability Prediction | Wheat, Rice |
| `/next_crop_cycle` | Next Crop Cycle (with advisory) | Wheat, Rice |
| `/cyp_with_crop` | CYP with Crop Model | Wheat |

## How to update the site

Everything is defined in **`src/siteConfig.js`**: pages, crops, model details, data files, images and maps.

- **Predictions**: replace the matching file in `src/data/`. Keep the same columns:
  - predictions: `id`, `district`, `actual`, `predicted`
  - early prediction: `id`, `district`, `actual`, `week_8` … `week_0`
  - baselines (for advisories): `id`, `district`, `yield`
- **Model details** (RMSE, MAE, model name …): edit the `info` rows in `src/siteConfig.js`.
- **Performance images**: replace files in `src/images/`.
- **Maps**: Datawrapper embeds. Set these in Vercel → Settings → Environment Variables, then redeploy:
  `VITE_MAP_WHEAT_URL`, `VITE_MAP_RICE_URL`, `VITE_MAP_CORN_URL` (see `.env.example`).
- **Advisory text**: `src/components/Advisory.jsx`.
- **Logo, banner, footer**: `src/images/logo.png`, `src/images/hero.jpg`, `SITE` in `src/siteConfig.js`.

## Run locally

```bash
npm install
npm run dev
```

## Project structure

```
src/
  main.jsx                     routes (one per page in siteConfig.js)
  siteConfig.js                all site content and settings
  components/Layout.jsx        header menu, banner, footer
  components/PredictionPage.jsx  the page used for every prediction page
  components/MapEmbed.jsx      Datawrapper map embed
  components/Advisory.jsx      advisory text
  data/                        prediction data (JSON)
  images/                      logo, banner, model performance images
```
