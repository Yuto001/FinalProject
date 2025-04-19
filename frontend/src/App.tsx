import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import AddEntertainer from './components/AddEntertainer';
import EntertainerPage from './pages/EntertainerPage';
import EntertainerDetailPage from './pages/EntertainerDetailPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/entertainer" element={<EntertainerPage />} />
          <Route
            path="/entertainer/:entertainerId"
            element={<EntertainerDetailPage />}
          />
          <Route path="/entertainer/add" element={<AddEntertainer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
