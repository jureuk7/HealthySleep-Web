import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setField,
  initializeForm,
  changeField,
  exists,
  dataInit,
  mergeData,
  setStartSleep,
  setFinishSleep,
} from "../modules/sleepData";
import { RootState } from "../modules";
import RecordInner from "../components/record/RecordInner";
import ModalLogout from "../components/common/ModalLogout";

const RecordContainer = () => {
  const [error, setError] = useState<string | null>(null);
  const [modalView, setModalView] = useState(false);
  const dispatch = useDispatch();
  const current = new Date();
  const navigate = useNavigate();
  // @ts-ignore
  const { startSleep, finishSleep, isExists, sleepDataError } = useSelector(
    ({ sleepData }: RootState) => ({
      startSleep: sleepData.startSleep,
      finishSleep: sleepData.finishSleep,
      isExists: sleepData.isExists,
      sleepDataError: sleepData.sleepDataError,
    })
  );

  let user: { _id: string | null; username: string | null } | null;
  ({ user } = useSelector(({ user }: RootState) => ({
    user: user.user,
  })));

  const formatDate = (day: string) =>
    day.length === 1 ? "0".concat(day) : day;

  const sleepDate =
    current.getHours() < 18
      ? `${current.getFullYear()}-${current.getMonth() + 1}-${formatDate(
          String(current.getDate() - 1)
        )}`
      : `${current.getFullYear()}-${current.getMonth() + 1}-${formatDate(
          String(current.getDate() - 1)
        )}`;

  const onSubmit = (e: any) => {
    dispatch(
      setStartSleep({
        username: user?.username,
        sleepDate: sleepDate,
        startSleep: startSleep,
      })
    );
    dispatch(
      setFinishSleep({
        username: user?.username,
        sleepDate: sleepDate,
        finishSleep: finishSleep,
      })
    );
    navigate("/");
    alert("성공적으로 저장되었습니다.");
  };

  const setNowStartSleep = () => {
    dispatch(
      setField({
        form: "startSleep",
        year: String(current.getFullYear()),
        month: formatDate(String(current.getMonth() + 1)),
        day: formatDate(String(current.getDate())),
        hour: String(current.getHours()),
        min: String(current.getMinutes()),
      })
    );
  };

  const onStartSleepChange = (e: any) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "startSleep",
        key: name,
        value,
      })
    );
  };

  // eslint-disable-next-line
  useEffect(() => {
    dispatch(initializeForm("startSleep"));
    dispatch(initializeForm("finishSleep"));
    if (user) {
      dispatch(
        exists({
          username: user?.username,
          sleepDate: sleepDate,
        })
      );
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isExists === false) {
      dispatch(
        dataInit({
          username: user?.username,
          sleepDate: sleepDate,
        })
      );
      return;
    }
    if (isExists === true) {
      dispatch(
        mergeData({
          username: user?.username,
          sleepDate: sleepDate,
        })
      );
    }
    // eslint-disable-next-line
  }, [isExists]);

  useEffect(() => {
    if (sleepDataError) {
      setError("제출에 실패했습니다.");
      return;
    }
  }, [sleepDataError]);

  const setNowFinishSleep = (e: any) => {
    dispatch(
      setField({
        form: "finishSleep",
        year: String(current.getFullYear()),
        month: formatDate(String(current.getMonth() + 1)),
        day: formatDate(String(current.getDate())),
        hour: String(current.getHours()),
        min: String(current.getMinutes()),
      })
    );
  }; // 이놈이 원래  저 버튼을 누르면 위에 함수가 호출되야하잖아요. 근데 onSubmit이 호출되요

  const onFinishSleepChange = (e: any) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "finishSleep",
        key: name,
        value,
      })
    );
  };

  return (
    <div>
      <Header user={user} modalView={modalView} setModalView={setModalView} />
      <div className="record-wrapper">
        <RecordInner
          user={user}
          onSubmit={onSubmit}
          setNowStartSleep={setNowStartSleep}
          onStartSleepChange={onStartSleepChange}
          setNowFinishSleep={setNowFinishSleep}
          onFinishSleepChange={onFinishSleepChange}
          startSleep={startSleep}
          finishSleep={finishSleep}
          navigate={navigate}
          error={error}
        />
      </div>
      {modalView ? (
        <ModalLogout modalView={modalView} setModalView={setModalView} />
      ) : null}
    </div>
  );
};

export default RecordContainer;
