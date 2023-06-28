import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

//Components
import Navbar from "./components/Navbar";

function App() {
  const MarketDataContext = createContext([]);

  const [marketData, setMarketData] = useState([]);

  const [tradeState, setTradeState] = useState("buying");
  const [quantity, setQuantity] = useState(1);

  const [transactionHistory, setTransactionHistory] = useState([]);

  // reducer for handling trade
  const handleTrade = () => {
    const transaction = {
      name: selectedCommodity.name,
      amount: quantity,
      unitPrice: selectedCommodity.price,
      totalPrice: quantity * selectedCommodity.price,
    };
    setTransactionHistory([...transactionHistory, transaction]);
  };

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

  const headings = ["Commodity", "Unit", "Ship Date", "Price"];
  const cellCSS = "p-2 px-7 gap-x-2";

  const orderHistoryHeadings = [
    "Commodity",
    "Amount",
    "Unit Price",
    "Total Price",
  ];
  const orderHistoryCSS = "px-3";

  return (
    <MarketDataContext.Provider value={marketData}>
      <div className=" flex flex-col items-center justify-between h-screen">
        <Navbar />

        {/* The body */}
        <div className="flex flex-col gap-y-4 md:flex-row ">
          {/* the left */}
          <div className="bg-white p-8 mr-4">
            {/* Buying and selling */}
            <div className="border-slate-600 bg-yellow-200 border-2 px-8 flex flex-col items-center">
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
              <div className=" text-center">
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
              <div className="my-2 mb-4 mt-4 text-right w-full">
                <p>Total: {quantity * selectedCommodity.price}</p>
                <button
                  className="border-black border-2 px-4 py-2 w-full"
                  onClick={handleTrade}
                >
                  {tradeState === "buying" ? "Buy" : "Sell"} {quantity}{" "}
                  {selectedCommodity.name}
                </button>
              </div>
            </div>
            {/* Order History */}
            <div className="mt-4 border-slate-600 bg-yellow-200 border-2 px-4 text-center">
              <h3>Order History</h3>
            </div>

            {transactionHistory.length > 0 ? (
              <div className="h-52 bg-yellow-200 flex flex-col items-center border-black border-2 text-end">
                <table>
                  <thead className="">
                    <tr>
                      {orderHistoryHeadings.map((heading, index) => (
                        <th className={orderHistoryCSS} key={index}>
                          {" "}
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((transaction, index) => (
                      <tr
                        key={index}
                        className="gap-x-4 border-b-2 border-black"
                      >
                        <td>{transaction.name}</td>
                        <td>{transaction.amount}</td>
                        <td>${transaction.unitPrice}</td>
                        <td>${transaction.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Total Money so far */}
              </div>
            ) : (
              <div className="mt-4 h-52 bg-yellow-200 flex flex-col items-center justify-center border-black border-2">
                <p>Nothing Yet</p>
              </div>
            )}

            {transactionHistory.length > 0 && (
              <p className="text-end">
                Total: $
                {transactionHistory
                  .reduce((a, b) => a + b.totalPrice, 0)
                  .toFixed(2)}
              </p>
            )}
          </div>

          {/* The Table Section */}
          <div className="bg-white p-4">
            <div className="flex flex-row justify-between">
              <h1 className=" text-xl mb-4">Market Prices</h1>
            </div>

            <table className="text-left border-black border-2">
              <thead className=" p-3">
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
                  <tr
                    key={index}
                    className="hover:bg-yellow-300"
                    onClick={() => {
                      console.log(rowData);
                      setSelectedCommodity({
                        name: rowData.col1,
                        price: rowData.col4,
                      });
                    }}
                  >
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
        <div className=" w-full p-4 ">
          <p className="text-gray-600 text-center">2023</p>
        </div>
      </div>
    </MarketDataContext.Provider>
  );
}

export default App;

export function useMarketData() {
  return useContext(MarketDataContext);
}
