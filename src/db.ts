import { connect } from 'mongoose';
import { config } from 'dotenv';
config();

export const connectDb = async () => {
  await connect(
    process.env.MONGO_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
};
