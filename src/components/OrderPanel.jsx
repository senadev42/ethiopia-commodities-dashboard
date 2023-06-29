import { useState } from "react";

function OrderPanel(props) {
  const {
    tradeState,
    setTradeState,
    setQuantity,
    quantity,
    selectedCommodity,
  } = props;

  const [transactionHistory, setTransactionHistory] = useState([]);

  // reducer for handling trade
  const handleTrade = () => {
    const transaction = {
      name: selectedCommodity.name,
      amount: quantity,
      unitPrice: selectedCommodity.price,
      totalPrice: quantity * selectedCommodity.price,
      type: tradeState,
    };
    setTransactionHistory([...transactionHistory, transaction]);
  };
  const orderHistoryHeadings = [
    "Commodity",
    "Amount",
    "Unit Price",
    "Total Price",
    "Type",
  ];
  const orderHistoryCSS = "text-sm py-2 text-center";

  return (
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
          <p>Total: {(quantity * selectedCommodity.price).toFixed(2)}</p>
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

      <div className="w-[25rem]">
        {transactionHistory.length > 0 ? (
          <div className="mt-4 h-52 bg-yellow-200 flex flex-col items-center border-black border-2 text-center overflow-y-auto">
            <table className=" w-full">
              <thead className=" w-full">
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
                {transactionHistory?.map((transaction, index) => (
                  <tr key={index} className="gap-x-4 border-b-2 border-black">
                    <td>{transaction.name}</td>
                    <td>{transaction.amount}</td>
                    <td>${transaction.unitPrice}</td>
                    <td>${transaction.totalPrice.toFixed(2)}</td>
                    <td>{transaction.type === "buying" ? "Buy" : "Sell"}</td>
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
      </div>

      {/* Under the table */}
      <div className=" flex flex-row justify-between items-center">
        <button
          onClick={() => {
            setTransactionHistory([]);
          }}
          className="bg-slate-100 p-2"
        >
          Clear Table
        </button>

        {transactionHistory.length > 0 && (
          <p className="text-end">
            Total: ${/* if it's a buy add, if it's a sell subtract */}
            {transactionHistory
              .reduce((total, transaction) => {
                if (transaction.type === "buying") {
                  return total + transaction.totalPrice;
                } else if (transaction.type === "selling") {
                  return total - transaction.totalPrice;
                } else {
                  return total;
                }
              }, 0)
              .toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderPanel;
