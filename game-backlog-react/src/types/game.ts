import { Util } from "./util";
import { Platform } from "./platform";
import { Pagination } from "./pagination";
import { Genre } from "./genre";
import { Store } from "./store";
import { Rating } from "./rating";

export type Game = {
  id: number;
  slug: string;
  name: string;
  description: string;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  ratings: Rating[];
  esrb_rating: Util;
  released: string;
  genres: Genre[];
  platforms: Platform[];
  tags?: Util[];
  stores: Store[];
  metacritic: number;
  playtime: number;
  reviews_count: number;
  
};

export interface GameList extends Pagination {
  results: Game[];
}
