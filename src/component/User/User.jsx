import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMyinfo, updateUserInfo } from "../../services/apiUser"; // Giả sử API update có sẵn
import account from "../../assets/account.jpg";
import _ from "lodash";

const User = (props) => {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
    roles: [],
  });

  const [previewImage, setPreviewImage] = useState(account);
  const [image, setImage] = useState(null);
  const [originalUser, setOriginalUser] = useState({}); // Dùng để so sánh

  // Xử lý xem trước ảnh
  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newURL = URL.createObjectURL(file);
      setPreviewImage(newURL);
      setImage(file);
    }
  };

  // Fetch thông tin người dùng
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        let res = await getMyinfo();
        if (res.code === 200) {
          const { password, status, ...filteredUser } = res.result;
          setUser(filteredUser);
          setOriginalUser(filteredUser); // Lưu lại thông tin gốc
          if (filteredUser.images && filteredUser.images.length > 0) {
            const visibleImage = filteredUser.images.find((img) => !img.hidden);
            if (visibleImage) {
              setPreviewImage(
                `data:image/jpeg;base64,${visibleImage.imageData}`
              );
            }
          }
        } else {
          toast.error(res?.message);
        }
      } catch (error) {
        toast.error(error?.response?.message || "Error calling API");
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  // Xử lý lưu thay đổi
  const handleSaveChange = async () => {
    if (_.isEqual(user, originalUser) && !image) {
      toast.info("Không có thay đổi nào cần lưu.");
      return;
    }

    try {
      const updates = {
        username: user.username !== originalUser.username ? user.username : null,
        role: user.role !== originalUser.role ? user.role : null,
        status: user.status !== originalUser.status ? user.status : null,
        file: image, // Nếu có file thì gửi file
        phone: user.phone !== originalUser.phone ? user.phone : null,
        email: user.email !== originalUser.email ? user.email : null,
      };

      const res = await updateUserInfo(user.id ,updates); // Gọi API cập nhật
      if (res.code === 200) {
        toast.success("Cập nhật thành công!");
        setOriginalUser(user); // Cập nhật lại bản gốc
      } else {
        toast.error(res?.message || "Cập nhật thất bại!");
      }
    } catch (error) {
      toast.error(error?.response?.message || "Error saving changes.");
      console.error("Failed to save changes:", error);
    }
  };

  return (
    <div
      className="profile_account"
      style={{ paddingLeft: "50px", display: "flex", height: "auto" }}
    >
      <div
        className="img_preview"
        style={{
          marginTop: "20px",
          display: "inline-grid",
          height: "auto",
          marginBottom: "100px",
          padding: "0",
          width: "300px",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <img
          alt="Preview account"
          src={previewImage}
          style={{
            padding: "10px",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit:"cover",
          }}
        />
        <label
          htmlFor="upload-image"
          style={{
            cursor: "pointer",
            border: "1px solid #dcdcdc",
            color: "#000",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Upload Image
        </label>
        <input
          id="upload-image"
          type="file"
          hidden
          onChange={handlePreviewImage}
        />
        <button
          style={{
            cursor: "pointer",
            border: "1px solid #dcdcdc",
            color: "#000",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "10px",
          }}
          onClick={handleSaveChange}
        >
          Lưu thay đổi
        </button>
      </div>

      <div
        style={{
          padding: "20px",
          flexGrow: "1",
          alignContent: "center",
          justifyContent: "center",
        }}
        className="profile_description"
      >
        <p>
          Username:
          <input
            type="text"
            className="form-control"
            value={user.username}
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
          />
        </p>
        <p>
          Email:
          <input
         
            type="email"
            className="form-control"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />
        </p>
        <p>
          Phone:
          <input
            type="text"
            className="form-control"
            value={user.phone}
            onChange={(e) =>
              setUser({ ...user, phone: e.target.value })
            }
          />
        </p>
        <p>
          Role: {user.roles && user.roles.map((role) => role.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default User;
