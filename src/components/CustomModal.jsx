import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import CustomButton from "./CustomButton";

function CustomModal({ isOpen, onClose, children, title, ...rest }) {
  return (
    <Modal
      {...rest}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />

        {children}
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
