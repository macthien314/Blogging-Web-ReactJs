import React, { useEffect, useState } from "react";
import { Table } from "../../components/table";
import { Button } from "../../components/button";
import { Dropdown } from "../../components/dropdown";
import DashboardHeading from "../dashboard/DashboardHeading";
import { collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, query, startAfter, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { useNavigate } from "react-router-dom";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import Swal from "sweetalert2";
import { Label, LabelStatus } from "../../components/label";
import { postStatus, userRole } from "../../utils/constants";
import { debounce } from "lodash";
import { useAuth } from "../../contexts/auth-context";
import { Field } from "../../components/field";
const PostManage = () => {

  const navigate = useNavigate();

  const POST_PER_PAGE = 3;

  const [postList, setPostList] = useState([]);
  const [filter, setFilter] = useState('');
  const [lastDoc, setLastDoc] = useState();

  const [total, setTotal] = useState(0);

  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');

  const [value, setValue] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = filter
        ? query(
          colRef,
          where("title", ">=", filter),
          where("title", "<=", filter + "utf8")
        )
        : query(colRef, limit(POST_PER_PAGE)); // tìm kiếm
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
        setPostList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter])

  async function handleDeletePost(postId) {
    const colRef = doc(db, 'posts', postId);
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
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    });
  }

  const renderPostStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>
        case postStatus.PENDING:
        return <LabelStatus type="pending">Pending</LabelStatus>
        case postStatus.REJECTED:
        return <LabelStatus type="danger">Rejected</LabelStatus>

      default: break;
    }

  }

  const handleSearchPost = debounce((e) =>{
    setFilter(e.target.value);
  },250)   /* debounce hạn chế request quá nhiều khi onChange*/

  
  const handleLoadMorePost= async () => {
    // Query the first page of docs
    const first = query(collection(db, "categories"), limit(1));
    // Construct a new query starting at this document,
    // get the next 25 cities.
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc),
      limit(POST_PER_PAGE)
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
      setPostList([...postList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);

    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

    //lưu object category trong database post
    const handleClickOption = async (item) => {
      const colRef = doc(db, 'categories', item.id);
      const docData = await getDoc(colRef);
      setValue('category', {
        id: docData.id,
        ...docData.data()
      });
      setSelectCategory(item);
    }
  

  // const {userInfo} = useAuth();
  // if(userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <DashboardHeading
        title="All posts"
        desc="Manage all posts"
      ></DashboardHeading>
      <div className="mb-10 flex justify-end gap-5">
        <div className="w-full max-w-[200px]">
        <Field>   
        <Dropdown>
              <Dropdown.Select placeholder='Category'></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 && categories.map((item) => (
                  <Dropdown.Option key={item.id} onClick={() => handleClickOption(item)}>{item.name} </Dropdown.Option>
                )
                )}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 rounded-lg bg-green-50 text-green-700  text-sm font-bold">
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 rounded-lg border border-solid border-gray-300"
            placeholder="Search post..."
            onChange={handleSearchPost}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 && postList.map((post) => {

            const date = post?.createdAt?.seconds ? new Date(post?.createdAt?.seconds * 1000) : new Date();
            const formatDate = new Date(date).toLocaleDateString('vi-VI');
            return (
              <tr key={post.id}>
                <td>{post.id?.slice(0, 5) + '...'}</td>
                <td className="!pr-[100px]">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={post.image}
                      alt=""
                      className="w-[66px] h-[55px] rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{post.title}</h3> {/*max-w-[300px] whitespace-pre-wrap cho chữ xuống hàng*/}
                      <time className="text-sm text-gray-500">
                        Date: {formatDate}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray-500">{post.category?.name}</span>
                </td>
                <td>
                  <span className="text-gray-500">{post.user?.username}</span>
                </td>
                <td>
                  {renderPostStatus(post.status)}
                </td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionView onClick={() => { navigate(`/${post.slug}`) }}></ActionView>
                    <ActionEdit onClick ={() =>{navigate(`/manage/update-post?id=${post.id}`) }}></ActionEdit>
                    <ActionDelete onClick={() => handleDeletePost(post.id)}></ActionDelete>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      {total > postList.length && (
        <div className="mt-10">
          <Button className="mx-auto" onClick={handleLoadMorePost}>
            Load more
          </Button>
          {total}
        </div>
      )}
    </div>
  );
};

export default PostManage;
