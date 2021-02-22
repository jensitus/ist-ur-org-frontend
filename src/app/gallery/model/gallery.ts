import {GalleryPhoto} from './gallery-photo';

export interface Gallery {
  id?: string;
  title: string;
  description?: string;
  user_id: string;
  createdAt?: Date;
  updatedAt?: Date;
  photos?: GalleryPhoto[];
}
