import { useState, useEffect } from "react";

import { useMarketData } from "../App";

function Ticker() {
  const [tickerContent, setTickerContent] = useState([]);
  const [tickerIndex, setTickerIndex] = useState(0);

  const marketData = useMarketData();

  useEffect(() => {
    const sanitizedData = marketData.map((data) => ({
      name: data.col1,
      price: data.col4,
    }));
    setTickerContent(sanitizedData);
  }, [marketData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTickerIndex((prevIndex) => (prevIndex + 1) % tickerContent.length);
    }, 3000);
    console.log("Stuff is happening");
    return () => clearInterval(intervalId);
  }, [tickerContent]);

  return (
    <div className="flex items-center space-x-4">
      <p>{tickerContent[tickerIndex]?.name}:</p>
      <p>{tickerContent[tickerIndex]?.price}</p>
    </div>
  );
}

export default Ticker;
