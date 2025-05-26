import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Instructions } from './pages/Instructions';
import { Diagnosis } from './pages/Diagnosis';
import { Results } from './pages/Results';

export const App = (): JSX.Element => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/diagnosis" element={<Diagnosis />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  </BrowserRouter>
);
export default App;
