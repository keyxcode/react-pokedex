import styled from "styled-components";

const Container = styled.div`
  grid-column: 1 / span 2;
  width: 100%;
`;

const SearchForm = ({ handleSubmit, setSearchId, searchId }) => {
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <button>search</button>
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
