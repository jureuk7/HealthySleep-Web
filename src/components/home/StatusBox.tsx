import React from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

const StatusBox = ({ avgTime, options, data, user }: any) => {
  let startGradient,
    endGradient,
    textColor,
    statusColor,
    statusTitle,
    borderColor,
    backgroundColor;

  if (avgTime === 0 || !avgTime || !user) {
    startGradient = `rgb(214, 214, 214) 0%`;
    endGradient = `rgb(105, 105, 105) 100%`;
    textColor = `#FFFFFF`;
    statusColor = `#FFFFFF`;
    statusTitle = `입력된 데이터가 부족합니다`;
  } else {
    if (avgTime / 60 <= 3) {
      startGradient = `#ffcdda 0%`;
      endGradient = `#ffc1d0 100%`;
      textColor = `#202020`;
      statusColor = `#ff5487`;
      statusTitle = `매우 나쁨`;
      borderColor = "#ff5487";
      backgroundColor = "rgba(255,135,84,0.3)";
    }
    if (avgTime / 60 > 3 && avgTime / 60 <= 5) {
      startGradient = `#eee3bd 0%`;
      endGradient = `#eec1bd 100%`;
      textColor = `#202020`;
      statusColor = `#ffa654`;
      statusTitle = `나쁨`;
      borderColor = "#ffa654";
      backgroundColor = "rgba(255,166,84,0.3)";
    }
    if (avgTime / 60 > 5 && avgTime / 60 <= 6) {
      startGradient = `rgb(255, 251, 212) 0%`;
      endGradient = `rgb(158, 248, 155) 100%`;
      textColor = `#202020`;
      statusColor = `#139e43`;
      statusTitle = `보통`;
      borderColor = "#139e43";
      backgroundColor = "rgba(19, 158, 67,0.3)";
    }
    if (avgTime / 60 > 6 && avgTime <= 7) {
      startGradient = `#defdff 0%`;
      endGradient = `#c5f8fc 100%`;
      textColor = `#202020`;
      statusColor = `#00b2ff`;
      statusTitle = `좋음`;
      borderColor = "#00b2ff";
      backgroundColor = "rgba(0, 178, 255,0.3)";
    }
    if (avgTime / 60 > 7) {
      startGradient = `#e2f0d9 0%`;
      endGradient = `#bdd7ee 100%`;
      textColor = `#202020`;
      statusColor = `#2564ab`;
      statusTitle = `매우 좋음`;
      borderColor = "#2564ab";
      backgroundColor = "rgba(37, 100, 171,0.3)";
    }
  }

  let graphData = {
    labels: ["일", "월", "화", "수", "목", "금", "토"],
    datasets: [
      {
        label: "이 날의 수면시간",
        fill: true,
        data: data,
        tension: 0.2,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      },
    ],
  } as unknown as any;

  const StatusTemplate = styled.div`
    position: relative;
    width: 100%;
    height: 450px;
    padding-top: 130px;
    background: linear-gradient(90deg, ${startGradient}, ${endGradient});
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    color: ${textColor};
    font-family: "SB 어그로체", sans-serif;
  `;

  const StatusBox = styled.div`
    flex-direction: column;
    justify-content: flex-start;
  `;

  const Title = styled.div`
    font-size: 30px;
    font-weight: lighter;
  `;

  const Status = styled.div`
    font-size: 80px;
    font-weight: bolder;
    color: ${statusColor};
    margin-top: 20px;
    margin-bottom: 20px;
  `;

  const AvgTime = styled.div`
    font-size: 20px;
  `;

  return (
    <StatusTemplate>
      <StatusBox>
        {user && (
          <Title>
            <b>{user.username}</b>
            (님)의 수면패턴 정보
          </Title>
        )}
        <Status>
          {user ? (
            statusTitle
          ) : (
            <span>
              로그인이 필요한
              <br />
              서비스입니다
            </span>
          )}
        </Status>
        {user && (
          <AvgTime>
            평균 수면 시간 :{" "}
            <span className="time">
              {Math.floor(avgTime / 60) + 1}시간 미만
            </span>
          </AvgTime>
        )}
      </StatusBox>
      {user && (
        <div>
          <Line
            data={graphData}
            options={options}
            style={{ position: "relative", height: "250px" }}
          />
        </div>
      )}
    </StatusTemplate>
  );
};

export default StatusBox;
