
// // {
// //   id: 1,
// //   username: "tuanvan",
// //   email: "tuan@gmail.com",
// //   role: "USER",
// // },
// // {
// //   id: 2,
// //   username: "thao",
// //   email: "thaothao@gmail.com",
// //   role: "USER",
// // },
// const TableUser = (props) => {
//   const { listUser } = props;
//   return (
//     <>
//       <table className="table table-bordered table-hover ">
//         <thead>
//           <tr>
//             <th scope="col">ID</th>
//             <th scope="col">Username</th>
//             <th scope="col">Email</th>
//             <th scope="col">Role</th>
//             <th scope="col">Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {listUser &&
//             listUser.length > 0 &&
//             listUser.map((item, index) => {
//               return (
//                 <tr key={`table-users-${index}`}>
//                   <td>{item.id}</td>
//                   <td>{item.username}</td>
//                   <td>{item.email}</td>
//                   <td>{item.roles[0]?.name}</td>
//                   <td>{item.r.name}</td>
//                   <td>
//                     <button className="btn btn-secondary" onClick={() => props.handleViewUser(item)}>View</button>
//                     <button onClick={() => props.handleCliclBtnUpdate(item)} className="btn btn-warning mx-3">Update</button>
//                     <button className="btn btn-danger" onClick={() => props.handleClickDeleteUser(item) }>Delete</button>
//                   </td>
//                 </tr>
//               );
//             })}
//           {listUser && listUser.length === 0 && (
//             <tr>
//               <td colSpan={4}>Not found user</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
    
//     </>
//   );
// };
// export default TableUser;
