import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

export default class SentryService {
    static initializeSentry(app: any): void {
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            integrations: [
                // enable HTTP calls tracing
                new Sentry.Integrations.Http({ tracing: true }),
                // enable Express.js middleware tracing
                new Tracing.Integrations.Express({ app }),
            ],
            tracesSampleRate: 0.01, // Be sure to lower this in production
            environment: process.env.SENTRY_ENVIRONMENT,
            beforeSend: (event) => {
                if (event && event.transaction) {
                    // replacing schoolids with id for generalizing trasactions
                    event.transaction = SentryService.replaceIdsInURL(event.transaction);
                }
                return event;
            },
        });
    }
    static handleErrorViaSentry(errMessage: any): void {
        Sentry.configureScope(() => {
            errMessage = typeof errMessage == 'object' ? JSON.stringify(errMessage) : errMessage;
            Sentry.captureException(new Error(errMessage));
        });
    }
    static replaceIdsInURL(url: string): string {
        return url.replace(/\/(\d+|[abcdef\d]{24})\b/g, '/{id}');
    }
    static Handlers = Sentry.Handlers;
}
