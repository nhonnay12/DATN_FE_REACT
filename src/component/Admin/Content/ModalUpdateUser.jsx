import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiServices";
import _ from "lodash";
const ModalUpdateUser = (props) => {
  const { show, setShow, dataUser, resetUpdate } = props;

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
  const [status, setStatus] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUser)) {
      setEmail(dataUser.email || "");
      setUsername(dataUser.username || "");
      setRole(dataUser.roles[0]?.name || "");
      setImage(null); // reset image khi dataUser thay đổi
      setStatus(dataUser.status || "");
      if (dataUser.images && dataUser.images.length > 0) {
        const visibleImage = dataUser.images.find((img) => !img.hidden); // tìm ảnh không bị ẩn

        if (visibleImage) {
          setPreviewImage(`data:image/jpeg;base64,${visibleImage.imageData}`);
        }
      }
    }
  }, [dataUser]);

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

  const handleSubmitUpdateUser = async () => {
    if (!username) {
      toast.error("Username chưa được nhập!!!");
      return;
    }
    // So sánh dữ liệu mới với dữ liệu cũ
    const isUserDataChanged =
      username !== dataUser.username ||
      role !== (dataUser.roles[0]?.name || "") ||
      status !== (dataUser.status || "") ||
      image !== null; // Chỉ cần hình ảnh thay đổi là cũng coi là có thay đổi

    if (!isUserDataChanged) {
      // Nếu không có dữ liệu thay đổi
      toast.info("Không có thay đổi nào được thực hiện.");
      return;
    }

    let res = await putUpdateUser(username, image, role, status, dataUser.id);

    // console.log(">>> result: ", res);

    // Kiểm tra phản hồi từ API
    if (res && res.code === 200) {
      toast.success("Cập nhật người dùng thành công!");
      handleClose();
      await props.fetchListUserWithPaginate(props.currentPage);
    } else {
      toast.error(res.message);
    }
  };
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
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
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
          <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateUser;
