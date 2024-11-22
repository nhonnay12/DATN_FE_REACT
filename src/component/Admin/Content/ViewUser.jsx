import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiServices";
import _ from "lodash";
const ViewUser = (props) => {
  const { show, setShow, userUpdate, resetUpdate } = props;

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setImage("");
    setPreviewImage("");
    setRole("USER");
    setUsername("");
    resetUpdate();
  };
  // const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(userUpdate)) {
      setEmail(userUpdate.email || "");
      setUsername(userUpdate.username || "");
      setRole(userUpdate.roles[0]?.name || "");
      setImage(null); // reset image khi userUpdate thay đổi

      if (userUpdate.images && userUpdate.images.length > 0) {
        const visibleImage = userUpdate.images.find((img) => !img.hidden); // tìm ảnh không bị ẩn

        if (visibleImage) {
          setPreviewImage(`data:image/jpeg;base64,${visibleImage.imageData}`);
        }
      }
    }
  }, [userUpdate]);

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newURL = URL.createObjectURL(file);
      setPreviewImage(newURL);
      setImage(file);
    }
  };

  useEffect(() => {
    // clean function image
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
        console.log("image revoked");
      }
    };
  }, [previewImage]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-create-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a user</Modal.Title>
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
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12" style={{ width: "100%" }}>
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
            </div>
            <div className="col-md-12 img-preview">
              {previewImage && previewImage.trim() !== "" ? (
                <img src={previewImage} alt="Preview Image" />
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
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ViewUser;
