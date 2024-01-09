import mongoose, { Schema, Document } from 'mongoose'

// Define interface for User document
interface IUser extends Document {
	name: string
	email: string
	password: string
	tokens: string[]
	createdAt: Date
	updatedAt: Date
}

// Define the User schema
const userSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		tokens: [
			{
				type: String
			}
		],
		createdAt: {
			type: Date,
			default: Date.now
		},
		updatedAt: {
			type: Date,
			default: Date.now
		}
	},
	{
		timestamps: true
	}
)

// Create and export the User model
export const User = mongoose.model<IUser>('User', userSchema)
