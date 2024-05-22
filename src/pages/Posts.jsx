import React, { useEffect, useState }  from 'react';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import { usePosts } from '../hooks/userPosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import {getPagesArray, getPagesCount} from '../utils/pages'
import {Pagination} from "../components/UI/pagination/Pagination";


function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort:"", query:""})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setlimit] = useState(10);
    const [page, setPage] = useState(1);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () =>{
        const response = await PostService.getAll(limit, page);

        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit))
    })

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    useEffect(()=>{
        fetchPosts()
    },[page])

    const createPost=(newPost)=>{ //пост из дочернего компонента PostForm
        setPosts([...posts, newPost])
        setModal(false)
    }

    const RemovePost = (post) => {//пост из дочернего компонента PostForm
        setPosts(posts.filter(p=> p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }



    return (
        <div className="App">

            <MyButton style={{marginTop: 30 }} onClick = {()=>{setModal(true)}}>Создать пост</MyButton>

            <MyModal visible={modal} setVisible={setModal}>
                <PostForm  create={createPost}/>
            </MyModal>

            <hr style={{margin: "15px 0"}}/>

            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            {postError &&
                <h1> TypeError: ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display:'flex', justifyContent:'center', marginTop: 50}}><Loader/></div>
                : <PostList remove={RemovePost} posts={sortedAndSearchedPosts} title={"JsonPlaceHolder"}/>

            }
            <Pagination
                changePage={changePage}
                page={page}
                totalPages={totalPages}
            />




        </div>
    );

}

export default Posts;
