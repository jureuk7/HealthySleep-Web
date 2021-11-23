import React, { useState } from "react";
import Header from "../components/common/Header";
import { useSelector } from "react-redux";
import { RootState } from "../modules";
import SleepDescription from "../components/home/SleepDescription";
import StatusBox from "../components/home/StatusBox";
import ModalLogout from "../components/common/ModalLogout";

interface userType {
  _id: string | null;
  username?: string;
}

const HomeContainer = () => {
  const [modalView, setModalView] = useState(false);

  let user: userType | null;
  ({ user } = useSelector(({ user }: RootState) => ({ user: user.user })));
  let status: any = 5;

  let avgTime: any;

  const data = {
    labels: ["일", "월", "화", "수", "목", "금", "토"],
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
    <>
      <Header user={user} modalView={modalView} setModalView={setModalView} />
      <StatusBox options={options} avgTime={avgTime} data={data} />
      <SleepDescription />
      {modalView ? (
        <ModalLogout modalView={modalView} setModalView={setModalView} />
      ) : null}
    </>
  );
};

export default HomeContainer;
