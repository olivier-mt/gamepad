type GamePreviewProps = {
  name: string;
  img: string;
};

const GamePreview = ({ name, img }: GamePreviewProps) => {
  return (
    <div className="home__gameView__game">
      <img className="home__gameView__game__img" src={img} alt="game preview" />
      {<p className="home__gameView__game__title">{name}</p>}
    </div>
  );
};

export default GamePreview;
