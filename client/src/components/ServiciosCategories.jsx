import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const ServiciosCategories = () => {
  // Aquí debes reemplazar este array con los datos reales
  const categories = [
    { id: 1, name: "Corte de pelo" },
    { id: 2, name: "Facial" },
    { id: 3, name: "Manicura" },
    { id: 4, name: "Pedicura" },
    // ...
  ];

  return (
    <Box sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Categorías
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {categories.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                p: 2,
                border: "1px solid gray",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">{category.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServiciosCategories;