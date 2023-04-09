import { useParams } from "react-router-dom";

const GameDetailsPage = () => {
  const { gameId } = useParams();

  return <div>GAME DETAILS {gameId}</div>;
};

export default GameDetailsPage;
