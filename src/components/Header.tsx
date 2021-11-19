import React from "react";
import { Link } from "react-router-dom";

const logoPath = {
  bgWhite: "images/logo_png_bgWhite.png",
  bgBlue: "images/logo_png_bgBlue.png",
  noBg: "images/logo_png_noBg.png",
  textBlue: "images/logo_png_textBlue.png",
};

interface headerProps {
  user: {
    _id:string;
    username:string;
  } | null
}

const Header = ({user}:headerProps) => {
  return (
      <div className="header">
        <ul>
          <li>
            <img
              className="logo"
              src={logoPath.textBlue}
              alt="건강한수면 로고_하얀배경"
            />
          </li>
          <li>
            <Link to="/record">기록하기</Link>
          </li>
          <li>
            <Link to="/weekGraph">주간 별 그래프</Link>
          </li>
          <li>
            {user ? (
                <button className="userinfo">
                {user.username}님
                </button>
            ) : (
                <Link to="/login">로그인</Link>
            )
            }
          </li>
        </ul>
    </div>
  );
};

export default Header;
