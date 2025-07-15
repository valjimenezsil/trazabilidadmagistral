import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Entrada from './modules/Entrada.jsx';
import Solicitudes from './modules/Solicitudes.jsx';
import './App.css';

function App() {

    return (
        <Layout>
            <Routes>
                {/* Ruta explícita para /entrada */}
                <Route path="/entrada" element={<Entrada />} />
                <Route path="/solicitudes" element={<Solicitudes />} />

                {/*Default */}
                <Route path="*" element={<Navigate to="/Home" replace />} />
            </Routes>
        </Layout>
    );
}


export default App;