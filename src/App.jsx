import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then((response) => setMarketData(response.data))
      .catch((error) => console.log("Error:", error));
  }, []);

  const headings = ["Commodity", "Unit", "Date", "Price"];


  const cellCSS = "p-2 px-7 gap-x-2";

  return (
    <div className="bg-gray-200 flex flex-col items-center h-screen">


      <div className="bg-green-100 w-full p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Commodities: Ethiopia</h1>

      </div>

      {/* The Table Section */}
      <div className="bg-red-100 p-4">
        <div className="flex flex-row justify-between">
          <h1 className=" text-2xl font-bold mb-4">Market Prices</h1>
          <h2 className="text-lg font-bold mb-4">Date: {new Date().toDateString()} </h2>
        </div>

        <table className="text-left">
          <thead className="bg-green-100 p-3">
            <tr>
              {headings.map(((heading, index) => (
                <th className={cellCSS} key={index}> {heading}</th>
              )))}

            </tr>
          </thead>
          <tbody className="bg-yellow-100" id="market-table">
            {marketData.map((rowData, index) => (
              <tr key={index}>
                {Object.values(rowData).map((cellData, index) => (
                  <td className={cellCSS} key={index}>{cellData}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;