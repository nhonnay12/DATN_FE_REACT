import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";
import { deleteProduct } from "../../../../../services/apiProduct";

const ModalDeleteProduct = (props) => {
  const { show, setShow, product } = props;

  const handleClose = () => setShow(false);
  console.log(product);

  const handleSubmitDeleteProduct = async () => {
    let res = await deleteProduct(product.id);
    // Kiểm tra phản hồi từ API
    if (res && res.code === 200) {
      toast.success("Xóa sản phẩm dùng thành công!");
      handleClose();
      props.fetchProducts(1);
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
          product && product.name ? product.name : ""
        } `}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteProduct;
