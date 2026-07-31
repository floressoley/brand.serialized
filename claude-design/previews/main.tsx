import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../tokens/index.css'
import './site/site.css'
import { Layout } from './site/Layout'
import { Introduction } from './site/pages/Introduction'
import { Voice } from './site/pages/Voice'
import { Identity } from './site/pages/Identity'
import { Color } from './site/pages/Color'
import { Typography } from './site/pages/Typography'
import { SubBrands } from './site/pages/SubBrands'
import { InUse } from './site/pages/InUse'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Introduction />} />
          <Route path="voice" element={<Voice />} />
          <Route path="identity" element={<Identity />} />
          <Route path="color" element={<Color />} />
          <Route path="typography" element={<Typography />} />
          <Route path="sub-brands" element={<SubBrands />} />
          <Route path="in-use" element={<InUse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
