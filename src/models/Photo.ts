import { Schema, model } from 'mongoose';
import { IPhoto } from '../interfaces';

const photoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'This field is required']
  },
  description: {
    type: String,
    maxlength: 300
  },
  photoPath: {
    type: String
  }
});
export default model<IPhoto>('Photo', photoSchema);
