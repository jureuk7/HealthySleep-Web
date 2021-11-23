import React from "react";
import "./RecordInner.scss";
const RecordInner = ({
  user,
  onSubmit,
  startSleep,
  finishSleep,
  onStartSleepChange,
  setNowStartSleep,
  onFinishSleepChange,
  setNowFinishSleep,
  navigate,
}: any) => {
  return (
    <>
      {user ? (
        <div className="record-inner">
          <h1>
            <span>{user["username"]}님의</span>
            <br />
            <span>오늘 수면시간을 기록해주세요</span>
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-inner">
              <span>잠든 시간</span>
              <div className="time-immer">
                <input
                  type="number"
                  pattern="[0-9]*"
                  placeholder="2021"
                  value={startSleep.year}
                  onChange={onStartSleepChange}
                  name="year"
                />
                년
                <input
                  type="number"
                  pattern="[0-9]*"
                  placeholder="01"
                  value={startSleep.month}
                  onInput={onStartSleepChange}
                  name="month"
                />
                월
                <input
                  type="number"
                  pattern="[0-9]*"
                  placeholder="01"
                  value={startSleep.day}
                  onInput={onStartSleepChange}
                  name="day"
                />
                일
                <input
                  type="number"
                  pattern="[0-9]*"
                  placeholder="09"
                  value={startSleep.hour}
                  onInput={onStartSleepChange}
                  name="hour"
                />
                시
                <input
                  type="number"
                  pattern="[0-9]*"
                  placeholder="00"
                  value={startSleep.min}
                  onInput={onStartSleepChange}
                  name="min"
                />
                분<button onClick={setNowStartSleep}>현재 시간 입력하기</button>
              </div>
              <span>일어난 시간</span>
              <div className="time-immer">
                <input
                  type="number"
                  pattern="[0-9]*"
                  placeholder="2021"
                  value={finishSleep.year}
                  onInput={onFinishSleepChange}
                  name="month"
                />
                년
                <input
                  type="number"
                  pattern="[0-9]*"
                  placeholder="01"
                  value={finishSleep.month}
                  onInput={onFinishSleepChange}
                  name="month"
                />
                월
                <input
                  type="number"
                  pattern="[0-9]*"
                  placeholder="01"
                  value={finishSleep.day}
                  onInput={onFinishSleepChange}
                  name="day"
                />
                일
                <input
                  type="number"
                  pattern="[0-9]*"
                  placeholder="09"
                  value={finishSleep.hour}
                  onInput={onFinishSleepChange}
                  name="hour"
                />
                시
                <input
                  type="number"
                  pattern="[0-9]*"
                  placeholder="00"
                  value={finishSleep.min}
                  onInput={onFinishSleepChange}
                  name="min"
                />
                분
                <button onClick={setNowFinishSleep}>현재 시간 입력하기</button>
              </div>
              <button type="submit" className="save">
                기록 저장하기
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="record-inner">
          <h1>로그인이 필요한 서비스입니다.</h1>
          <button className="goLogin" onClick={() => navigate("/login")}>
            로그인하러가기
          </button>
        </div>
      )}
    </>
  );
};

export default RecordInner;
