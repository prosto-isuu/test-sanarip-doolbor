import React, {useContext} from 'react';
import {Link, NavLink} from "react-router-dom";
import MyButton from "./UI/Button/MyButton";
import {AuthContext} from "../context";
import {FaInstagram} from 'react-icons/fa';
import {BsCart2} from 'react-icons/bs';

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
                        to='https://www.instagram.com/prosto_isuu/'
                        target='_blank'
                    ><FaInstagram/>
                    </Link>
                </MyButton>
                <MyButton>
                    <NavLink
                        className='link'
                        to='/cart'
                    >
                        <BsCart2/>
                    </NavLink>
                </MyButton>
            </div>
        </div>
    );
};

export default Navbar;