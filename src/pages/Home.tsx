import React from "react";
import "./HomeStyle.scss";
import { Line } from "react-chartjs-2";
import Header from "../components/Header";

const Home = () => {
  let status: any = 5;

  let avgTime: any;

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

  let avg: number =
    data.datasets[0].data.reduce((a: number, b: number) => a + b) /
    data.datasets[0].data.length;

  avgTime = Math.floor(avg) + "시간 미만";

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
      data.datasets[0].borderColor = "#139e43";
      data.datasets[0].backgroundColor = "rgba(19, 158, 67,0.3)";
      break;
    case 4:
      data.datasets[0].borderColor = "#ffa654";
      data.datasets[0].backgroundColor = "rgba(255,166,84,0.3)";
      break;
    case 5:
      data.datasets[0].borderColor = "#2564ab";
      data.datasets[0].backgroundColor = "rgba(37, 100, 171,0.3)";
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
      <Header />

      <div className="status-great">
        <div className="status_info">
          <div className="title">
            <div className="name">주현명</div>
            (님)의 수면패턴 정보
          </div>
          <h2>매우 좋음</h2>
          <h3>
            평균 수면 시간 :<div className="time">{avgTime}</div>
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
