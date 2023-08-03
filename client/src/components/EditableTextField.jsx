import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const EditableTextField = ({
  label,
  defaultValue,
  error,
  errorMessage,
  successMessage,
  onBlur,
  onSave,
  isEditMode,
  toggleEditMode,
}) => {
  const handleSave = async () => {
    const success = await onSave();
    if (success) {
      toggleEditMode();
    }
  };

  const helperText = error ? errorMessage : successMessage;
  const helperTextColor = error ? 'red' : 'green';

  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      disabled={!isEditMode}
      defaultValue={defaultValue}
      error={error}
      helperText={helperText}
      FormHelperTextProps={{
        style: { color: helperTextColor },
      }}
      onBlur={onBlur}
      InputLabelProps={{
        shrink: true,
        style: { backgroundColor: '#f5f5f5' },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              onClick={() => {
                if (isEditMode) {
                  handleSave();
                } else {
                  toggleEditMode();
                }
              }}
            >
              {isEditMode ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default EditableTextField;
