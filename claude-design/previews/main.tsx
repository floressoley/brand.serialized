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
import { Foundations } from './site/pages/Foundations'
import { Icons } from './site/pages/Icons'
import { DesignSystem } from './site/pages/DesignSystem'
import { SubBrands } from './site/pages/SubBrands'
import { MediaKit } from './site/pages/MediaKit'
import { InUse } from './site/pages/InUse'
import { Landing } from './site/pages/Landing'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Standalone preview, no sidebar shell — still WIP in Figma, not part of the brand-kit nav. */}
        <Route path="landing" element={<Landing />} />
        <Route element={<Layout />}>
          <Route index element={<Introduction />} />
          <Route path="identity" element={<Identity />} />
          <Route path="logos" element={<Logos />} />
          <Route path="color" element={<Color />} />
          <Route path="typography" element={<Typography />} />
          <Route path="foundations" element={<Foundations />} />
          <Route path="icons" element={<Icons />} />
          <Route path="design-system" element={<DesignSystem />} />
          <Route path="sub-brands" element={<SubBrands />} />
          <Route path="media-kit" element={<MediaKit />} />
          <Route path="in-use" element={<InUse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
