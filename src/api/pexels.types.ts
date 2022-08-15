export type CollectionT = {
  id: string;
  title: string;
  description: string;
  private: boolean;
  media_count: number;
  photos_count: number;
  videos_count: number;
};

export type PhotoT = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
};

export type getCollectionsPropsT = {
  page: number;
  per_page: number;
};

export type getCollectionsResponseT = {
  collections: CollectionT[];
  page: number;
  per_page: number;
  total_results: number;
  next_page: string;
  prev_page: string;
};
