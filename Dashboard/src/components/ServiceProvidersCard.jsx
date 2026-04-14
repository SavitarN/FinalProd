import React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellDot } from "lucide-react";

const ServiceProvidersCard = ({ data }) => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((item) => {
        const isExpanded = expandedId === item.WSUC_ID;

        return (
          <motion.div
            key={item.WSUC_ID}
            layout
            onClick={() => setExpandedId(isExpanded ? null : item.WSUC_ID)}
            className={`cursor-pointer transition-all duration-500 overflow-hidden relative
            bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] 
            ${
              isExpanded
                ? "col-span-full md:col-span-2 lg:col-span-2 z-20 shadow-2xl"
                : "h-fit hover:bg-white/15"
            }`}
          >
            {/* Header / Initial View */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-black tracking-widest text-blue-300 uppercase">
                  ID: {item.WSUC_ID}
                </span>
                <div
                  className={`px-3 py-1 rounded-full text-[10px] font-bold border 
                ${
                  item["Service_Coverage_Prerequisite"] === "Yes"
                    ? "border-green-500/50 text-green-400 bg-green-500/10"
                    : "border-red-500/50 text-red-400 bg-red-500/10"
                }`}
                >
                  Business Plan: {item.Service_Coverage_Prerequisite}
                </div>
              </div>

              <h3
                className={`text-2xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3 
                          ${!isExpanded ? "truncate block" : "flex-wrap"}`}
              >
                <span className={!isExpanded ? "truncate" : ""}>
                  {item.WSUC_Name}
                </span>

                <span className="text-lg shrink-0">
                  {item.Summary_Index?.SPI?.toFixed(2) > 80
                    ? "🟢"
                    : item.Summary_Index?.SPI?.toFixed(2) >= 70
                    ? "🟡"
                    : "🔴"}
                </span>
              </h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-black text-blue-200/50 uppercase tracking-widest">
                    SPI Progress
                  </p>
                  <p className="text-4xl font-black text-white">
                    {item.Summary_Index?.SPI?.toFixed(2)}%
                  </p>
                </div>
                <div className="text-blue-400 font-bold text-sm">
                  {isExpanded ? "Click to Close —" : "View Details +"}
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-8 pb-8 border-t border-white/10 pt-6 bg-blue-900/20"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Location Info */}
                    <InfoBox
                      label="Province"
                      value={item.Location.Province_Name}
                    />
                    <InfoBox
                      label="District"
                      value={item.Location.District_Name}
                    />
                    <InfoBox
                      label="Municipality"
                      value={`${item.Location.Municipality_Name} (${item.Location.Municipality_Type})`}
                    />
                    <InfoBox
                      label="Wards Covered"
                      value={item.Location?.Wards_Covered}
                    />

                    {/* Metrics */}
                    <InfoBox
                      label="SPI Score"
                      value={item.Summary_Index?.SPI?.toFixed(2)}
                    />
                    <InfoBox
                      label="OEI Score"
                      value={item.Summary_Index?.OEI?.toFixed(2)}
                    />

                    {/* Interpretation - Full Width */}
                    <div className="col-span-full p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">
                        Interpretation
                      </p>
                      <p className="text-sm font-medium text-blue-100">
                        {item.Summary_Index?.SPI >= 95
                          ? "Highly Efficient"
                          : item.Summary_Index?.SPI >= 90
                          ? "Moderately Efficient"
                          : item.Summary_Index?.SPI >= 80
                          ? "Just Efficient"
                          : item.Summary_Index?.SPI >= 70 &&
                            item.Summary_Index?.SPI <= 79
                          ? "Improved"
                          : item.Summary_Index?.SPI >= 50 &&
                            item.Summary_Index?.SPI <= 69
                          ? "Improving"
                          : item.Summary_Index?.SPI < 50 &&
                            item.Summary_Index?.SPI >= 30
                          ? "Poor"
                          : "Very Poor"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </section>
  );
};

// Sub-component for clean organization
const InfoBox = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="text-sm font-bold text-white">{value || "N/A"}</p>
  </div>
);

export default ServiceProvidersCard;
