export interface Posting {
  id?: string;
  slug?: number;
  title?: string;
  content: string;
  user_id?: string;
  username?: string;
  created_at?: Date;
  updated_at?: Date;
  photos?: string[];
}
