import axios from "axios";
import { error } from "console";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GameDetailsPage = () => {
  const { gameId } = useParams();

  const [game, setGame] = useState<any>();

  useEffect(() => {
    try {
      const getGameInfo = async () => {
        const gameInfo = await axios.get(
          `https://api.rawg.io/api/games/${gameId}?key=01597bfbfa2f4a2b81104848a7098dfe`
        );

        setGame(gameInfo);
        console.log("game Info", gameInfo);
      };

      getGameInfo();
    } catch (error) {}
  }, []);

  return <div>GAME DETAILS `${gameId}`</div>;
};

export default GameDetailsPage;
