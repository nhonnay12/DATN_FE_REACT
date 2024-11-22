import _ from "lodash";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./ModalViewBook.scss";
import { postAddToCart } from "../../../services/apiCartServices";
import { useData } from "../../DataContext";
import { getToken } from "../../../services/localStorageService";
import { toast } from "react-toastify";
const ModalViewBook = (props) => {
  const { setCartCount } = useData();
  const token = getToken();
  const handleClickAddToCart = async (product_id) => {
    // console.log(product_id);
    if (!token) {
      toast.info("Hãy đăng nhập để tham vào giỏ hàng!");
      navigator("/login");
      return;
    }
    // console.log(token);

    // add cart
    if (token) {
      try {
        let response = await postAddToCart(product_id); // Giả sử đây là hàm gọi API thêm sản phẩm vào giỏ hàng
        if (response.code === 200) {
          // Nếu thêm sản phẩm mới vào giỏ hàng thành công
          setCartCount((prevCount) => prevCount + 1); // Tăng số lượng sản phẩm trong giỏ hàng
          toast.success(response.message); // Hiển thị thông báo thành công
        } else {
          // Nếu có lỗi từ phía backend, hiển thị thông báo lỗi
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
        toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
      }
    }
  };
  const handleClose = () => {
    props.setShow(false);
  };
  // console.log(props.productItem);

  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    // console.log(props.productItem.images[0]?.imageData);

    if (!_.isEmpty(props.productItem)) {
      if (props.productItem.images && props.productItem.images.length > 0) {
        setPreviewImage(
          `data:image/jpeg;base64,${props.productItem.images[0]?.imageData}`
        );
      }
    }
  }, [props.productItem]);
  //   const handlePreviewImage = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       const newURL = URL.createObjectURL(file);
  //       setPreviewImage(newURL);
  //       // setImage(file);
  //     }
  //   };
  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-view-book container-fluid"
      >
        {/* Thêm Modal.Header với closeButton */}
        <Modal.Header closeButton>
          <Modal.Title>Book Details</Modal.Title>
        </Modal.Header>

        <Modal.Body className="container-fluid">
          <div className="col-md-6">
            <img src={previewImage} className="img-preview" />
          </div>
          <div className="col-md-6 ">
            <h2 className="book-name-modal">{props.productItem.name}</h2>
            <h3 className="book-authors-modal">
              {" "}
              By:
              <span className="abc">
                {" "}
                {props.productItem && props.productItem.authors
                  ? props.productItem.authors[0].name
                  : "Tac gia"}
              </span>
            </h3>
            <p className="book-description-modal">
              {props.productItem?.description}{" "}
            </p>
            <span className="book-price-modal">
              {" "}
              Price: {props.productItem?.price} VND
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => handleClickAddToCart(props.productItem.id)}
            style={{
              backgroundColor: "#ffc801",
              border: "none",
              borderRadius: "3px",
              padding: "3px 5px",
            }}
          >
            Add to cart
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalViewBook;
