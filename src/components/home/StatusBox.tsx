import React from "react";
import { Line } from "react-chartjs-2";
import "./StatusBox.scss";

const StatusBox = ({ avgTime, options, data, user }: any) => {
  return (
    <div className="status-great">
      <div className="status_info">
        <div className="title">
          <div className="name">{user.username}</div>
          (님)의 수면패턴 정보
        </div>
        <h2>매우 좋음</h2>
        <h3>
          평균 수면 시간 :
          <div className="time">{Math.floor(avgTime / 60)}시간 미만</div>
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
  );
};

export default StatusBox;
