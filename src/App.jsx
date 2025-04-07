import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ParticipantPage from './pages/ParticipantPage';
import FacilitatorPage from './pages/FacilitatorPage';
import TailwindTest from './components/test/TailwindTest';
import InlineStyleTest from './components/test/InlineStyleTest';
import CssModuleTest from './components/test/CssModuleTest';
import VanillaCssTest from './components/test/VanillaCssTest';
import GlobalCssTest from './components/test/GlobalCssTest';
import GroqTest from './components/test/GroqTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ParticipantPage />} />
        <Route path="/admin" element={<FacilitatorPage />} />
        <Route path="/test" element={<TailwindTest />} />
        <Route path="/inline" element={<InlineStyleTest />} />
        <Route path="/module" element={<CssModuleTest />} />
        <Route path="/vanilla" element={<VanillaCssTest />} />
        <Route path="/global" element={<GlobalCssTest />} />
        <Route path="/groq-test" element={<GroqTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
