import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from '../../context/authContext';
import { deleteUser } from '../../services/user.service';

const DeleteUserModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth();

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      logout();
      // Handle successful deletion here, maybe close the modal and show a toast
      onClose(); // Close the modal on successful deletion
    } catch (error) {
      console.error(error);
      // Handle deletion error here, maybe show an error toast
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete Account
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Account</ModalHeader>
          <ModalBody>Are you sure? This action cannot be undone.</ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeleteUser}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteUserModal;
