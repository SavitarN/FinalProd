import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
  Label,
  Tooltip, // Added Tooltip
} from "recharts";
import SideBar from "../components/SideBar";
import LoadingSpinner from "../components/LoadingSpinner";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-slate-900 border border-blue-400 p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-blue-400 font-black uppercase text-xs mb-1">
          {data.WSUC_Name}
        </p>
        <div className="text-white text-[10px] space-y-1">
          <p>
            <span className="text-slate-400">OEI (X):</span>{" "}
            {data.Summary_Index?.OEI?.toFixed(2)}%
          </p>
          <p>
            <span className="text-slate-400">SPI (Y):</span>{" "}
            {data.Summary_Index?.SPI?.toFixed(2)}%
          </p>
          <p className="text-blue-200/50 pt-1 border-t border-white/10 italic">
            ID: {data.WSUC_ID}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const Chart = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const plannedPath = [
    { x: 55, y: 65 },
    { x: 65, y: 71 },
    { x: 76, y: 75 },
    { x: 80, y: 83 },
    { x: 87, y: 92 },
    { x: 95, y: 97 },
  ];

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const req = await fetch("http://localhost:3000/data/getData");
        const res = await req.json();
        if (req.ok && res.data) {
          // Process data: filter items that have actual coordinates
          const formattedData = res.data
            .filter(
              (item) =>
                item?.Summary_Index?.OEI !== null &&
                item?.Summary_Index?.SPI !== null
            )
            .map((item) => ({
              ...item,
              x: item?.Summary_Index?.OEI,
              y: item?.Summary_Index?.SPI,
            }));
          setData(formattedData);
        }
      } catch (error) {
        console.log("Error at service Provider dashboard", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-300">
        <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-white text-xl md:text-2xl font-black tracking-tighter uppercase">
              Utilities/Service Providers{" "}
              <span className="text-blue-400">Categorization Chart</span>
            </h1>
          </div>

          <div className="bg-white rounded-xl p-2 md:p-4 shadow-inner min-h-[580px] flex items-center justify-center">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <ResponsiveContainer width="100%" height={580}>
                <ScatterChart
                  margin={{ top: 40, right: 120, left: 60, bottom: 60 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#ccc"
                    vertical={true}
                  />
                  <XAxis
                    type="number"
                    dataKey="x"
                    domain={[0, 100]}
                    ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100]}
                    stroke="#334155"
                    fontSize={12}
                    fontWeight="bold"
                  >
                    <Label
                      value="OPERATIONAL AND MANAGEMENT EFFICIENCY (OEI), %"
                      position="bottom"
                      offset={40}
                      className="fill-slate-600 font-black text-[9px] md:text-[10px] tracking-widest"
                    />
                  </XAxis>
                  <YAxis
                    type="number"
                    dataKey="y"
                    domain={[0, 100]}
                    ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100]}
                    stroke="#334155"
                    fontSize={12}
                    fontWeight="bold"
                  >
                    <Label
                      value="SERVICE PROVISION INDEX (SPI), %"
                      angle={-90}
                      position="left"
                      offset={45}
                      style={{ textAnchor: "middle" }}
                      className="fill-slate-600 font-black text-[9px] md:text-[10px] tracking-widest"
                    />
                  </YAxis>
                  {/* Zone References remain same... */}
                  <ReferenceArea
                    x1={0}
                    x2={30}
                    y1={0}
                    y2={30}
                    fill="red"
                    fillOpacity={1}
                  />
                  {/**Pink */}
                  <ReferenceArea
                    x1={0}
                    x2={50}
                    y1={0}
                    y2={50}
                    fill="#fe62c7"
                    fillOpacity={0.6}
                  />
                  {/**Gray first */}
                  <ReferenceArea
                    x1={0}
                    x2={50}
                    y1={50}
                    y2={100}
                    fill="gray"
                    fillOpacity={0.6}
                  />
                  {/**Botton right green */}
                  <ReferenceArea
                    x1={50}
                    x2={100}
                    y1={0}
                    y2={50}
                    fill="#84cc16"
                    fillOpacity={0.2}
                  />
                  {/**Yellow */}
                  <ReferenceArea
                    x1={50}
                    x2={100}
                    y1={50}
                    y2={100}
                    fill="Yellow"
                    fillOpacity={0.4}
                  />
                  {/**Green */}
                  <ReferenceArea
                    x1={70}
                    x2={100}
                    y1={70}
                    y2={100}
                    fill="#22c55e"
                    fillOpacity={0.6}
                  />
                  {/**Cyan */}
                  <ReferenceArea
                    x1={80}
                    x2={100}
                    y1={80}
                    y2={100}
                    fill="Cyan"
                    fillOpacity={0.6}
                  />
                  {/**Gray */}
                  <ReferenceArea
                    x1={85}
                    x2={100}
                    y1={90}
                    y2={100}
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  {/**Blue */}
                  <ReferenceArea
                    x1={95}
                    x2={100}
                    y1={95}
                    y2={100}
                    fill="Blue"
                    fillOpacity={0.8}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ strokeDasharray: "3 3" }}
                  />
                  {/* Career Path (Pink line) */}
                  <Scatter
                    data={plannedPath}
                    fill="#d946ef"
                    line={{ stroke: "#701a75", strokeWidth: 2 }}
                    shape="square"
                  />
                  {/* LIVE DATA PLOT (Blue squares for WSUCs) */}
                  <Scatter
                    name="WSUC Providers"
                    data={data}
                    fill="#1e40af"
                    shape="square" // Makes them small rectangles
                  />
                  {/* Dividers */}
                  <ReferenceLine x={50} stroke="#0f172a" strokeWidth={2} />
                  <ReferenceLine y={50} stroke="#0f172a" strokeWidth={2} />
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </div>

          {!loading && (
            <div className="mt-6 flex justify-between items-center text-[9px] md:text-[10px] text-blue-200/40 font-bold uppercase tracking-widest">
              <span>Scale: 0 - 100 Percentage Points</span>
              <span>© Service Provider Classification Matrix</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Chart;
