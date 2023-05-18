import styled from "styled-components";

const Light = styled.div`
  height: ${(props) => props.size || "var(--l)"};
  width: ${(props) => props.size || "var(--l)"};
  border-radius: 50%;
  display: inline-block;
  border: var(--xs) solid var(--black);
  /* background-color: ${(props) => props.bgColor || "#fff"}; */
  background-color: ${(props) => props.bgColor || "#fff"};
`;

export default Light;
