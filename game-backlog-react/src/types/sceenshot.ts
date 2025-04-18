import { Pagination } from "./pagination";

export type Screenshot = {
  id: number;
  image: string;
  hidden: boolean;
  width: number;
  height: number;
};

export interface ScreenshotList extends Pagination {
  results: Screenshot[];
}
