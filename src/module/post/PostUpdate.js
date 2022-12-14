import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/button';
import { Radio } from '../../components/checkbox';
import { Dropdown } from '../../components/dropdown';
import { Field, FieldCheckboxes } from '../../components/field';
import ImageUpload from '../../components/image/ImageUpLoad';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import Toggle from '../../components/toggle/Toggle';
import { db } from '../../firebase-app/firebase-config';
import useFirebaseImage from '../../hooks/useFirebaseImage';
import { postStatus } from '../../utils/constants';
import DashboardHeading from '../dashboard/DashboardHeading';

import axios from 'axios';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
//Upload image trong react quill
import ImageUploader from 'quill-image-uploader';
import slugify from 'slugify';
Quill.register('modules/imageUploader', ImageUploader);



const PostUpdate = () => {
    const { control, handleSubmit, watch, setValue, getValues, reset, formState:{isValid, isSubmitting} } = useForm({
        mode: 'onChange',
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
    })

    //Load imgae trong react quill
    const modules = useMemo(() => ({
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['link', 'image']
        ],
        imageUploader: {
            upload: async (file) => {
               const bodyFormData = new FormData();
               bodyFormData.append('image', file);
               const response = await axios({
                method: 'post',
                url: 'https://api.imgbb.com/1/upload?key=f7e3acfa6df95fd2479bacf8fcc90818',
                data: bodyFormData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
               });
               return response.data.data.url;
            },
          
        },
    }),[]);


    const [params] = useSearchParams();
    const postId = params.get('id');
    const navigate = useNavigate();

    const [content, setContent] = useState('');


    const imageUrl = getValues('image');
    const imageName = getValues('image_name');
    //???? c?? image name k c???n d??ng regex
    // const imageRegex =  /%2F(\S+)\?/gm.exec(imageUrl);
    // const imageName = imageRegex?.length > 0 ? imageRegex[1]:'';

    //hook
    const { setImage, image, handleResetUpload, progress, handleSelectImage, handleDeleteImage } = useFirebaseImage(setValue, getValues, imageName, deletePostImage);
    const watchStatus = watch("status");
    const watchHot = watch('hot');
   




    async function deletePostImage() {
        const colRef = doc(db, 'posts', postId);
        await updateDoc(colRef, {
            image: '',
        });
    }

    useEffect(() => {
        setImage(imageUrl);
    }, [imageUrl, setImage])


    const UpdatePostHandler = async (values) => {
        if(!isValid) return; 
        const docRef = doc(db, 'posts', postId);
        values.status = Number(values.status);
        values.slug = slugify(values.slug || values.title, { lower: true });
        await updateDoc(docRef, {
            ...values,
            image,
            content,
        });
        toast.success('Update post successfully!')
    }

    //L???y categories
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState('');
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


    const handleClickOption = async (item) => {
        const colRef = doc(db, 'categories', item.id);
        const docData = await getDoc(colRef);
        setValue('category', {
            id: docData.id,
            ...docData.data()
        });
        setSelectCategory(item);
    }

    useEffect(() => {
        async function fecthData() {
            if (!postId) return;
            const docRef = doc(db, 'posts', postId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.data()) { //n???u c?? data th?? hi???n th??? d??? li???u theo id
                reset(docSnapshot.data());
                setSelectCategory(docSnapshot.data()?.category || ''); //hi???n th??? categories ???? ???????c ch???n 
                setContent(docSnapshot.data()?.content || '')
            }
        }
        fecthData();
    }, [postId, reset])

    if (!postId) return null;
    return (
        <>
            <DashboardHeading title="Update post" desc={`Update your post ${postId}`}></DashboardHeading>
            <form onSubmit={handleSubmit(UpdatePostHandler)}>
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
                <div className="mb-10 entry-content">
                    <Field>

                        <Label>Content</Label>
                        <div className='w-full'>
                            <ReactQuill modules={modules} theme="snow" value={content} onChange={setContent} />
                        </div>
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

                <Button type="submit" className="mx-auto w-[250px]" isLoading={isSubmitting} disabled={isSubmitting}>
                    Update post
                </Button>
            </form>
        </>
    );
};

export default PostUpdate;