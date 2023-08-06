import React, {useState} from "react";
import MyButton from "./UI/Button/MyButton";
import {useNavigate} from "react-router-dom";
import {BsFillCartPlusFill} from 'react-icons/bs'

const Product = (props) => {

    const {
        id,
        image,
        title,
        body,
        price,


    } = props.post;

    const router = useNavigate()
    return (
        <div className="post">
            <div className="post__content">
                <div>
                    <img
                        src={image}
                        alt=""
                        className="post__image"
                    />
                </div>
                <strong>{id} {title} - ${price}</strong>
                <div>{body}</div>
                <div>
                </div>
            </div>
            <div className="post_btns">
                <MyButton onClick={() => {
                    props.addCart(props.post)
                }}><BsFillCartPlusFill/>
                </MyButton>
                <MyButton onClick={() => router(`/posts/${props.post.id}`)}>Открыть</MyButton>
            </div>
        </div>
    )
}

export default Product;