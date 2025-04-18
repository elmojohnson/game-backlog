export type Backlog = {
  id: number;
  name: string;
  description: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type PaginatinatedBacklog = {
  data: Backlog[] | null;
  count: number | null;
  totalPages: number;
};

export type PaginatedBacklogGames = {
  data: BacklogGame[] | null;
  count: number | null;
  totalPages: number;
};

export type BacklogGame = {
  id: number;
  name: string;
  thumbnail: string;
  game_metadata: string;
  note: string;
  user_id: string;
  backlog_id: number;
  created_at: string;
  updated_at: string;
};
