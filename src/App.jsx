import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PredictionContextProvider } from './context/PredictionContext';

import './App.css';
import Home from './routes/Home';
import Layout from './routes/Layout';
import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';
import PredictionCreate from './routes/PredictionCreate';
import PredictionDetailPage from './routes/PredictionDetailPage';
import PredictionTemplate from './components/PredictionTemplate';

const App = () => {
  return (
    <PredictionContextProvider>
      <div className="container-lg mx-auto">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/predictions/:id" element={<PredictionDetailPage />} />
              <Route path="/predictions/pending" element={<PredictionTemplate predFilter={"Pending"} />} />
              <Route path="/predictions/concluded" element={<PredictionTemplate predFilter={"Concluded"} />} />
              <Route path="/predictions/create" element={<PredictionCreate />} />
              <Route path="/login" element={<Login /> } />
              <Route path="/register" element={<Register /> } />
              <Route path="/dashboard" element={<Dashboard dashFilter={"Pending"} />} />{/* route for future profile dashboard: */}
              <Route path="/dashboard/my-pending" element={<Dashboard dashFilter={"Pending"} />} />
              <Route path="/dashboard/my-expired" element={<Dashboard dashFilter={"Expired"} />} />
              <Route path="/dashboard/my-concluded" element={<Dashboard dashFilter={"Concluded"} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </PredictionContextProvider>
  );
}

export default App;
