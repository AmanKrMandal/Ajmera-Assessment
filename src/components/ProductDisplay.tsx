import React from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";

interface ProductDisplayProps {
  selectedProductId?: number | null;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ selectedProductId }) => {
  const params = useParams();
  const productId = selectedProductId ?? Number(params.productId);

  if (productId) {
    return <ProductDetail productId={productId} />;
  }

  return (
    <Box className="placeholder-message">
      <Typography className="product-category">Nothing to display...</Typography>
      <Typography className="display-item">Select an item to display</Typography>
      <Typography className="product-description">
        Select an item from the master view to display details in the
        detail view.
      </Typography>
    </Box>
  );
};

export default ProductDisplay;
