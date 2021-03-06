import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import './LoginForm.css';


const LoginForm = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');    
    const idRef = useRef();
    const pwRef = useRef();
    const idErrorRef = useRef();
    const pwErrorRef = useRef();
    const { currentUser, login } = useAuth();
    const history = useHistory();

    const handleId = (e) => {
        if (id.length < 5) {
            idErrorRef.current.classList.add('error');
            e.target.classList.add('error');
        } else {
            idErrorRef.current.classList.remove('error');
            e.target.classList.remove('error');
        }

        if(e.type === 'focus') {            
            idRef.current.classList.add('focus');            
        } else if (e.type === 'blur') {
            if (id.length > 0) {
                return;
            } else {
                idRef.current.classList.remove('focus');
            }            
        } else {            
            setId(e.target.value);
        }        
    };

    const handlePw = (e) => {
        if (pw.length < 5) {
            pwErrorRef.current.classList.add('error');
            e.target.classList.add('error');
        } else {
            pwErrorRef.current.classList.remove('error');
            e.target.classList.remove('error');
        }

        if(e.type === 'focus') {            
            pwRef.current.classList.add('focus');
        } else if (e.type === 'blur') {
            if (pw.length > 0) {
                return;
            } else {
                pwRef.current.classList.remove('focus');
            }            
        } else {            
            setPw(e.target.value);
        }     
    };    

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (!id && !pw) return;
        
        try {
            await login(id, pw);
            alert(`${currentUser.email}??? ???????????????`);
            history.push('/browse');
        } catch {
            setId('');
            setPw('');
            alert('??????????????? ??????????????? ?????? ????????????');
        }          
    };

    const idInputManage = {
        onChange : handleId,
        onFocus : handleId,
        onBlur : handleId
    };
    const pwInputManage = {
        onChange : handlePw,
        onFocus : handlePw,
        onBlur : handlePw
    };


    return (
        <div className="login-form">
            <h2>?????????</h2>
            <form onSubmit={onSubmitForm} >
                <label ref={idRef} htmlFor="login-id">
                    <span>????????? ?????? ?????? ????????????</span>
                    <input 
                    id="login-id" 
                    type="text"
                    value={id}
                    {...idInputManage}                   
                    />
                    <div ref={idErrorRef} className="login-error">????????? ????????? ????????? ??????????????? ???????????????.</div>
                </label>

                <label ref={pwRef} htmlFor="login-pw">
                    <span>????????????</span>
                    <input 
                    id="login-pw"
                    type="password"
                    value={pw}
                    {...pwInputManage}
                    />
                    <div ref={pwErrorRef} className="login-error">??????????????? 4 - 60??? ???????????? ?????????.</div>
                </label>

                <button type="submit">?????????</button>

                <div className="check-container">
                    <label className="login-check" htmlFor="login-check">
                        <span>????????? ?????? ??????</span>
                        <input id="login-check" type="checkbox"/>                                          
                    </label>
                    <a href="#a">????????? ???????????????????</a>  
                </div>

                <p><img src="https://assets.nflxext.com/ffe/siteui/login/images/FB-f-Logo__blue_57.png" alt="facebook"/><span>Facebook?????? ?????????</span> </p>

                <div className="login-signup">
                    Netflix ????????? ?????????????
                    <Link to="/">?????? ???????????????</Link>
                </div>

                <div className="google-check">
                    ??? ???????????? Google reCAPTCHA??? ????????? ?????? ???????????? ????????? ????????? ???????????????. 
                    <a href="#a">????????? ????????????</a>
                </div>
            </form>
        </div>         
    );
}

export default LoginForm; 
