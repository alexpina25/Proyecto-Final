import React from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const handleSearch = (event) => {
    // Aquí puedes gestionar la acción de búsqueda
    console.log(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <Box
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 500,
          border: '1px solid gray',
          borderRadius: '4px',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Buscar servicios"
          inputProps={{ 'aria-label': 'buscar servicios' }}
          onChange={handleSearch}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBar;