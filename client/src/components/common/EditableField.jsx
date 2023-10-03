import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
} from '@chakra-ui/react';

const EditableField = ({ label, value, isInvalid, isEditing, onEdit }) => {
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      {isEditing ? (
        <Input value={value} onChange={(e) => onEdit(e.target.value)} />
      ) : (
        <Text>{value}</Text>
      )}
      <FormErrorMessage>{isInvalid}</FormErrorMessage>
    </FormControl>
  );
};

export default EditableField;
