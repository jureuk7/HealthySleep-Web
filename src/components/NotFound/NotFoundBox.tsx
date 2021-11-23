import React, { useState } from "react";
import "./NotFoundBox.scss";
import Header from "../common/Header";
import ModalLogout from "../common/ModalLogout";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import { Link } from "react-router-dom";

const NotFoundBox = () => {
  const [modalView, setModalView] = useState(false);
  let user: { _id: string | null; username: string | null } | null;
  ({ user } = useSelector(({ user }: RootState) => ({
    user: user.user,
  })));
  return (
    <>
      <Header user={user} modalView={modalView} setModalView={setModalView} />
      <div className="notfound-wrapper">
        <div className="notfound-inner">
          <div className="errorTitle">404</div>
          <div className="errorDescription">
            주소를 잘못찾아오셨나요?
            <br />이 페이지는 없는 페이지입니다.
          </div>
          <Link to="/">
            <button>메인 페이지로 돌아가기</button>
          </Link>
        </div>
      </div>
      {modalView ? (
        <ModalLogout modalView={modalView} setModalView={setModalView} />
      ) : null}
    </>
  );
};

export default NotFoundBox;
