export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
	timestamp: string;
}

export interface User {
	id: string;
	email: string;
	password: string; // Almacenar hasheado (bcrypt)
	createdAt: Date;
}

export type ImageApiResponse = ApiResponse<Buffer>;
export type AuthApiResponse = ApiResponse<{ token: string }>;
