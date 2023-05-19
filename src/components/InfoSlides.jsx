import styled from "styled-components";

const Container = styled.div`
  grid-column: 1;
  grid-row: 2 / span 3;
  height: 200px;
  width: 100%;
  font-size: small;
  overflow-y: scroll;
  background-color: var(--green);
  padding: var(--xs);
  border-radius: var(--s);
  border: var(--xs) solid var(--black);
  word-wrap: break-word;
`;

const showStyle = {
  display: "block",
};

const hideStyle = {
  display: "none",
};

const InfoSlides = ({ pkmObject, activeInfoSlide }) => {
  return (
    <Container>
      <div style={activeInfoSlide === 0 ? showStyle : hideStyle}>
        {pkmObject.description}
      </div>
      <div style={activeInfoSlide === 1 ? showStyle : hideStyle}>
        {pkmObject.types.map((type) => (
          <div key={type}>{type} </div>
        ))}
      </div>
      <div style={activeInfoSlide === 2 ? showStyle : hideStyle}>
        {pkmObject.stats.map((stat) =>
          Object.entries(stat).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))
        )}
      </div>
    </Container>
  );
};

export default InfoSlides;
