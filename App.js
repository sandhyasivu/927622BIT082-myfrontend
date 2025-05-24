import React from "react";
import { Container, Typography } from "@mui/material";

const StockChart = () => {
  return (
    <div style={{ margin: "1rem 0", padding: "1rem", backgroundColor: "#e0f7fa" }}>
      <Typography variant="h6">Stock Chart Component</Typography>
      <p>This is a placeholder for the stock chart.</p>
    </div>
  );
};

const CorrelationHeatmap = () => {
  return (
    <div style={{ margin: "1rem 0", padding: "1rem", backgroundColor: "#f1f8e9" }}>
      <Typography variant="h6">Correlation Heatmap Component</Typography>
      <p>This is a placeholder for the correlation heatmap.</p>
    </div>
  );
};

const App = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h3" gutterBottom>
        Stock Price Aggregation
      </Typography>
      <StockChart />
      <CorrelationHeatmap />
    </Container>
  );
};

export default App;
