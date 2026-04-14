import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Imported for smoothness
import ServiceProvidersCard from "../components/ServiceProvidersCard";
import SideBar from "../components/SideBar";
import LoadingSpinner from "../components/LoadingSpinner";

const ServiceProvidersDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const req = await fetch("http://localhost:3000/data/getData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const res = await req.json();
        if (req.ok) {
          if (res.message && res.data) {
            setData(res.data);
          } else {
            console.log(res.message);
          }
        }
      } catch (error) {
        console.log("Error at service Provider dashboard \n", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div className="flex bg-[#1E3A8A] min-h-screen w-full overflow-hidden">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main
        className={`flex-1 transition-all duration-300 overflow-y-auto h-screen p-6 md:p-10 ${
          isOpen ? "md:ml-0" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <header className="mb-10">
            <h2 className="text-white text-3xl md:text-4xl font-black italic uppercase tracking-tighter">
              Service Providers Inventory
            </h2>
            <p className="text-blue-200/60 font-bold text-sm uppercase tracking-widest mt-2">
              DWSSM Regulatory Database
            </p>
          </header>

          {/* AnimatePresence ensures that items exiting the DOM animate smoothly */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-[60vh]"
              >
                <LoadingSpinner />
              </motion.div>
            ) : data.length > 0 ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <ServiceProvidersCard data={data} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white/5 rounded-3xl border border-white/10"
              >
                <p className="text-blue-200 font-bold">
                  No service provider data found.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default ServiceProvidersDashboard;
