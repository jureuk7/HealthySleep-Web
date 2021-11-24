import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import ModalLogout from "../components/common/ModalLogout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { initializeForm, readLastWeek, readWeek } from "../modules/sleepData";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Line } from "react-chartjs-2";

const WeekGraphContainer = () => {
  const current = new Date();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalView, setModalView] = useState(false);

  interface userType {
    _id: string | null;
    username?: string;
  }

  let user: userType | null;

  ({ user } = useSelector(({ user }: RootState) => ({ user: user.user })));
  const { weekend, lastWeekend } = useSelector(({ sleepData }: RootState) => ({
    weekend: sleepData.weekend,
    lastWeekend: sleepData.lastWeekend,
  }));

  const sleepDate =
    current.getHours() < 18
      ? `${current.getFullYear()}-${current.getMonth() + 1}-${
          current.getDate() - 1
        }`
      : `${current.getFullYear()}-${
          current.getMonth() + 1
        }-${current.getDate()}`;

  const lastSleepDate =
    current.getHours() < 18
      ? `${current.getFullYear()}-${current.getMonth() + 1}-${
          current.getDate() - 8
        }`
      : `${current.getFullYear()}-${current.getMonth() + 1}-${
          current.getDate() - 7
        }`;

  const [arrayData, setArrayData] = useState([] as string[]);
  const [prevArrayData, setPrevArrayData] = useState([] as string[]);

  const WeekTemplate = styled.div`
    font-family: "Pretendard", sans-serif;
    width: 100%;
    height: 100%;
    background: #fafafa;
    position: relative;
    text-align: left;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    align-content: normal;
    flex-wrap: nowrap;
    flex-direction: column;
  `;

  const WeekInner = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 160px;
    position: absolute;
    display: flex;
    flex-direction: column;
  `;

  const Title = styled.div`
    font-family: "Pretendard-Black", sans-serif;
    font-size: 3rem;
    color: #262626;
  `;

  const GoLogin = styled.div`
    width: 250px;
    text-align: center;
    padding: 20px;
    margin-top: 40px;
    height: auto;
    background: white;
    border-radius: 100px;
    border: none;
    color: white;
    font-size: 2rem;
    font-family: "Pretendard-Bold", sans-serif;
    background: linear-gradient(
      90deg,
      rgba(11, 38, 255, 1) 0%,
      rgba(161, 91, 255, 1) 100%
    );
    &:hover {
      cursor: pointer;
      background: rgb(0, 28, 255);
      background: linear-gradient(
        90deg,
        rgba(0, 28, 255, 1) 0%,
        rgba(132, 40, 255, 1) 100%
      );
    }
  `;

  let graphData = {
    labels: ["일", "월", "화", "수", "목", "금", "토"],
    datasets: [
      {
        label: "저번 주 수면시간 그래프",
        data: prevArrayData,
        borderColor: "#ff167d",
        backgroundColor: "rgba(255,22,125,0.3)",
        tension: 0.1,
      },
      {
        label: "이번 주 수면시간 그래프",
        data: arrayData,
        borderColor: "#2f00ff",
        backgroundColor: "rgba(47,0,255,0.3)",
        tension: 0.1,
      },
    ],
  } as unknown as any;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  } as unknown as any;

  useEffect(() => {
    if (user) {
      dispatch(initializeForm("weekend"));
      dispatch(initializeForm("lastWeekend"));
      dispatch(
        readWeek({
          username: user.username,
          sleepDate,
        })
      );
      dispatch(
        readLastWeek({
          username: user.username,
          sleepDate: lastSleepDate,
        })
      );
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let time = 0;
    if (weekend) {
      if (weekend.avgData.length !== 0) {
        for (let i = 0; i < weekend.avgData.length; i++) {
          time += weekend.avgData[i];
        }
        if (time !== 0) {
          setArrayData([
            ...arrayData,
            weekend.sunday.exists ? weekend.sunday.elapsed.hour : "0",
            weekend.monday.exists ? weekend.monday.elapsed.hour : "0",
            weekend.tuesday.exists ? weekend.tuesday.elapsed.hour : "0",
            weekend.wednesday.exists ? weekend.wednesday.elapsed.hour : "0",
            weekend.thursday.exists ? weekend.thursday.elapsed.hour : "0",
            weekend.friday.exists ? weekend.friday.elapsed.hour : "0",
            weekend.saturday.exists ? weekend.saturday.elapsed.hour : "0",
          ]);
        }
      } else {
        setArrayData([...arrayData, "0", "0", "0", "0", "0", "0", "0"]);
      }
    }
    // eslint-disable-next-line
  }, [weekend]);

  useEffect(() => {
    let time = 0;
    if (lastWeekend) {
      if (lastWeekend.avgData.length !== 0) {
        for (let i = 0; i < lastWeekend.avgData.length; i++) {
          time += lastWeekend.avgData[i];
        }
        if (time !== 0) {
          setPrevArrayData([
            ...prevArrayData,
            lastWeekend.sunday.exists ? lastWeekend.sunday.elapsed.hour : "0",
            lastWeekend.monday.exists ? lastWeekend.monday.elapsed.hour : "0",
            lastWeekend.tuesday.exists ? lastWeekend.tuesday.elapsed.hour : "0",
            lastWeekend.wednesday.exists
              ? lastWeekend.wednesday.elapsed.hour
              : "0",
            lastWeekend.thursday.exists
              ? lastWeekend.thursday.elapsed.hour
              : "0",
            lastWeekend.friday.exists ? lastWeekend.friday.elapsed.hour : "0",
            lastWeekend.saturday.exists
              ? lastWeekend.saturday.elapsed.hour
              : "0",
          ]);
        }
      } else {
        setPrevArrayData([...prevArrayData, "0", "0", "0", "0", "0", "0", "0"]);
      }
    }
    // eslint-disable-next-line
  }, [lastWeekend]);

  return (
    <WeekTemplate>
      <Header user={user} modalView={modalView} setModalView={setModalView} />
      {user ? (
        <WeekInner>
          <Line
            data={graphData}
            options={options}
            style={{
              position: "relative",
              marginTop: "70px",
              marginBottom: "80px",
              paddingLeft: "11rem",
              paddingRight: "11rem",
              zIndex: 10000,
            }}
          />
        </WeekInner>
      ) : (
        <WeekInner>
          <Title>
            로그인이 필요한
            <br />
            서비스입니다.
          </Title>
          <GoLogin onClick={() => navigate("/login")}>로그인하러가기</GoLogin>
        </WeekInner>
      )}
      {modalView ? (
        <ModalLogout modalView={modalView} setModalView={setModalView} />
      ) : null}
    </WeekTemplate>
  );
};

export default WeekGraphContainer;
