import React from "react";
import { useQuery } from "react-query";
import { fetchProducts } from "../api/api";
import { Product } from "../types/types";
import {
  List,
  ListItem,
  CircularProgress,
  Box,
  Typography,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import "../App.css";

interface ProductListProps {
  onSelectProduct: (id: number) => void;
  selectedProductId: number | null;
}

const ProductList: React.FC<ProductListProps> = ({
  onSelectProduct,
  selectedProductId,
}) => {
  const { data, error, isLoading } = useQuery<Product[]>(
    "products",
    fetchProducts
  );

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error fetching products</div>;

  return (
    <List className="product-detail-wrapper">
      {data?.map((product) => (
        <ListItem
          key={product.id}
          onClick={() => onSelectProduct(product.id)}
          className={`product-list-item ${
            selectedProductId === product.id ? "selected" : ""
          }`}
        >
          <ListItemAvatar className="aaa">
            <Avatar
              variant="rounded"
              src={product.image}
              className="product-avatar"
            />
            <Box className="rating-wrapper">
              <StarIcon className="rating-icon" />
              <Typography className="rating-count">
                {product.rating.rate} ({product.rating.count})
              </Typography>
            </Box>
          </ListItemAvatar>
          <Box>
            <Typography className="product-category">
              {product.category}
            </Typography>
            <Typography variant="h6" className="product-title">
              {product.title.substring(0, 40)}
            </Typography>
            <Typography variant="body2" className="product-description">
              {product.description.substring(0, 35)}...
            </Typography>
            <Typography className="product-price">${product.price}</Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default ProductList;
