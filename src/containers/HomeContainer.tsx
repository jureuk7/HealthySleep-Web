import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import SleepDescription from "../components/home/SleepDescription";
import StatusBox from "../components/home/StatusBox";
import ModalLogout from "../components/common/ModalLogout";
import { initializeForm, readWeek } from "../modules/sleepData";

interface userType {
  _id: string | null;
  username?: string;
}

const HomeContainer = () => {
  const current = new Date();
  const dispatch = useDispatch();

  const [modalView, setModalView] = useState(false);

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

  let status: any = 5;

  const [avgTime, setAvgTime] = useState(0);
  const [arrayData, setArrayData] = useState([] as string[]);
  const [statusVisible, setStatusVisible] = useState();

  let data = {
    labels: ["일", "월", "화", "수", "목", "금", "토"],
    datasets: [
      {
        label: "이 날의 수면시간",
        fill: true,
        data: arrayData,
        tension: 0.5,
      },
    ],
  } as unknown as any;

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
        max: Math.floor(avgTime / 60) + 5,
      },
    },
  };

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
    <>
      <Header user={user} modalView={modalView} setModalView={setModalView} />

      <StatusBox
        options={options}
        avgTime={avgTime}
        data={data}
        user={user}
        visible={true}
      />
      <SleepDescription />
      {modalView ? (
        <ModalLogout modalView={modalView} setModalView={setModalView} />
      ) : null}
    </>
  );
};

export default HomeContainer;
