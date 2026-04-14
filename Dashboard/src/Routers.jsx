import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./files/MainPage";
import Map from "./files/Map";
import ServiceProvidersDashboard from "./files/ServiceProvidersDashboard";
import Chart from "./files/Chart";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/chart" element={<Chart />} />
        <Route
          path="/serviceDashboard"
          element={<ServiceProvidersDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
