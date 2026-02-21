/**
 * Minimal logger interface for mailer. The host application provides
 */
export interface MailerLogger {
    log(opts: {
        level?: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
        message: string;
        extra?: Record<string, unknown>;
    }): void;
}
