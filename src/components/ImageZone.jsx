import Light from "./Light";

const ImageZone = ({ sprite, id, name }) => {
  return (
    <div className="img-zone">
      <div className="img-border">
        <div className="img-decoration top">
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
        </div>
        <div className="img-container">
          <img src={sprite} />
          <div className="pkm-name">
            #{id} {name}
          </div>
        </div>
        <div className="img-decoration bottom">
          <Light color="var(--dark-red)" />
          <div>≡</div>
        </div>
      </div>
    </div>
  );
};

export default ImageZone;
