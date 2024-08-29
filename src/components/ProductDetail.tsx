import React from "react";
import { useQuery } from "react-query";
import { fetchProductById } from "../api/api";
import { Product } from "../types/types";
import {
  Box,
  CircularProgress,
  Typography,
  CardContent,
  CardMedia,
  Button,
  useMediaQuery
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import "../App.css";

interface ProductDetailProps {
  productId: number | null;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:899px)');
  const { data, error, isLoading } = useQuery<Product>(
    ["product", productId],
    () => fetchProductById(productId!),
    {
      enabled: !!productId,
    }
  );

  if (!productId) {
    return (
      <Box className="detail-wrapper">
        <Typography variant="h6" color="textSecondary">
          Select an item to display
        </Typography>
      </Box>
    );
  }

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error fetching product details</div>;

  return (
    <Box className="detail-wrapper">
        {isSmallScreen && (
       <Button className="back-button"  onClick={() => navigate("/")}>
        <ArrowBackIcon/>
      </Button>
        )}
      <CardMedia
        component="img"
        height="400"
        image={data?.image}
        alt={data?.title}
        style={{ marginBottom: "16px" }}
      />
      <CardContent className="detail-product">
        <Typography className="category-label" variant="subtitle2">
          {data?.category}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {data?.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {data?.description}
        </Typography>
        <Box className="rating-wrapper">
          {[...Array(Math.floor(data?.rating.rate || 0))].map((_, index) => (
            <StarIcon key={index} style={{ color: "#FFD700" }} />
          ))}

          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginLeft: "8px" }}
          >
            {data?.rating.rate} ({data?.rating.count} reviews)
          </Typography>
        </Box>
        <Typography
          variant="h6"
          color="textPrimary"
          style={{ marginTop: "16px" }}
        >
          ${data?.price}
        </Typography>
      </CardContent>
    </Box>
  );
};

export default ProductDetail;
