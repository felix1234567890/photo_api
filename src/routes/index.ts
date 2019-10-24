import { Router } from 'express';
import multer from '../helpers/photoUploader';
import {
  createPhoto,
  getPhotos,
  getPhoto,
  deletePhoto,
  updatePhoto
} from '../controllers/photoController';

const router = Router();
router.post('/', multer.single('photo'), createPhoto);
router.get('/', getPhotos);
router.get('/:photoId', getPhoto);
router.delete('/:photoId', deletePhoto);
router.put('/:photoId', updatePhoto);
export default router;
