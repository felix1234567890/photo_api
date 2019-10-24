import { Request, Response } from 'express';
import Photo from '../models/Photo';
import fs from 'fs-extra';
import { resolve } from 'path';

export const createPhoto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { title, description } = req.body;
  const newPhoto = {
    title,
    description,
    photoPath: req.file.path
  };
  try {
    const photo = await Photo.create(newPhoto);
    return res.status(201).json({ success: true, data: photo });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
export const getPhotos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const photos = await Photo.find();
  return res.status(200).json(photos);
};
export const getPhoto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { photoId } = req.params;
  const photo = await Photo.findById(photoId);
  if (!photo) {
    return res
      .status(200)
      .json({ success: false, data: 'No photo with given ID' });
  }
  return res.status(200).json({ success: true, data: photo });
};
export const deletePhoto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { photoId } = req.params;
  const photo = await Photo.findById(photoId);
  if (!photo) {
    return res
      .status(200)
      .json({ success: false, data: 'No photo with given ID' });
  }
  fs.unlink(resolve(photo.photoPath));
  await Photo.remove(photo);
  return res.status(200).json({ success: true, message: 'Photo deleted' });
};
export const updatePhoto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { photoId } = req.params;
  const { title, description } = req.body;
  const photo = await Photo.findById(photoId);
  if (!photo) {
    return res
      .status(200)
      .json({ success: false, data: 'No photo with given ID' });
  }
  const updatedPhoto = await Photo.findByIdAndUpdate(
    photoId,
    { title, description },
    { new: true }
  );
  return res.status(200).json({ success: true, data: updatedPhoto });
};
