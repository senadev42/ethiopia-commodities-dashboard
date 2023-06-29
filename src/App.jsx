import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

//Components
import Navbar from "./components/Navbar";
import OrderPanel from "./components/OrderPanel";

const commodityTypes = ["Goods", "Metas", "Indexs", "All"];

function App() {
  const [marketData, setMarketData] = useState([]);

  const [tradeState, setTradeState] = useState("buying");
  const [quantity, setQuantity] = useState(1);

  const [selectedCommodity, setSelectedCommodity] = useState({
    name: "Gold",
    price: 1800,
  });

  // Define a state variable to hold the selected commodity
  const [commodityFilter, setCommodityFilter] = useState("All");

  // Define a function to handle changes to the dropdown value
  const handleCommodityFilterChange = (event) => {
    setCommodityFilter(event.target.value);
  };

  // Define your table data
  const tableData = [
    { name: "Gold", price: 1800, type: "metals" },
    { name: "Oil", price: 70, type: "goods" },
    { name: "Dow Jones", price: 35000, type: "indexes" },
    { name: "Corn", price: 5, type: "goods" },
  ];

  // Filter the table data based on the selected commodity
  const filteredTableData =
    commodityFilter === "all"
      ? tableData
      : tableData.filter((item) => item.type === commodityFilter);

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => setMarketData(response.data))
      .catch((error) => console.log("Error:", error));
  }, []);

  useEffect(() => {
    setSelectedCommodity({
      name: marketData[0]?.col1,
      price: marketData[0]?.col4,
    });
  }, [marketData]);

  const headings = ["Commodity", "Unit", "Ship Date", "Price"];
  const cellCSS = "p-2 px-7 gap-x-2";

  if (marketData == null) return <p>Loading</p>;

  return (
    <div className=" flex flex-col items-center justify-between h-screen">
      <Navbar />

      {/* The body */}
      <div className="flex flex-col gap-y-4 md:flex-row ">
        {/* the left */}

        <OrderPanel
          tradeState={tradeState}
          setTradeState={setTradeState}
          setQuantity={setQuantity}
          quantity={quantity}
          selectedCommodity={selectedCommodity}
        />

        {/* The Table Section */}
        <div className="bg-white p-4">
          <div className="flex flex-row justify-between">
            <h1 className=" text-xl mb-4">Market Prices</h1>
            {/* Drop down that allows you to set commodity filter by goods, metals, indexes and all  */}
            <div>
              <label htmlFor="commodity-filter">Filter:</label>
              <select
                id="commodity-filter"
                value={commodityFilter}
                onChange={handleCommodityFilterChange}
                className=" ml-2"
              >
                {commodityTypes.map((commodityType) => (
                  <option value={commodityType} key={commodityType}>
                    {commodityType}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <table className="text-left border-black border-2 h-80">
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
              {marketData &&
                marketData.map((rowData, index) => (
                  <tr
                    key={index}
                    className="hover:bg-yellow-300"
                    onClick={() => {
                      //console.log(rowData);
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
  );
}

export default App;
