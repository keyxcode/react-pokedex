import Light from "./Light";
import styled from "styled-components";

const LightsZoneContainer = styled("div")`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  gap: var(--s);
  padding: var(--s);
  border-bottom: var(--xs) solid var(--dark-red);
`;

const activeLightStyle = {
  transition: "0.5s",
  filter: "brightness(2.5)",
};

const inactiveLightStyle = {
  transition: "0.5s",
  filter: "brightness(1)",
};

// Need to provide type
const LightsZone = ({ activeInfoSlide, mainLightActive }) => {
  return (
    <LightsZoneContainer>
      <Light
        color="var(--blue)"
        size="var(--xxl)"
        style={mainLightActive ? activeLightStyle : inactiveLightStyle}
      />
      <Light
        color="var(--dark-red)"
        style={activeInfoSlide === 0 ? activeLightStyle : inactiveLightStyle}
      />
      <Light
        color="var(--yellow)"
        style={activeInfoSlide === 1 ? activeLightStyle : inactiveLightStyle}
      />
      <Light
        color="var(--green)"
        style={activeInfoSlide === 2 ? activeLightStyle : inactiveLightStyle}
      />
    </LightsZoneContainer>
  );
};

export default LightsZone;
