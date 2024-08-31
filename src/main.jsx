import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Variability_prediction from './variability_prediction.jsx'
import Early_prediction from './early_prediction.jsx'
import NextCropCycle from './ncc.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CYP_with_crop from './cyp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
<Routes>
        <Route path="/" element={<App title='App'></App>} />
      <Route path="/variability_prediction" element={<Variability_prediction title='About'></Variability_prediction>} />
      <Route path="/early_prediction" element={<Early_prediction title='About'></Early_prediction>} />
      <Route path="/next_crop_cycle" element={<NextCropCycle title='About'></NextCropCycle>} />\
      <Route path="/cyp_with_crop" element={<CYP_with_crop title='About'></CYP_with_crop>} />
      </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
