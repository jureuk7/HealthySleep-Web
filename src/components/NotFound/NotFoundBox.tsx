import React from "react";
import "./NotFoundBox.scss";

const NotFoundBox = () => {
  return (
    <div className="box">
      <div className="errorTitle">404</div>
      <div className="errorDescription">
        주소를 잘못찾아오셨나요? 이 페이지는 없는 페이지입니다.
      </div>
    </div>
  );
};

export default NotFoundBox;
