import {GalleryPhoto} from './gallery-photo';
import {PhotoDto} from '../../common/model/photo-dto';

export interface Gallery {
  id?: string;
  title: string;
  description?: string;
  user_id: string;
  createdAt?: Date;
  updatedAt?: Date;
  photos?: PhotoDto[];
}
