import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const logoPath = {
  bgWhite: "images/logo_png_bgWhite.png",
  bgBlue: "images/logo_png_bgBlue.png",
  noBg: "images/logo_png_noBg.png",
  textBlue: "images/logo_png_textBlue.png",
};

const Header = ({ user, modalView, setModalView }: any) => {
  const onClick = (e: any) => setModalView(!modalView);
  return (
    <div className="header">
      <ul>
        <li>
          <Link to="/">
            <img
              className="logo"
              src={logoPath.textBlue}
              alt="건강한수면 로고_하얀배경"
            />
          </Link>
        </li>
        <li>
          <Link to="/record">기록하기</Link>
        </li>
        <li>
          <Link to="/weekGraph">주간 별 그래프</Link>
        </li>
        <li>
          {user ? (
            <button className="userinfo" onClick={onClick}>
              {user.username}님
            </button>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
