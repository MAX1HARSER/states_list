import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navbar_items'>
                <Link to='/posts'> Посты </Link>
                <Link to='/about'> О сайте</Link>
            </div>
        </div>
    );
};

export default Navbar;