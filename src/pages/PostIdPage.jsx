import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async ()=>{
        const response = await PostService.getById(params.id)
        setPost(response.data);
    })
    const [fetchCommentstById, isCommentsLoading, commentsError] = useFetching(async ()=>{
        const response = await PostService.getCommentsById(params.id)
        setComments(response.data);

    })

    useEffect(()=>{
        fetchPostById()
        fetchCommentstById()
    },[])

    return (
        <div style={{width: '100vw'}}>
            <h1 style={{textAlign: 'center'}}> Страница {params.id}-го поста </h1>

            {
                isLoading ? <Loader/> : <div> {post.id}. {post.title} </div>
            }
            <h2>Коментарии</h2>
            {
                isCommentsLoading
                    ? <Loader/>
                    : <div>
                        {comments.map((comment) =>
                            <div key = {comment.id}style={{marginTop: 15}}>
                                <h5>{comment.email}</h5>
                                <div>{comment.body}</div>
                            </div>
                        )}

                    </div>
            }
        </div>

    );
};

export default PostIdPage;