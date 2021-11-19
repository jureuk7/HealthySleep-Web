import React, {useEffect, useState} from 'react';
import './Register.scss'
import {useDispatch, useSelector} from "react-redux";
import {changeField,initializeForm,register} from "../modules/auth";
import {check} from "../modules/user";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const [error,setError] = useState<string | null>(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // @ts-ignore
    const {form, auth,authError,user} = useSelector(({auth,user})=>({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    const [passwordShown, setPasswordShown] = useState(false);

    const {username,password,passwordConfirm} = form;

    const onChange = (e: any) => {
        const {value,name} = e.target;
        dispatch(
            changeField({
                form: 'register',
                key:name,
                value
            })
        )
    }

    const onSubmit = (e:any) => {
        e.preventDefault();

        if([username,password,passwordConfirm].includes('')) {
            setError('빈 칸이 존재합니다.');
            return;
        }
        // 비밀번호가 일치하지 않는다면
        if(password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            dispatch(changeField({form: 'register',key: 'password', value: ''}));
            dispatch(changeField({form: 'register',key: 'passwordConfirm', value: ''}));
            return;
        }
        dispatch(register({username,password}));
    }

    useEffect(()=> {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    useEffect(()=> {
        if(authError) {
            // 계정이 이미 존재
            if (authError.response.status === 409) {
                setError('해당 계정명은 이미 존재합니다.');
                return;
            }
            //기타 이유
            setError('회원가입에 실패하였습니다.');
            return;
        }
        if(auth) {
            dispatch(check());
        }
    }, [auth,authError,dispatch]);

    useEffect(()=> {
        if(user) {
            navigate('/')
        }
    }, [navigate,user]);

    const passwordShownChange = (e:any) => {
        setPasswordShown(!passwordShown);
    }

    return (
        <div>
            <div className="registerWrapper">
                <div className="registerForm">
                    <h1>신규가입</h1>
                    <form onSubmit={onSubmit}>
                        <h5>사용자 이름</h5>
                        <input
                            type="text"
                            value={username}
                            placeholder="사용자 이름을 입력해주세요"
                            onChange={onChange}
                            name="username"
                            />
                        <h5>비밀번호</h5>
                        <input
                            type={passwordShown ? "text" : "password"}
                            value={password}
                            placeholder="비밀번호를 입력해주세요"
                            onChange={onChange}
                            name="password"
                        />
                        <div className="passwordWrapper">
                        <input type="checkbox"
                            checked={passwordShown}
                            name="passwordShown" onChange={passwordShownChange}/>
                        <label htmlFor="passwordShown" onClick={passwordShownChange} >비밀번호 보이기</label>
                        </div>
                        <h5>비밀번호 재입력</h5>
                        <input
                            type="password"
                            value={passwordConfirm}
                            placeholder="PW를 다시 입력해주세요"
                            onChange={onChange}
                            name="passwordConfirm"
                        />
                        {error && <div className="errorMessage">{error}</div>}
                        <button type="submit">회원가입</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;