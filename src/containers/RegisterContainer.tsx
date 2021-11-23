import React, { useEffect, useState } from "react";
import "./AuthContainer.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, register } from "../modules/auth";
import { check } from "../modules/user";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";

const RegisterContainer = () => {
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // @ts-ignore
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const [passwordShown, setPasswordShown] = useState(false);

  const { username, password, passwordConfirm } = form;

  const onChange = (e: any) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "register",
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if ([username, password, passwordConfirm].includes("")) {
      setError("빈 칸이 존재합니다.");
      return;
    }
    // 비밀번호가 일치하지 않는다면
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      dispatch(changeField({ form: "register", key: "password", value: "" }));
      dispatch(
        changeField({ form: "register", key: "passwordConfirm", value: "" })
      );
      return;
    }
    dispatch(register({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      // 계정이 이미 존재
      if (authError.response.status === 409) {
        setError("해당 계정명은 이미 존재합니다.");
        return;
      }
      //기타 이유
      setError("회원가입에 실패하였습니다.");
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
        type="register"
        error={error}
        onChange={onChange}
        onSubmit={onSubmit}
        passwordShownChange={passwordShownChange}
        passwordShown={passwordShown}
        username={username}
        password={password}
        passwordConfim={passwordConfirm}
      />
    </div>
  );
};

export default RegisterContainer;
