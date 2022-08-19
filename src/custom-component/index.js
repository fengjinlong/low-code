import CText from "./c-text";
import CButton from "./c-button";
import CLine from "./c-line";
import CImg from "./c-img";
import Group from "./Group";
import CStatistic from "./c-statistic";
const components = {
  CText,
  Group,
  CButton,
  CLine,
  CImg,
  CStatistic,
};
const GlobalComponents = (app) => {
  Object.keys(components).forEach((key) => {
    app.component(`${key}`, components[key]);
  });
};
export default GlobalComponents;
