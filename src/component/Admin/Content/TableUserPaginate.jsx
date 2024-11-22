import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {
  const { listUser, pageCount } = props;
  const handlePageClick = (event) => {
    props.setCurrentPage(+event.selected + 1);
    props.fetchListUserWithPaginate(+event.selected + 1);
  };
  return (
    <>
      <table className="table table-bordered table-hover ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.roles[0]?.name}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => props.handleViewUser(item)}
                    >
                      View
                    </button>
                    <button
                      onClick={() => props.handleCliclBtnUpdate(item)}
                      className="btn btn-warning mx-3"
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.handleClickDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan={4}>Not found user</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="user-paginate">
        <ReactPaginate
          // previousLabel
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          nextLabel="next >"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item" // thêm vào đây
          nextLinkClassName="page-link" // thêm vào đây
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  );
};
export default TableUserPaginate;
