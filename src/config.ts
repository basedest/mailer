/**
 * Configuration for the mailer. Provided by the host application.
 */
export interface MailerConfig {
    provider: 'log' | 'resend';
    from: string;
    resendApiKey?: string;
    retryEnabled?: boolean;
    rateLimitPerMinute?: number;
}
