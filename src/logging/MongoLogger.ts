import { ILogger } from './ILogger.ts';

class MongoLogger implements ILogger {
    async log(entry: LogEntry): Promise<void> {
        // Guardar en colección de MongoDB
    }
}
