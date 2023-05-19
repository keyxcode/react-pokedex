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

const StaticLight = styled(Light)`
  background-color: var(--dark-red);
`;

const SmallStaticLight = styled(StaticLight)`
  border: var(--xxs) solid var(--black);
  margin: 0 var(--s);
`;

const ImageZone = ({ sprite, id, name }) => {
  return (
    <Container>
      <DecorationStrip style={{ justifyContent: "center" }}>
        {[...Array(2)].map((e, i) => (
          <SmallStaticLight key={i} size="var(--s)" />
        ))}
      </DecorationStrip>
      <ImageContainer>
        <Image src={sprite} />
        <div>
          #{id} {name}
        </div>
      </ImageContainer>
      <DecorationStrip>
        <StaticLight />
        <div>≡</div>
      </DecorationStrip>
    </Container>
  );
};

export default ImageZone;
