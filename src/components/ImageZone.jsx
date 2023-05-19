import styled from "styled-components";
import Light from "./Light";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: auto;
  border-radius: var(--xs);
  border-bottom-left-radius: var(--l);
  background-color: var(--light-gray);
  padding: var(--s) var(--md);
`;

const DecorationStrip = styled.div`
  margin: var(--xs);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  font-size: xx-large;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: auto;
  aspect-ratio: 4/3;
  background-color: var(--blue);
  border-radius: var(--s);
  border: var(--xs) solid var(--black);
`;

const Image = styled.img`
  height: auto;
  width: 65%;
  background-color: var(--blue);
`;

const ImageZone = ({ sprite, id, name }) => {
  return (
    <Container>
      <DecorationStrip style={{ justifyContent: "center" }}>
        {[...Array(2)].map((e, i) => (
          <Light
            key={i}
            color="var(--dark-red)"
            size="var(--s)"
            style={{
              border: "var(--xxs) solid var(--black)",
              margin: "0 var(--s)",
            }}
          />
        ))}
      </DecorationStrip>
      <ImageContainer>
        <Image src={sprite} />
        <div>
          #{id} {name}
        </div>
      </ImageContainer>
      <DecorationStrip>
        <Light color="var(--dark-red)" />
        <div>≡</div>
      </DecorationStrip>
    </Container>
  );
};

export default ImageZone;
