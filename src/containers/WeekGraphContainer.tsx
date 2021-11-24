import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import StatusBox from "../components/home/StatusBox";
import SleepDescription from "../components/home/SleepDescription";
import ModalLogout from "../components/common/ModalLogout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { initializeForm, readWeek } from "../modules/sleepData";
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
  const { weekend } = useSelector(({ sleepData }: RootState) => ({
    weekend: sleepData.weekend,
  }));

  const sleepDate =
    current.getHours() < 18
      ? `${current.getFullYear()}-${current.getMonth() + 1}-${
          current.getDate() - 1
        }`
      : `${current.getFullYear()}-${
          current.getMonth() + 1
        }-${current.getDate()}`;

  const [avgTime, setAvgTime] = useState(0);
  const [arrayData, setArrayData] = useState([] as string[]);

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

  const SubTitle = styled.div`
    font-family: "Pretendard-Bold", sans-serif;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 2rem;
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
        data: arrayData,
        borderColor: "#ff167d",
        backgroundColor: "rgba(255,22,125,0.3)",
        tension: 0.1,
      },
      {
        label: "이번 주 수면시간 그래프",
        data: [1, 5, 8, 3, 0, 2],
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
      dispatch(
        readWeek({
          username: user.username,
          sleepDate,
        })
      );
    }
  }, []);

  useEffect(() => {
    let result;
    let time = 0;
    if (weekend) {
      if (weekend.avgData.length !== 0) {
        for (let i = 0; i < weekend.avgData.length; i++) {
          time += weekend.avgData[i];
        }
        if (time !== 0) {
          result = time / weekend.avgData.length;
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
        } else {
          result = 0;
        }
      } else {
        result = 0;
      }
    } else {
      result = 0;
    }
    setAvgTime(result);
  }, [weekend]);

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
              paddingLeft: "9rem",
              paddingRight: "9rem",
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
