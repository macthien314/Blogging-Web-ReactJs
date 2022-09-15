import DashboardHeading from "../dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useState } from "react";
import UserTable from "./UserTable";
import { Button } from "../../components/button";
import { collection, getDocs, limit, onSnapshot, query, startAfter, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useAuth } from "../../contexts/auth-context";
import { userRole } from "../../utils/constants";

const UserManage = () => {

  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();


  const USER_PER_PAGE = 1;



  const [lastDoc, setLastDoc] = useState();
  const handleLoadMoreUser = async () => {
    // Query the first page of docs
    const first = query(collection(db, "users"), limit(1));
    // Construct a new query starting at this document,
    // get the next 25 cities.
    const nextRef = query(
      collection(db, "users"),
      startAfter(lastDoc),
      limit(USER_PER_PAGE)
    );


    onSnapshot(nextRef, (snapshot) => {
      
      let results = [];
      // phân trang ( số lượng phần ử có trong mảng)
      snapshot.forEach((doc) => {

        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList([...userList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);

    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
   
  };

  

  // const {userInfo} = useAuth();
  // if(userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      
      <div className="flex justify-end mb-10">
      <Button kind='ghost' to='/manage/add-user'>Add new user</Button>
      </div>
     
      <UserTable></UserTable>
  
        <div className="mt-10">
          <Button className="mx-auto" onClick={handleLoadMoreUser}>
            Load more
          </Button>
 
        </div>
  
    </div>
  );
};

export default UserManage;
