import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "../../components/table";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";

import { db } from "../../firebase-app/firebase-config";
import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, where } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { userRole, userStatus } from "../../utils/constants";
import { LabelStatus } from "../../components/label";
import { deleteUser } from "firebase/auth";


import { toast } from "react-toastify";

import Swal from "sweetalert2";
import { debounce } from "lodash";


const UserTable = () => {
  const [filter, setFilter] = useState(""); //tìm kiếm
  const [total, setTotal] = useState(0); // phân trang
  const [lastDoc, setLastDoc] = useState();


  const USER_PER_PAGE = 1;
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      const newRef = filter
        ? query(
          colRef,
          where("username", ">=", filter),
          where("username", "<=", filter + "utf8")
        )
        : query(colRef, limit(USER_PER_PAGE)); // tìm kiếm
      const documentSnapshots = await getDocs(newRef);

      // Get the last visible document
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];


      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });

      onSnapshot(newRef, (snapshot) => {
        let results = [];
        // phân trang ( số lượng phần ử có trong mảng)
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(results);
      });
      setLastDoc(lastVisible);
    }

    fetchData();
  }, [filter]);

  const handleInputFilter = debounce((e) => {
    //tìm kiếm
    setFilter(e.target.value);
  }, 500);


  const renderUserItem = (user) => {
    return (
      <tr key={user.id}>
        <td title={user.id}>{user.id.slice(0, 4) + "..."}</td>
        <td className="whitespace-nowrap">
          <div className="flex items-center gap-x-3">
            <img
              src={user?.avatar}
              alt="123"
              className="w-10 h-10 object-cover rounded-md flex-shrink-0"
            ></img>
            <div className="flex-1">
              <h3>{user?.fullname}</h3>
              <time className="text-sm text-gray-500">{new Date(user?.createdAt?.seconds * 1000).toLocaleDateString('vi-VI')}</time>
            </div>
          </div>
        </td>
        <td>{user?.username}</td>
        <td title={user.email}>{user?.email.slice(0, 5) + '...'}</td>
        <td>{renderLabelStatus(Number(user?.status))}</td>
        <td>{renderRoleLabel(Number(user.role))}</td>
        <td>
          <div className="flex gap-5 text-back-400">
            <ActionView></ActionView>
            <ActionEdit
              onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
            ></ActionEdit>
            <ActionDelete onClick={() => { handleDelete(user) }}></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };

  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>
        break;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Mod</LabelStatus>
        break;
      case userStatus.BAN:
        return <LabelStatus type="danger">User</LabelStatus>
        break;

      default:
        break;
    }
  }

  const renderRoleLabel = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return 'Admin'
        break;
      case userRole.MOD:
        return 'Moderator'
        break;
      case userRole.USER:
        return 'User'
        break;

      default:
        break;
    }
  }

  const handleDelete = async (user) => {
    const colRef = doc(db, 'users', user.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        await deleteUser(user);
        toast.success('Delete user successfully!')
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });

  }

  return (
    <div>
     <div className="mb-10 flex justify-end">
            <input
              type="text"
              placeholder="Search user ..."
              className="py-4 px-5 border border-gray-300 rounded-lg outline-none"
              onChange={handleInputFilter} // tìm kiếm
            />
          </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>User name</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         
          {userList.length > 0 && userList.map((user) => renderUserItem(user))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
