
import mongoose from 'mongoose';

export const connectDb = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URL as string, {});
		console.log('Connected to MongoDB: ' + conn.connection.host);
	} catch (error) {
		console.error(error);
		process.exit(1); // Exit the process if the connection fails
	}
};