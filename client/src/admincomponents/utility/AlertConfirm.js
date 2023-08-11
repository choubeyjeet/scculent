import { Modal, Button } from "rsuite";
import RemindIcon from "@rsuite/icons/legacy/Remind";
import React from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { getAllProducts } from "../features/productList/productListThunk";
import { useDispatch } from "react-redux";

export const AlertConfirm = (props) => {
  const stateValue = useSelector((state) => state.userSlice);

  const { toDeleteByID, id } = props;
  const handleClose = () => {
    props.setDeleteopen(!props.open);
  };
  const dispatch = useDispatch();
  const deleteProduct = async () => {
    toDeleteByID(id);

    handleClose(true);
  };

  return (
    <>
      <Modal
        backdrop="static"
        role="alertdialog"
        open={props.open}
        onClose={handleClose}
        size="xs"
      >
        <Modal.Body>
          <RemindIcon style={{ color: "#ffb300", fontSize: 24 }} />
          Are you sure you want to delete.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteProduct} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
