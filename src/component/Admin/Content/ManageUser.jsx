import "./ManageUser.scss";
import { BiSolidUserPlus } from "react-icons/bi";
import ModalCreateUser from "./ModalCreateUser";
import { useEffect, useState } from "react";
import { getAllUser, getUserWithPaginate } from "../../../services/apiServices";
import { toast } from "react-toastify";
import ModalUpdateUser from "./ModalUpdateUser";
import ViewUser from "./ViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const LIMIT_PAGE = 8;
  const [pageSize, setPageSize] = useState(0);
  const [showModalUpdate, setShowUpdateModal] = useState(false);
  const [showModalViewUser, setShowViewUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const [listUser, setListUser] = useState([]);
  const [dataUser, setDataUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    // fetchListUser();
    fetchListUserWithPaginate(1);
  }, []);

  const fetchListUser = async () => {
    try {
      let res = await getAllUser();
      if (res.code === 200) {
        // Kiểm tra code nếu cần
        setListUser(res.result);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.res.message);
      console.error("Failed to fetch user list:", error);
    }
  };

  const fetchListUserWithPaginate = async (pageNumber) => {
    try {
      let res = await getUserWithPaginate(pageNumber, LIMIT_PAGE);

      if (res.code === 200) {
        // Kiểm tra code nếu cần
        setListUser(res.result.users);
        setPageSize(res.result.totalPages);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error.res?.message || "Error call api");
      console.error("Failed to fetch user list:", error);
    }
  };
  const handleCliclBtnUpdate = (item) => {
    setShowUpdateModal(true);
    setDataUser(item);
  };
  const resetUpdate = () => {
    setDataUser({});
  };
  const handleViewUser = (item) => {
    setShowViewUser(true);
    setDataUser(item);
  };

  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const handleClickDeleteUser = (item) => {
    setDataUser(item);
    setShowDeleteUser(true);
  };
  return (
    <div className="manage-user-container">
      <div className="user-content">
        <div className="btn-add-new">
          <button className="btn btn-secondary" onClick={handleShowModal}>
            <BiSolidUserPlus />
            Add new user
          </button>
        </div>
        <div className="table-users">
          <TableUserPaginate
            listUser={listUser}
            handleCliclBtnUpdate={handleCliclBtnUpdate}
            handleViewUser={handleViewUser}
            handleClickDeleteUser={handleClickDeleteUser}
            fetchListUserWithPaginate={fetchListUserWithPaginate}
            pageSize={pageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          show={showModal}
          setShow={setShowModal}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdate}
          setShow={setShowUpdateModal}
          dataUser={dataUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          resetUpdate={resetUpdate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ViewUser
          show={showModalViewUser}
          setShow={setShowViewUser}
          dataUser={dataUser}
          // fetchListUserWithPaginate={fetchListUser}
          resetUpdate={resetUpdate}
        />
        <ModalDeleteUser
          show={showDeleteUser}
          setShow={setShowDeleteUser}
          dataUser={dataUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
export default ManageUser;
