import styled from "styled-components";

const ControlsContainer = styled.div`
  width: 90%;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  row-gap: var(--s);
  gap: var(--xs);
`;

export default ControlsContainer;
