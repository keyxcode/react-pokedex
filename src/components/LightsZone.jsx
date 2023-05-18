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

// Need to provide type
// Investigate gradual className change
const LightsZone = ({ activeInfoSlide, mainLightActive }) => {
  console.log(activeInfoSlide, mainLightActive);
  return (
    <LightsZoneContainer>
      <Light
        color="var(--blue)"
        className={mainLightActive ? "active-light" : ""}
        size="var(--xxl)"
      />
      <Light
        color="var(--dark-red)"
        className={activeInfoSlide === 0 ? "active-light" : ""}
        style={{
          gridColumn: 2,
        }}
      />
      <Light
        color="var(--yellow)"
        className={activeInfoSlide === 1 ? "active-light" : ""}
        style={{
          gridColumn: 3,
        }}
      />
      <Light
        color="var(--green)"
        className={activeInfoSlide === 2 ? "active-light" : ""}
        style={{
          gridColumn: 4,
        }}
      />
    </LightsZoneContainer>
  );
};

export default LightsZone;
