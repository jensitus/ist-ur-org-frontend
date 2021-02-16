export interface Gallery {
  id?: string;
  title: string;
  description?: string;
  user_id: string;
  createdAt?: Date;
  updatedAt?: Date;
  photos?: string[];
}
