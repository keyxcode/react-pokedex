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

const LightsZone = () => {
  return (
    <LightsZoneContainer>
      <Light color="var(--blue)" size="var(--xxl)" />
      <Light color="var(--dark-red)" style={{ gridColumn: 2 }} />
      <Light color="var(--yellow)" style={{ gridColumn: 3 }} />
      <Light color="var(--green)" style={{ gridColumn: 4 }} />
    </LightsZoneContainer>
  );
};

export default LightsZone;
