import Light from "./Light";
import styled from "styled-components";

const LightsZoneContainer = styled("div")`
  width: 100%;
  display: grid;
  justify-content: start;
  align-items: start;
  gap: var(--s);
  padding: var(--s);
  border-bottom: var(--xs) solid var(--dark-red);
`;

const LightsZone = ({ activeInfoSlide }) => {
  return (
    <LightsZoneContainer>
      <Light color="var(--blue)" size="var(--xxl)" style={{ filter: "none" }} />
      <Light
        color="var(--dark-red)"
        className={activeInfoSlide === 0 ? "active-light" : ""}
        style={{
          gridColumn: 2,
          // filter: activeInfoSlide === 0 ? "brightness(2)" : "none",
        }}
      />
      <Light
        color="var(--yellow)"
        className={activeInfoSlide === 1 ? "active-light" : ""}
        style={{
          gridColumn: 3,
          // filter: activeInfoSlide === 1 ? "brightness(2)" : "none",
        }}
      />
      <Light
        color="var(--green)"
        className={activeInfoSlide === 2 ? "active-light" : ""}
        style={{
          gridColumn: 4,
          // filter: activeInfoSlide === 2 ? "brightness(2)" : "none",
        }}
      />
    </LightsZoneContainer>
  );
};

export default LightsZone;
