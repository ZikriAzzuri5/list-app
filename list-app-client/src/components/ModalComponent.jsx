import { Modal, Button } from "react-bootstrap";

const ModalComponent = ({ show, handleClose, handleConfirm, modalAction }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {modalAction === "update" ? "Update item" : "delete item"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalAction === "update" ? (
          <p>Are you sure you want to update the status of this item?</p>
        ) : (
          <p>Are you sure you want to delete this item?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
