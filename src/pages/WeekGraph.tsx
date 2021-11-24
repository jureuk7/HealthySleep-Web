import React, { useEffect, useState } from "react";
import WeekGraphContainer from "../containers/WeekGraphContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { initializeForm, readWeek } from "../modules/sleepData";

const WeekGraph = () => {
  return <WeekGraphContainer />;
};

export default WeekGraph;
