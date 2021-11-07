import React, { useState } from "react";
import "./HomeStyle.scss";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";

const Home = () => {
  const [veryGood, setVeryGood] = useState("flex");
  const [good, setGood] = useState("none");
  const [normal, setNormal] = useState("none");
  const [bad, setBad] = useState("none");
  const [veryBad, setVeryBad] = useState("none");
  const [unInserted, setUnInserted] = useState("none");

  let status: any = 1;
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
        label: "이 날의 수면시간",
        data: [10, 8, 9, 7, 11, 8, 7],
        fill: true,
        tension: 0.1,
      },
    ],
  } as unknown as any;

  let avg =
    data.datasets[0].data.reduce((a: any, b: any) => a + b, 0) /
    data.datasets[0].datalength;

  if (avg)
    switch (status) {
      case 1:
        data.datasets[0].borderColor = "#ffa654";
        data.datasets[0].backgroundColor = "rgba(255,166,84,0.3)";
        break;
      case 2:
        data.datasets[0].borderColor = "#ffa654";
        data.datasets[0].backgroundColor = "rgba(255,166,84,0.3)";
        break;
      case 3:
        data.datasets[0].borderColor = "#ffa654";
        data.datasets[0].backgroundColor = "rgba(255,166,84,0.3)";
        break;
      case 4:
        data.datasets[0].borderColor = "#ffa654";
        data.datasets[0].backgroundColor = "rgba(255,166,84,0.3)";
        break;
      case 5:
        data.datasets[0].borderColor = "#ffa654";
        data.datasets[0].backgroundColor = "rgba(255,166,84,0.3)";
        break;
    }

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
          <li>
            <Link to="/weekGraph">주간 별 그래프</Link>
          </li>
          <li>
            <Link to="/myInfo">내 정보</Link>
          </li>
        </ul>
      </div>

      <div
        className="status-veryGood"
        style={{
          display: `${veryGood}`,
        }}
      >
        <div className="status_info">
          <div className="title">
            <div className="name">주현명</div>
            (님)의 수면패턴 정보
          </div>
          <h2>매우 좋음</h2>
          <h3>
            평균 수면 시간 :<div className="time">10시간</div>
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

      <div
        className="status-veryBad"
        style={{
          display: `${veryBad}`,
        }}
      >
        <div className="status_info">
          <div className="title">
            <div className="name">주현명</div>
            (님)의 수면패턴 정보
          </div>
          <h2>매우 나쁨</h2>
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

      <div
        className="status-bad"
        style={{
          display: `${bad}`,
        }}
      >
        <div className="status_info">
          <div className="title">
            <div className="name">주현명</div>
            (님)의 수면패턴 정보
          </div>
          <h2>나쁨</h2>
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

      <div
        className="status-good"
        style={{
          display: `${good}`,
        }}
      >
        <div className="status_info">
          <div className="title">
            <div className="name">주현명</div>
            (님)의 수면패턴 정보
          </div>
          <h2>좋음</h2>
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

      <div
        className="status-normal"
        style={{
          display: `${normal}`,
        }}
      >
        <div className="status_info">
          <div className="title">
            <div className="name">주현명</div>
            (님)의 수면패턴 정보
          </div>
          <h2>보통</h2>
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

      <div
        className="status-unInserted"
        style={{
          display: `${unInserted}`,
        }}
      >
        <div className="status_info">
          <div className="title">
            <div className="name">주현명</div>
            (님)의 수면패턴 정보
          </div>
          <h2>입력된 정보 없음</h2>
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
