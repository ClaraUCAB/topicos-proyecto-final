export enum LogLevel {
	Debug = 'debug',
	Info = 'info',
	Warn = 'warn',
	Error = 'error',
	Critical = 'critical',
}

export enum OperationResult {
	Success = 'success',
	Failure = 'error',
}

export interface LogEntry {
	timestamp: Date;
	level: LogLevel | null;
	userEmail: string;
	endpoint: string;
	parameters: Record<string, string>;
	executionTime: number | null;
	result: OperationResult | null;
	message?: string;
}

export interface ILogger {
	log(entry: LogEntry): Promise<void>;
}
