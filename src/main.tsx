import { StrictMode, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import RouterLayout from './components/RouterLayout.tsx';
import App_Etape0 from './etape0/App.tsx';
import App_Etape1 from './etape1/App.tsx';
import App_Etape2 from './etape2/App.tsx';
import App_Etape3 from './etape3/App.tsx';
import App_Etape4 from './etape4/App.tsx';
import App_Etape5 from './etape5/App.tsx';
import App_Etape6 from './etape6/App.tsx';
import App_Etape7 from './etape7/App.tsx';
import NotFound from './components/NotFound.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route element={<RouterLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/etape0" element={<App_Etape0 />} />
            <Route path="/etape1" element={<App_Etape1 />} />
            <Route path="/etape2" element={<App_Etape2 />} />
            <Route path="/etape3" element={<App_Etape3 />} />
            <Route path="/etape4" element={<App_Etape4 />} />
            <Route path="/etape5" element={<App_Etape5 />} />
            <Route path="/etape6" element={<App_Etape6 />} />
            <Route path="/etape7" element={<App_Etape7 />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
)
