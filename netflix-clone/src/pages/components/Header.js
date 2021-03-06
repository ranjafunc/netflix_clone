import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <h1>
                <span className="hide">Raflix</span>                
                <img src="./images/Netflix_Logo_PMS2.png" alt="로고" />               
            </h1>    
            <div className="login">
                <Link to='/login'>로그인</Link>   
            </div>          
        </header>
    );
};

export default Header;