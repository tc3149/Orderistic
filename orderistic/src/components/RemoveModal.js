import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";
import { RemoveItem } from "../api/MenuApi";

function RemoveModal({show, closeForm, id, reloadMenu}) {
  function remove() {
    RemoveItem(id)
    closeForm();
    reloadMenu();
  }
  return (
    <> 
    <Modal show={show} onHide={closeForm} centered>
      <Modal.Header closeButton>
      <Modal.Title>Are you sure you want to remove this item?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Button variant="primary" onClick={remove}>
          Yes
      </Button>
      <Button variant="secondary" onClick={closeForm}>
          No
      </Button>
      </Modal.Body>
    </Modal>
    </>
        
  )
}

export default RemoveModal;