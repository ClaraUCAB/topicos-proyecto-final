import { ILogger, LogEntry } from './ILogger.ts';

class FileLogger implements ILogger {
	async log(entry: LogEntry): Promise<void> {
		// Escribir en archivo .log
	}
}
