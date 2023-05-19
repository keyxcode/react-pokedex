import styled from "styled-components";

const NavigationButtons = ({ prevPkm, nextPkm, infoDown, infoUp }) => {
  return (
    <div className="buttons-zone">
      <button className="prev-button" onClick={prevPkm}>
        ◁
      </button>
      <button className="next-button" onClick={nextPkm}>
        ▷
      </button>
      <button className="down-button" onClick={infoDown}>
        ▽
      </button>
      <button className="up-button" onClick={infoUp}>
        △
      </button>
      <div className="color-strip row"></div>
      <div className="color-strip col"></div>
    </div>
  );
};

export default NavigationButtons;
