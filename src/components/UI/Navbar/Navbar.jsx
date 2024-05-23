import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";
import cls from './Navbar.module.css'

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            {isAuth ? <MyButton
                style = {{color:'#F0F8FF'}}
                onClick = {logout} className={{text: 'red'}}
            >
                Выйти
            </MyButton> : null
            }


            <div className='navbar_items'>
                <Link className={cls.links} to='/posts'> Посты </Link>
                <Link className={cls.links} to='/about'> О сайте</Link>
            </div>

        </div>
    );
};

export default Navbar;