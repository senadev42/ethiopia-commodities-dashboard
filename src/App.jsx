import React, { useState, useEffect } from "react";
import axios from "axios";

//Components
import Navbar from "./components/Navbar";

function App() {
  const [marketData, setMarketData] = useState([]);

  const [tradeState, setTradeState] = useState("buying");
  const [quantity, setQuantity] = useState(1);
  const [selectedCommodity, setSelectedCommodity] = useState({
    name: "TEST",
    price: "50",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => setMarketData(response.data))
      .catch((error) => console.log("Error:", error));
  }, []);

  const headings = ["Commodity", "Unit", "Date", "Price"];
  const cellCSS = "p-2 px-7 gap-x-2";

  return (
    <div className="bg-gray-200 flex flex-col items-center justify-between h-screen">
      <Navbar />

      {/* The body */}
      <div className="flex flex-row ">
        {/* the left */}
        <div className="bg-yellow-100 p-4 mr-5">
          {/* Buying and selling */}
          <div className="border-slate-600 bg-yellow-200 border-2 px-4 flex flex-col items-center">
            {/* Buy or sell buttons */}
            <div className="flex flex-row justify-center gap-x-2 my-4">
              <h3
                className={`border-black border-2 px-12 py-2
                ${tradeState === "buying" ? "bg-black text-white" : ""}`}
                onClick={() => setTradeState("buying")}
              >
                Buy
              </h3>
              <h3
                className={`border-black border-2 px-12 py-2 
                ${tradeState === "selling" ? "bg-black text-white" : ""}`}
                onClick={() => setTradeState("selling")}
              >
                Sell
              </h3>
            </div>

            {/* div that shows what you are buying or selling uses selectedCommondity */}
            <div className="my-2 text-center">
              {tradeState === "buying" ? (
                <p>You are buying </p>
              ) : (
                <p>You are selling</p>
              )}
            </div>

            {/* Input bar with two buttons with - and + to increment */}
            <div className="flex flex-row justify-between gap-x-2 text-center">
              <button onClick={() => setQuantity(Math.max(quantity - 1, 1))}>
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border-black border-2 px-2 w-20"
              />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <div className=" text-center">
              <p>
                {selectedCommodity.name} for {selectedCommodity.price}
              </p>
            </div>

            {/* button to buy or sell depending on tradeState */}
            <div className="my-2 mb-4 mt-6 text-right w-full">
              <p>Total: {quantity * selectedCommodity.price}</p>
              <button
                className="border-black border-2 px-4 py-2 w-full"
                onClick={() =>
                  console.log(
                    `Trade ${quantity} ${selectedCommodity.name} by ${tradeState}`
                  )
                }
              >
                {tradeState === "buying" ? "Buy" : "Sell"} {quantity}{" "}
                {selectedCommodity.name}
              </button>
            </div>
          </div>
        </div>

        {/* The Table Section */}
        <div className="bg-red-100 p-4">
          <div className="flex flex-row justify-between">
            <h1 className=" text-xl mb-4">Market Prices</h1>
          </div>

          <table className="text-left">
            <thead className="bg-green-100 p-3">
              <tr>
                {headings.map((heading, index) => (
                  <th className={cellCSS} key={index}>
                    {" "}
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            {/* The Body Section  */}
            <tbody className="bg-yellow-200" id="market-table">
              {marketData.map((rowData, index) => (
                <tr key={index} className="hover:bg-yellow-300">
                  {Object.values(rowData).map((cellData, index) => (
                    <td className={cellCSS} key={index}>
                      {cellData}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 w-full p-4 ">
        <p className="text-gray-600 text-center">This is going somewhere</p>
      </div>
    </div>
  );
}

export default App;
