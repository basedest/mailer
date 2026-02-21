import type { Mailer } from './index';
import type { MailerConfig } from './config';
import type { MailerLogger } from './logger';
import { LogMailer } from './log';
import { ResendMailer } from './resend';
import { withRateLimit } from './with-rate-limit';
import { withRetry } from './with-retry';

export interface CreateMailerOptions {
    logger?: MailerLogger;
}

export function createMailer(config: MailerConfig, options?: CreateMailerOptions): Mailer {
    const logger = options?.logger;
    let mailer: Mailer;

    switch (config.provider) {
        case 'resend':
            mailer = new ResendMailer({
                apiKey: config.resendApiKey!,
                from: config.from,
            });
            break;
        case 'log':
        default:
            mailer = new LogMailer({ logger });
            break;
    }

    if (config.retryEnabled) {
        mailer = withRetry(mailer, {
            maxAttempts: 3,
            delayMs: 1000,
            onDeadLetter(params, error) {
                logger?.log({
                    level: 'error',
                    message: 'Mail dead letter',
                    extra: {
                        to: params.to,
                        subject: params.subject,
                        error: error.message,
                    },
                });
            },
        });
    }

    if (config.rateLimitPerMinute != null && config.rateLimitPerMinute > 0) {
        mailer = withRateLimit(mailer, { maxPerMinute: config.rateLimitPerMinute });
    }

    return mailer;
}
