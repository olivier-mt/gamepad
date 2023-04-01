type GamePreviewProps = {
  name: string;
};

const GamePreview = ({ name }: GamePreviewProps) => {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
};

export default GamePreview;
