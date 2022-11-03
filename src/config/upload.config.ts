import { resolve } from 'path';
import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';

const tmpFolder = resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: tmpFolder,
  storage: diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
};
