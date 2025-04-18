import { Util } from "./util";

export type Platform = {
  platform: Util;
  released_at?: string;
  requirements?: {
    minimum: string;
    recommended: string;
  };
};
