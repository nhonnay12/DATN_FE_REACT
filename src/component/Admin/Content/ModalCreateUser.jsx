import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateUser } from "../../../services/apiServices";
const ModalCreateUser = (props) => {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setImage("");
    setPreviewImage("");
    setRole("USER");
    setUsername("");
  };
  // const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [roles, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState(null);
  const [enabled, setEnable] = useState(true);

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newURL = URL.createObjectURL(file);
      setPreviewImage(newURL);
      setImage(file);
    }
  };
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
        console.log("image revoked");
      }
    };
  }, [previewImage]);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmitCreateUser = async () => {
    // email, password, username not null
    if (!email) {
      toast.error("Email chưa được nhập!!!");
      return;
    }
    if (!password) {
      toast.error("Password chưa được nhập!!!");
      return;
    }
    if (!username) {
      toast.error("Username chưa được nhập!!!");
      return;
    }
    //validate email
    const isValid = validateEmail(email);
    if (!isValid) {
      toast.error("Email không hợp lệ!!!");
      return;
    }

    let res = await postCreateUser(
      email,
      password,
      username,
      image,
      enabled,
      roles
    );
    console.log(">>> result: ", res);

    // Kiểm tra phản hồi từ API
    if (res && res.code === 200) {
      toast.success("Thêm người dùng thành công!");
      handleClose();
      props.setCurrentPage(1);
      await props.fetchListUserWithPaginate(1);
    } else {
      toast.error(res.message);
    }
    // thay vi dung trycatch co erceptorthe dung int can thiet vao response roi lay ma loi the hien ra man hinh
    // try {
    // } catch (error) {
    //   if (error.response && error.response.data) {
    //     // Hiển thị thông báo lỗi từ backend
    //     const errorMessage = error.response.data.message || "Đã xảy ra lỗi!";
    //     toast.error(errorMessage);
    //   } else {
    //     toast.error("Đã xảy ra lỗi không xác định!");
    //   }
    // }
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Add new user 2
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-create-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={roles}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Upload file image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(e) => handlePreviewImage(e)}
              />
              {/* hidden de an input,muon click vao label no anh xa sang input thi dung for, id */}
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalCreateUser;
