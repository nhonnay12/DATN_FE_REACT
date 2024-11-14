import _ from "lodash";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./ModalViewBook.scss";
const ModalViewBook = (props) => {
  const handleClose = () => {
    props.setShow(false);
  };
  console.log(props.productItem);

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
            <h3 className="book-authors-modal"> By:<span className="abc">
                {" "}
                {props.productItem && props.productItem.authors ? props.productItem.authors[0].name : "Tac gia" }
                </span> 
                </h3>
          <p className="book-description-modal">{props.productItem?.description} </p>
          <span className="book-price-modal"> Price: {props.productItem?.price} VND</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a href="#">Add to cart</a>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalViewBook;
