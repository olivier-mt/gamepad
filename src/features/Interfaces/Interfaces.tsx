export interface GameInterface {
  value: {
    count: number;
    results: [];
    previous: string;
  };
  status: "idle" | "loading" | "failed";
}

export interface UrlInterface {
  url: string;
  page: number;
  search: string;
}
