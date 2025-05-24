import React, { useEffect, useState } from "react";
import { fetchStockPrice } from "../services/api";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const StockChart = () => {
  const [ticker, setTicker] = useState("AAPL");
  const [minutes, setMinutes] = useState(10);
  const [prices, setPrices] = useState([]);

  const getPrices = async () => {
    const data = await fetchStockPrice(ticker, minutes);
    setPrices(data);
  };

  useEffect(() => {
    getPrices();
  }, []);

  return (
    <Card style={{ margin: "20px", padding: "20px" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Stock Chart</Typography>
        <TextField
          label="Ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Minutes"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={getPrices}>
          Get Prices
        </Button>
        <div style={{ marginTop: "20px" }}>
          {prices.map((p, index) => (
            <div key={index} style={{ marginBottom: "5px" }}>
              Price: {p.price} at {new Date(p.lastUpdatedAt).toLocaleTimeString()}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
