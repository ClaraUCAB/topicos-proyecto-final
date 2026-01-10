export enum LogLevel {
	Debug,
	Info,
	Warn,
	Error,
	Critical,
}

export enum OperationResult {
	Success,
	Failure,
}

export interface LogEntry {
	timestamp: Date; // FIX: Maybe Time?
	userEmail: string;
	endpoint: string;
	parameters: Record<string, string>; // FIX: Probably use a generic here. Record<string, T>?
	executionTime: Time;
	result: OperationResult;
	error?: string;
}

export interface ILogger {
	log(entry: LogEntry): Promise<void>;
}
