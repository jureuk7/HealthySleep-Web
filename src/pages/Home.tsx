import React from "react";
import "./HomeStyle.scss";
import { Line } from "react-chartjs-2";
import Header from "../components/Header";
import {useSelector} from "react-redux";
import {RootState} from "../modules";

const imagePath = {
  hypertension: "images/hypertension.jpg",
  impotence: "images/impotence.jpg",
  petulance: "images/petulance.jpg",
  centralization: "images/centralization.jpg",
  depression:"images/depression.jpg"
};

interface userType {
  _id: string | null;
  username? :string;
}

const Home = () => {

  let user: userType | null;
  ({user} = useSelector(({user}: RootState) => ({user: user.user})));
  let status: any = 5;

  let avgTime: any;

  const data = {
    labels: [
      "일",
      "월",
      "화",
      "수",
      "목",
      "금",
      "토",
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
      <Header user={user} />

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
      <div className="description">
        <h1 className="title">잠을 충분히 자지 않으면 이런 위험이 있을 수 있어요!</h1>
      <div className="descriptionContainer">
            <div>
              <h1>첫째</h1>
              <h3>고혈압</h3>
              <img src={imagePath.hypertension} alt="" className="descriptionImage"/>
              <p>충분하지 못한 수면
                혹은 불면증은 심혈관 건강에
                영향을 미칠 수 있습니다.
                이 문제는 혈압이 상승할
                수 있는 문제로도 이어져
                심장이 필요 이상으로 작동
                하게 만들 수 있다.</p>

            </div>

            <div>
              <h1>둘째</h1>
             <h3>집중력 저하</h3>
              <img src={imagePath.centralization} alt="" className="descriptionImage"/>
              <p>잠을 제대로 이루지 못하면
                주의 집중 시간이 줄어들고
                인지기능이 떨어지게 됩니다.
                뇌는 낮 동안 활동성이 떨어지며
                피로 때문에 집중하지 못하고
                정상적인 인지 과정을
                수행할 수 없게 됩니다.</p>

            </div>

            <div>
              <h1>셋째</h1>
              <h3>우울감 심화</h3>
              <img src={imagePath.depression} alt="" className="descriptionImage"/>
              <p>수면 부족은 불안 및 우울감을 심화시킬 수 있다. 반대로, 우울증은 수면에 영향을 줘 불면증을 일으키기도 한다.
                이처럼 수면과 우울은 밀접한 관계다. 실제로 2021년 JAMA Psychiatry 저널에 발표된 연구에 따르면,
                잠자는 시간이 우울증 발병에 영향을 미쳤다.
                </p>

            </div>

            <div>
              <h1>넷째</h1>
              <h3>짜증과 분노 증가</h3>
              <img src={imagePath.petulance} alt="" className="descriptionImage"/>
              <p>충분히 못 자면, 짜증을 쉽게 느끼고 작은 일에도 분노하게 된다. 수면 시간을 줄인 사람은 더 자주, 더 강하게 분노를 나타낸다. 반면, 숙면한 사람은 대체적으로 화를 적게 낸다. 잠을 못 자면
                감정을 조절하는 뇌 전두엽 피질 활동이 저하되면서 이성을 잃을 확률이 높아지는 것으로 나타났다.
                </p>

            </div>
            <div>
              <h1>다섯번째</h1>
              <h3>성욕 감소</h3>
              <img src={imagePath.impotence} alt="" className="descriptionImage"/>
              <p>수면 부족은 성호르몬 수치를 떨어뜨려
                성욕을 감소시킬 수 있다. 수면 부족이 계속되면, 여성호르몬 분비 주기에 영향을 줘 불임의
                가능성을 높인다. 남성은 렘수면 중 발기현상이 나타나는데, 수면 부족으로 렘수면이 줄면 발기현상도 줄어든다.
                남성호르몬이 원활히 분비되지 못해 발기부전이 일어날 수 있다.</p>

            </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
