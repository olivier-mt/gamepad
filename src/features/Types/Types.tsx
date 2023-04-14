export type GamePreviewProps = {
  name: string;
  img: string;
  id: number;
};

export type GameObj = {
  name: string;
  genres: { name: string }[];
  released: string;
  rating: string;
  id: number;
  background_image: string;
  platforms: PlatformObj[];
};

export type PlatformObj = {
  platform: {
    id: number;
    name: string;
    slug: string;
    image_background: string;
  };
};
