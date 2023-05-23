import styled from "styled-components";
import Light from "./Light";
import loading from "../assets/pikachu.gif";

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

const Screen = styled.div`
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

const ImageContainer = styled.div`
  width: 65%;
  height: 100%;
  background-color: var(--blue);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RedLight = styled(Light)`
  background-color: var(--dark-red);
`;

const SmallStaticLight = styled(RedLight)`
  border: var(--xxs) solid var(--black);
  margin: 0 var(--s);
`;

const activeLightStyle = {
  transition: "0.5s",
  filter: "brightness(2.5)",
};

const inactiveLightStyle = {
  transition: "0.5s",
  filter: "brightness(1)",
};

const imgLoadingStyle = {
  height: "auto",
  width: "50%",
};

const imgLoadedStyle = {
  transition: "0.3s",
  height: "auto",
  width: "100%",
};

const ImageZone = ({ sprite, id, name, errorLightActive, isLoading }) => {
  // console.log("Rendering ImageZone");

  return (
    <Container>
      <DecorationStrip style={{ justifyContent: "center" }}>
        {[...Array(2)].map((e, i) => (
          <SmallStaticLight key={i} size="var(--s)" />
        ))}
      </DecorationStrip>
      <Screen>
        <ImageContainer>
          <img
            src={isLoading ? loading : sprite}
            style={isLoading ? imgLoadingStyle : imgLoadedStyle}
          />
        </ImageContainer>
        <div>
          #{isLoading ? "..." : id} {isLoading ? "..." : name}
        </div>
      </Screen>
      <DecorationStrip>
        <RedLight
          style={errorLightActive ? activeLightStyle : inactiveLightStyle}
        />
        <div>≡</div>
      </DecorationStrip>
    </Container>
  );
};

export default ImageZone;
