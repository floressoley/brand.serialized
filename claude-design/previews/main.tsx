import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../tokens/index.css'
import './site/site.css'
import { Layout } from './site/Layout'
import { Introduction } from './site/pages/Introduction'
import { Identity } from './site/pages/Identity'
import { Logos } from './site/pages/Logos'
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
          <Route path="identity" element={<Identity />} />
          <Route path="logos" element={<Logos />} />
          <Route path="color" element={<Color />} />
          <Route path="typography" element={<Typography />} />
          <Route path="sub-brands" element={<SubBrands />} />
          <Route path="in-use" element={<InUse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
