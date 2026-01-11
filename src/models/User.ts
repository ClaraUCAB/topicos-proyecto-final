import mongoose, { Schema } from 'mongoose';

export interface User {
	id: string;
	email: string;
	password: string;   // OJO: aquí va el hash bcrypt
	createdAt: Date;
}

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true, // bcrypt hash
		},
	},
	{
		timestamps: { createdAt: true, updatedAt: false }, // crea createdAt como Date
	}
);

// Transform: _id -> id (string) y quita campos internos
userSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: (_doc, ret) => {
		ret.id = String(ret._id);
		delete ret._id;
	},
});

userSchema.set('toObject', {
	virtuals: true,
	versionKey: false,
	transform: (_doc, ret) => {
		ret.id = String(ret._id);
		delete ret._id;
	},
});

export const UserModel =
	mongoose.models.User ?? mongoose.model('User', userSchema);