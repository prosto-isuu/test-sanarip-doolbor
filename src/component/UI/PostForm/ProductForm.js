import React from 'react'
import MyButton from '../Button/MyButton'
import MyInput from '../Input/MyInput'

const ProductForm = ({create}) => {
    const [post, setPost] = React.useState({title: '', body: ''})

    function addNewPost(event) {
        event.preventDefault()
        const newPost = {
            ...post,
            id: Date.now(),

        }
        create(newPost)
        setPost({title: '', body: '', image: '', price: ''})
    }

    return (
        <form>
            <h1>Добавить товар</h1>
            <MyInput
                type='text'
                placeholder="Название товара!"
                value={post.title}
                onChange={event => setPost({...post, title: event.target.value})}/>
            <MyInput
                type='text'
                placeholder="Описание товара!"
                value={post.body}
                onChange={event => setPost({...post, body: event.target.value})}/>
            <MyInput
                type='text'
                placeholder="Ссылка на изображение!"
                value={post.image}
                onChange={event => setPost({...post, image: event.target.value})}/>
            <MyInput
                type='number'
                placeholder="Цена"
                value={post.image}
                onChange={event => setPost({...post, price: event.target.value})}/>
            <MyButton
                onClick={addNewPost}
            >
                Создать пост
            </MyButton>
        </form>
    )
}

export default ProductForm;