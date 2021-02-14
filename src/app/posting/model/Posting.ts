export interface Posting {
  id?: string;
  slug?: number;
  title?: string;
  content: string;
  user_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  photos?: string[];
}
