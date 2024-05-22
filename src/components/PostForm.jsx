import {React, useState} from "react";
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'



const PostForm = ({create}) => {
    const [post,setPost] = useState({title: '', body: ''})    
    
    const addNewPost = (event) => {
        event.preventDefault()
      
        const newPost = {
            ...post, id: Date.now(),
        }
        create(newPost)
    
        setPost({title: '', body: ''})
      
        
    }

    return (
        <form>
            <MyInput
                type='text' 
                placeholder='Название поста'
                onChange={event => setPost({...post, title: event.target.value})}
                value={post.title}
            />
        
            <MyInput
                type='text' 
                placeholder='Текст поста'
                onChange={event => setPost({...post,  body: event.target.value })}
                value={post.body}
            />
            <MyButton onClick={addNewPost} > Создать пост</MyButton>
        </form>
  );
}


export default PostForm