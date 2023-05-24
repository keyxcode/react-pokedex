import { createGlobalStyle } from "styled-components";
import background from "./assets/background.png";

const GlobalStyles = createGlobalStyle`
* {
box-sizing: border-box;
font-family: "Silkscreen", system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
  sans-serif;

--red: #d3242b;
--dark-red: #ac2933;
--light-red: #ee1825;
--green: #00a851;
--yellow: #fec803;
--blue: #01aeec;
--black: #1a1619;
--dark-gray: #58585a;
--light-gray: #f2f3f3;

--xxs: 1px;
--xs: 4px;
--s: 8px;
--md: 16px;
--l: 24px;
--xxl: 48px;
}

body {
  background-image: url(${background});
  background-repeat: repeat;
  background-size: 30%;
  backdrop-filter: grayscale(100%);
  -webkit-backdrop-filter: grayscale(100%);

  overflow-x: hidden;
  display: flex;
  margin: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--dark-gray);
}
`;

export default GlobalStyles;
