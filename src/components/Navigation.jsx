import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
  grid-column: 2;
  grid-row: 2 / span 3;
  justify-content: center;
  align-items: center;
  justify-items: center;
  display: grid;
  border-radius: 50%;
  padding: var(--md);
`;

const NavigationButton = styled(Button)`
  background-color: var(--dark-gray);
  color: var(--light-gray);
  font-weight: bolder;
  width: 40px;
  aspect-ratio: 1 / 1;
  z-index: 2;
`;
const PrevButton = styled(NavigationButton)`
  grid-column: 1;
  grid-row: 2;
`;
const NextButton = styled(NavigationButton)`
  grid-column: 3;
  grid-row: 2;
`;
const UpButton = styled(NavigationButton)`
  grid-column: 2;
  grid-row: 1;
`;
const DownButton = styled(NavigationButton)`
  grid-column: 2;
  grid-row: 3;
`;

const ColorStrip = styled.div`
  background-color: var(--dark-gray);
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: var(--md);
`;
const RowStrip = styled(ColorStrip)`
  grid-column: 1 / span 3;
  grid-row: 2;
`;
const ColStrip = styled(ColorStrip)`
  grid-column: 2;
  grid-row: 1 / span 3;
`;

const NavigationButtons = ({ prevPkm, nextPkm, infoDown, infoUp }) => {
  return (
    <Container>
      <PrevButton onClick={prevPkm}>◁</PrevButton>
      <NextButton onClick={nextPkm}>▷</NextButton>
      <DownButton onClick={infoDown}>▽</DownButton>
      <UpButton onClick={infoUp}>△</UpButton>
      <RowStrip />
      <ColStrip />
    </Container>
  );
};

export default NavigationButtons;
