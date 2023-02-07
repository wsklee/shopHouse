import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { selectModal } from "../../../store/modalSlice";
import { closeModal } from "../../../store/modalSlice";

function BasicModal() {
  const dispatch = useDispatch();
  const { modalType, isOpen } = useSelector(selectModal);
  const handleModalClose = () => {
    dispatch(closeModal());
  };
  return (
    <Modal show={isOpen} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BasicModal;
