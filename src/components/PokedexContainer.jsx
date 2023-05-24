import styled from "styled-components";

const PokedexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-shadow: inset 0 0 var(--xs) var(--xs) var(--black);
  align-items: center;
  height: 670px;
  width: min(400px, 95vw);
  border-radius: var(--md);
  padding: var(--s);
  background-color: var(--red);
`;

export default PokedexContainer;
