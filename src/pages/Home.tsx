import React from "react";
import "./HomeStyle.scss";
import { Line } from "react-chartjs-2";

const Home = () => {
  const logoPath = {
    bgWhite: "images/logo_png_bgWhite.png",
    bgBlue: "images/logo_png_bgBlue.png",
    noBg: "images/logo_png_noBg.png",
    textBlue: "images/logo_png_textBlue.png",
  };
  const data = {
    labels: [
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
      "일요일",
    ],
    datasets: [
      {
        label: "이번 주 수면시간 그래프",
        data: [10, 8, 9, 7, 11, 8, 7],
        fill: true,
        borderColor: "#2564ab",
        backgroundColor: "rgba(37, 100, 171,0.3)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    layout: {
      padding: -5,
    },
    maintainAspectRatio: false,
    plugins: {
      subtitle: {
        display: true,
        text: "",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: "#202020",
        },
        ticks: {
          color: "#202020",
        },
      },
      y: {
        grid: {
          display: false,
          color: "#202020",
        },
        ticks: {
          color: "#202020",
        },
        min: 0,
        max: 14,
      },
    },
  };

  return (
    <div>
      <div className="header">
        <ul>
          <li>
            <img
              className="logo"
              src={logoPath.textBlue}
              alt="건강한수면 로고_하얀배경"
            />
          </li>
          <li>기록하기</li>
          <li>주간 별 그래프</li>
          <li>내 정보</li>
        </ul>
      </div>
      <div className="status">
        <div className="status_info">
          <div className="title">
            <div className="name">주현명</div>
            (님)의 수면패턴 정보
          </div>
          <h2>매우 좋음</h2>
          <h3>
            평균 수면 시간 :<div className="time">3시간 미만</div>
          </h3>
        </div>
        <div className="status_values">
          <Line
            data={data}
            options={options}
            style={{ position: "relative", height: "250px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
