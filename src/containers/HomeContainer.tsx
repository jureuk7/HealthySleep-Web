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

  const [avgTime, setAvgTime] = useState(0);
  const [arrayData, setArrayData] = useState([] as string[]);

  const options = {
    layout: {
      padding: -2,
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
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [weekend]);

  return (
    <>
      <Header user={user} modalView={modalView} setModalView={setModalView} />
      <StatusBox
        options={options}
        avgTime={avgTime}
        data={arrayData}
        user={user}
      />
      <SleepDescription />
      {modalView ? (
        <ModalLogout modalView={modalView} setModalView={setModalView} />
      ) : null}
    </>
  );
};

export default HomeContainer;
