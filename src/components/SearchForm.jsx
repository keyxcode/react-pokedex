import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
  grid-column: 1 / span 2;
  width: 100%;
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--xs);
`;

const FormInput = styled.input`
  background-color: var(--blue);
  color: var(--black);
  border-radius: var(--s);
  border: var(--xs) solid var(--black);
  padding: 0;
  width: 100%;

  :focus {
    outline: none;
  }
`;

const FormButton = styled(Button)`
  background-color: var(--dark-red);
  padding: 0;
  width: 100%;
`;

const SearchForm = ({ handleSubmit, setSearchId, searchId }) => {
  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <FormButton>search</FormButton>
        <FormInput
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </StyledForm>
    </Container>
  );
};

export default SearchForm;
