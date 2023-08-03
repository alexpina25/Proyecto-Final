import React from 'react';
import { Button, Avatar, Box, Grid } from '@mui/material';
import ChangePasswordButton from '../components/ChangePasswordButton';
import { useAuth } from '../context/authContext';
import './Perfil.css';
import EditableTextField from '../components/EditableTextField';
import useUpdate from '../hooks/useUpdate';
import useDeleteUser from '../hooks/useDelete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const UserProfile = () => {
  const { user } = useAuth();
  const deleteUser = useDeleteUser();
  const {
    editMode,
    errors,
    successes,
    previewImage,
    imageFile,
    isUpdating,
    handleSaveImage,
    handleImageChange,
    handleBlur,
    handleSave,
    toggleEditMode,
  } = useUpdate(user);

  return (
    <Box className="profileContainer">
      <Box className="imageContainer">
        <Avatar
          alt={user.name}
          src={previewImage ? previewImage : user.image}
          style={{ height: '100px', width: '100px', marginBottom: '50px' }}
        />
        <label htmlFor="image-input" className="imageEditIcon">
          {imageFile ? (
            <SaveIcon onClick={() => handleSaveImage(imageFile)} />
          ) : (
            <EditIcon />
          )}
        </label>
        <input
          id="image-input"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          disabled={isUpdating}
          onChange={handleImageChange}
        />
      </Box>

      <Grid container spacing={3} className="userDetails">
        <EditableTextField
          label="Nombre"
          defaultValue={user.name}
          error={!!errors.name}
          errorMessage={errors.name}
          successMessage={successes.name}
          onBlur={(e) => handleBlur('name', e.target.value)}
          onSave={() => handleSave('name')}
          isEditMode={editMode.name}
          toggleEditMode={() => toggleEditMode('name')}
        />
        <EditableTextField
          label="Correo"
          defaultValue={user.email}
          error={!!errors.email}
          errorMessage={errors.email}
          successMessage={successes.email}
          onBlur={(e) => handleBlur('email', e.target.value)}
          onSave={() => handleSave('email')}
          isEditMode={editMode.email}
          toggleEditMode={() => toggleEditMode('email')}
        />
        <EditableTextField
          label="Teléfono"
          defaultValue={user.telefono}
          error={!!errors.telefono}
          errorMessage={errors.telefono}
          successMessage={successes.telefono}
          onBlur={(e) => handleBlur('telefono', e.target.value)}
          onSave={() => handleSave('telefono')}
          isEditMode={editMode.telefono}
          toggleEditMode={() => toggleEditMode('telefono')}
        />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChangePasswordButton />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={deleteUser}
          >
            Borrar Usuario
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
