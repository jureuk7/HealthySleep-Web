import React, { useEffect, useState } from "react";
import "./AuthContainer.scss";
import { useNavigate } from "react-router-dom";
import { changeField, initializeForm, login } from "../modules/auth";
import { useDispatch, useSelector } from "react-redux";
import { check } from "../modules/user";
import AuthForm from "../components/auth/AuthForm";

const LoginContainer = () => {
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  //@ts-ignore
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const [passwordShown, setPasswordShown] = useState(false);

  const { username, password } = form;

  const onChange = (e: any) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "login",
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError("로그인에 실패했습니다.");
      return;
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/");
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log("localStorage가 작동하지 않습니다.");
      }
    }
  }, [navigate, user]);

  const passwordShownChange = (e: any) => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="authWrapper">
      <AuthForm
        type="login"
        error={error}
        onChange={onChange}
        onSubmit={onSubmit}
        passwordShownChange={passwordShownChange}
        passwordShown={passwordShown}
        username={username}
        password={password}
      />
    </div>
  );
};

export default LoginContainer;
