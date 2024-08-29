import React, { useState } from "react";
import ProductList from "./components/ProductList";
import ProductDisplay from "./components/ProductDisplay";
import { Container, Grid, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();

  const handleSelectProduct = (id: number) => {
    setSelectedProductId(id);
    if (isSmallScreen) {
      navigate(`/product/${id}`);
    }
  };

  return (
    <Container className="container">
      <Grid container spacing={2} className="grid-container">
        <Grid item xs={12} md={6} lg={4}>
          <div className="listScroll">
            <ProductList
              onSelectProduct={handleSelectProduct}
              selectedProductId={selectedProductId}
            />
          </div>
        </Grid>
        {!isSmallScreen && (
          <Grid item xs={12} md={6} lg={8} className="content-area">
            <ProductDisplay selectedProductId={selectedProductId} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default App;
