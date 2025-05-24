
import React, { useEffect, useState } from "react";
import { fetchStockPrice } from "../services/api";
import { Card, CardContent, Typography } from "@mui/material";

// Pearson correlation calculation
const calculateCorrelation = (x, y) => {
  const n = x.length;
  const avgX = x.reduce((a, b) => a + b, 0) / n;
  const avgY = y.reduce((a, b) => a + b, 0) / n;

  let numerator = 0;
  let denominatorX = 0;
  let denominatorY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - avgX;
    const dy = y[i] - avgY;
    numerator += dx * dy;
    denominatorX += dx * dx;
    denominatorY += dy * dy;
  }

  return numerator / Math.sqrt(denominatorX * denominatorY);
};

const CorrelationHeatmap = () => {
  const tickers = ["AAPL", "GOOGL", "MSFT", "AMZN"];
  const [priceData, setPriceData] = useState({});
  const [correlations, setCorrelations] = useState({});

  useEffect(() => {
    const fetchAllPrices = async () => {
      const data = {};
      for (const ticker of tickers) {
        const prices = await fetchStockPrice(ticker, 10);
        data[ticker] = prices.map(p => p.price);
      }
      setPriceData(data);
    };

    fetchAllPrices();
  }, []);

  useEffect(() => {
    if (Object.keys(priceData).length > 0) {
      const corr = {};
      for (let i = 0; i < tickers.length; i++) {
        for (let j = i + 1; j < tickers.length; j++) {
          const x = priceData[tickers[i]];
          const y = priceData[tickers[j]];
          if (x && y && x.length === y.length) {
            const c = calculateCorrelation(x, y);
            corr[`${tickers[i]}-${tickers[j]}`] = c.toFixed(2);
          }
        }
      }
      setCorrelations(corr);
    }
  }, [priceData]);

  return (
    <Card style={{ margin: "20px", padding: "20px" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Correlation Heatmap</Typography>
        {Object.keys(correlations).length === 0 ? (
          <Typography>Loading correlations...</Typography>
        ) : (
          Object.entries(correlations).map(([pair, corr]) => (
            <div key={pair}>
              {pair}: {corr}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CorrelationHeatmap;

