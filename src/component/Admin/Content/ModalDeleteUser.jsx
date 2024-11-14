import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiServices";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  const { show, setShow, dataUser } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUSer = async () => {
    let res = await deleteUser(dataUser.id);
    // Kiểm tra phản hồi từ API
    if (res && res.code === 200) {
      toast.success("Xóa người dùng thành công!");
      handleClose();
      props.setCurrentPage(1);
      await props.fetchListUserWithPaginate(1);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DeleteUser</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Bạn có chắc muốn xóa người dùng với email: ${
          dataUser && dataUser.email ? dataUser.email : ""
        } `}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteUSer}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
