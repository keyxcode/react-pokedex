import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
  grid-column: 1 / span 2;
  width: 100%;
`;

const SearchForm = ({ handleSubmit, setSearchId, searchId }) => {
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Button style={{ backgroundColor: "var(--dark-red)", padding: 0 }}>
          search
        </Button>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </form>
    </Container>
  );
};

export default SearchForm;
