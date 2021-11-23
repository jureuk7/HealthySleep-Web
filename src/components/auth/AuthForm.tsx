import React from "react";
import { Link } from "react-router-dom";
import "./AuthForm.scss";

const AuthForm = ({
  type,
  onSubmit,
  username,
  onChange,
  passwordShown,
  passwordShownChange,
  password,
  error,
  passwordConfirm,
}: any) => {
  return (
    <div className="authForm">
      {type === "login" ? <h1>로그인</h1> : <h1>회원가입</h1>}
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
          <input
            type="checkbox"
            checked={passwordShown}
            name="passwordShown"
            onChange={passwordShownChange}
          />
          <label htmlFor="passwordShown" onClick={passwordShownChange}>
            비밀번호 보이기
          </label>
        </div>
        {type === "register" ? (
          <>
            <h5>비밀번호 재입력</h5>
            <input
              type="password"
              value={passwordConfirm}
              placeholder="PW를 다시 입력해주세요"
              onChange={onChange}
              name="passwordConfirm"
            />
          </>
        ) : null}
        {error && <div className="errorMessage">{error}</div>}
        {type === "login" ? (
          <button type="submit">로그인</button>
        ) : (
          <button type="submit">회원가입</button>
        )}
      </form>
      {type === "login" ? <Link to="/register">회원가입</Link> : null}
    </div>
  );
};

export default AuthForm;
