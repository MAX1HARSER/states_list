import React, {useEffect, useRef, useState} from 'react';
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
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort:"", query:""})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setlimit] = useState(10);
    const [page, setPage] = useState(1);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () =>{
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit))
    })
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();


    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(prevState => prevState + 1)
    } )


    useEffect(()=>{
        fetchPosts(limit, page)
    },[page, limit])

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
            <MySelect
                value={limit}
                onChange={value => setlimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все посты'},
                ]}

            />
            {postError &&
                <h1> TypeError: ${postError}</h1>
            }
            <PostList remove={RemovePost} posts={sortedAndSearchedPosts} title={"JsonPlaceHolder"}/>

            <div ref={lastElement} style={{backgroundColor: 'teal', height: '20px'}}></div>

            {isPostsLoading &&
                <div  style={{display:'flex', justifyContent:'center', marginTop: 50}}><Loader/></div>
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
