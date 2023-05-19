import styled from "styled-components";
import SearchForm from "./SearchForm";
import InfoSlides from "./InfoSlides";
import NavigationButtons from "./Navigation";

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

const ControlZone = ({
  handleSubmit,
  setFormInput,
  formInput,
  pkmObject,
  activeInfoSlide,
  prevPkm,
  nextPkm,
  infoUp,
  infoDown,
}) => {
  return (
    <ControlsContainer>
      <SearchForm
        handleSubmit={handleSubmit}
        setFormInput={setFormInput}
        formInput={formInput}
      />
      <InfoSlides pkmObject={pkmObject} activeInfoSlide={activeInfoSlide} />
      <NavigationButtons
        prevPkm={prevPkm}
        nextPkm={nextPkm}
        infoUp={infoUp}
        infoDown={infoDown}
      />
    </ControlsContainer>
  );
};

export default ControlZone;
