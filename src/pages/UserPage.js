import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Heading from '../components/layout/Heading';
import Layout from '../components/layout/Layout';
import { db } from '../firebase-app/firebase-config';
import PostItem from '../module/post/PostItem';

const UserPage = () => {
    const[posts, setPosts] = useState([]);
    const params = useParams();


    useEffect(() => {
        async function fecthData() {
            const docRef = query(collection(db, 'posts'), where('user.username', '==', params.slug));
            onSnapshot(docRef, (snapshot) => {
                const results =[];
                snapshot.forEach((doc) => {
                    results.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setPosts(results)
            })
        }
        fecthData();
    }, [params.slug]);


if(posts.length <= 0) return null;
    return (
        <Layout>
        <div className="container">
        <div className="pt-10"></div>
         <Heading>Blogger {params.slug}</Heading>
         <div className="grid-layout grid-layout--primary">
         {posts.map((item) =>(
             <PostItem key={item.id} data={item}></PostItem>
        ) )}
         </div>
        </div>
     </Layout>
    );
};

export default UserPage;