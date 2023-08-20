import multer from 'multer';
import { extname } from 'path';
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(
      null,
      `${Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substring(2, 16)}${extname(file.originalname)}`
    );
  }
});
export default multer({ storage });
