import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "./UI/Button/MyButton";
import {AuthContext} from "../context";
import { FaInstagram } from 'react-icons/fa';
import { SlLogin } from 'react-icons/sl';
const Navbar = () => {
    const {auth, setIsAuth} = useContext(AuthContext)
    // const [auth, setIsAuth] = useContext(AuthContext) - Тут я увидел что если неправильно изпользовать деструктуризацию
    // то вылазит ошибка и мы не можем достать данные из этого контекста
    // console.log(auth)
    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }
    return (
            <div className='navbar'>
                <MyButton onClick={logout}>
                    Выйти
                </MyButton>
                <div className='navbar__links'>
                    <MyButton>
                        <Link to='posts' className='link'>Товары</Link>
                    </MyButton>
                    <MyButton>
                        <Link to='about' className='link'>Обо мне</Link>
                    </MyButton>
                    <MyButton>
                        <Link
                            className='link'
                            to='https://www.instagram.com/prosto_isuu//'
                            target='_blank'
                        ><FaInstagram/></Link>
                    </MyButton>
                </div>
            </div>
    );
};

export default Navbar;