import React, { useState, useEffect } from "react";
import { GeoJSON } from "react-leaflet";

const MapDataLayer = () => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    const loadAllWards = async () => {
      try {
        const response = await fetch(
          "https://dashboard-backend-nbt7.onrender.com/map/getWards",
        );
        const data = await response.json();
        setGeoData(data);
      } catch (error) {
        console.error("Error loading wards:", error);
      }
    };
    loadAllWards();
  }, []);

  // Define colors based on your "Important Data" (e.g., density or quality)
  const getStyle = (feature) => {
    const val = feature.properties.density_final;
    return {
      fillColor:
        val > 500
          ? "#065f46" // Dark Emerald
          : val > 200
            ? "#10b981" // Emerald
            : "#a7f3d0", // Light Emerald
      weight: 0.5,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature, layer) => {
    layer.bindPopup(`
      <div class="p-2">
        <strong>${feature.properties.GaPa_NaPa} - Ward ${feature.properties.NEW_WARD_N}</strong><br/>
        District: ${feature.properties.DISTRICT}<br/>
        Data: ${feature.properties.density_final}
      </div>
    `);
  };

  return geoData ? (
    <GeoJSON data={geoData} style={getStyle} onEachFeature={onEachFeature} />
  ) : null;
};

export default MapDataLayer;
