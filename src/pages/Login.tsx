import React, {useEffect, useState} from "react";
import './Login.scss';
import {Link, useNavigate} from "react-router-dom"
import {changeField, initializeForm, login} from "../modules/auth";
import {useDispatch, useSelector} from "react-redux";
import {check} from "../modules/user";

const Login = () => {

    const [error,setError] = useState<string | null>(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //@ts-ignore
    const {form, auth,authError,user} = useSelector(({auth,user})=>({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    const [passwordShown, setPasswordShown] = useState(false);

    const {username,password} = form

    const onChange = (e: any) => {
        const {value,name} = e.target;
        dispatch(
            changeField({
                form: 'login',
                key:name,
                value
            })
        )
    }

    const onSubmit = (e:any) => {
        e.preventDefault();
        dispatch(login({username,password}));
    }

    useEffect(()=> {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(()=> {
        if(authError) {
            setError('로그인에 실패했습니다.');
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
        <div className="loginWrapper">
      <div className="loginForm">
      <h1>로그인</h1>
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
          {error && <div className="errorMessage">{error}</div>}
        <button type="submit">로그인</button>
      </form>
          <Link to="/register">회원가입</Link>
      </div>
        </div>
    </div>
  );
};

export default Login;
