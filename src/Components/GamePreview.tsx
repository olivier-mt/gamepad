import { useNavigate } from "react-router-dom";

type GamePreviewProps = {
  name: string;
  img: string;
  id: number;
};

const GamePreview = ({ name, img, id }: GamePreviewProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="home__gameView__game"
      onClick={() => {
        console.log("clicked", id);
        navigate(`/details/${id}`);
      }}
    >
      <img className="home__gameView__game__img" src={img} alt="game preview" />
      {<p className="home__gameView__game__title">{name}</p>}
    </div>
  );
};

export default GamePreview;
