import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../modules/user";
import "./ModalLogout.scss";

const ModalLogout = ({ modalView, setModalView }: any) => {
  const dispatch = useDispatch();

  return (
    <div className="modal_wrapper">
      <div className="modal_inner">
        <div className="header">
          로그아웃
          <button className="close"> &times; </button>
        </div>
        <p className="main">정말로 로그아웃하시겠습니까?</p>
        <div className="modal_button">
          <button onClick={() => setModalView(!modalView)}>취소</button>
          <button
            onClick={() => {
              dispatch(logout());
              setModalView(!modalView);
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;
