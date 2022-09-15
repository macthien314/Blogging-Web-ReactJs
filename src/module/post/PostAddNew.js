import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/button";
import { Field, FieldCheckboxes } from "../../components/field";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { useForm } from "react-hook-form";
import { Radio } from "../../components/checkbox";
import { Dropdown } from "../../components/dropdown";
import slugify from "slugify";
import { postStatus } from "../../utils/constants";
import ImageUpload from "../../components/image/ImageUpLoad";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import Toggle from "../../components/toggle/Toggle";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { useAuth } from '../../contexts/auth-context'
import { toast } from "react-toastify";
import DashboardHeading from "../dashboard/DashboardHeading";
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { userInfo } = useAuth();
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      author: "",
      hot: false,
      image: '',
      category: {},
      user: {}
    },
  });

  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  //hook
  const { image, handleResetUpload, progress, handleSelectImage, handleDeleteImage } = useFirebaseImage(setValue, getValues);
  const watchStatus = watch("status");
  const watchHot = watch('hot');
  const [loading, setLoading] = useState(false);
  // const watchCategory = watch("category");



  const addPostHandler = async (values) => {
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);
      const colRef = collection(db, 'posts');
      await addDoc(colRef, {
        ...cloneValues,
        image,
        createAt: serverTimestamp(),
        // title: cloneValues.title,
        // slug: cloneValues.slug,
        // hot: cloneValues.hot,
        // status: cloneValues.status,
        // categoryId: cloneValues.categoryId
      });
      toast.success('Create new post successfully!');
      reset({
        title: "",
        slug: "",
        status: 2,
        hot: false,
        image: "",
        category: {},
        user: {}
      });
      handleResetUpload();
      setSelectCategory({});

    } catch (error) {
      setLoading(false);
    }

    finally {
      setLoading(false);
    }

  };

  //lưu object user trong database post
  useEffect(() => {
    async function fetchUserData() {
      if (!userInfo.email) return
      const q = query(collection(db, 'users'), where('email', '==', userInfo.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        setValue('user', {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUserData();
  }, [userInfo.email])



  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log("getData ~ result", result);
      setCategories(result);
    }
    getData();
  }, []);

  useEffect(() => {
    document.title = 'Monkey Blogging - Add new post';

  }, []);

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



  return (
    <PostAddNewStyles>
      <DashboardHeading title="Add post" desc="Add new post"></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              className="h-[250px]"
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>

          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder='Select the category'></Dropdown.Select>
              {/* <Dropdown.Select placeholder={`${selectCategory.name || 'Select category'}`}></Dropdown.Select> */}
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

        <div className="grid grid-cols-2 gap-x-10 mb-10">

          <Field>
            <Label>Feature Post</Label>
            <Toggle on={watchHot === true} onClick={() => setValue('hot', !watchHot)}></Toggle>
          </Field>

          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>

        <Button type="submit" className="mx-auto w-[250px]" isLoading={loading} disabled={loading}>
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
