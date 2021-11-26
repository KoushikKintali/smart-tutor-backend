import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from './logger/logger';
import { LogInterceptor } from './interceptors/logger.interceptor';
import EnvValidator from './env/env.validator';
import SentryService from './middlewares/sentry.middleware';
import express from 'express';
import { ValidationPipe } from './pipe/validation.pipe';
require('newrelic');

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new Logger(),
    });
    // TODO: Change as per the project requirement
    app.setGlobalPrefix('smart-tutor/api/v1');
    app.useGlobalPipes(new ValidationPipe());

    SentryService.initializeSentry(app);
    app.use(SentryService.Handlers.requestHandler() as express.RequestHandler);
    app.useGlobalInterceptors(new LogInterceptor());
    const tracingHandler = SentryService.Handlers.tracingHandler();
    app.use((req, res, next) => {
        const url = SentryService.replaceIdsInURL(req.url);
        const tracingReq: any = { ...req };
        tracingReq.url = url;
        tracingHandler(tracingReq, res, next);
    });

    EnvValidator.validate();

    app.useGlobalInterceptors(new LogInterceptor());

    app.use(
        SentryService.Handlers.errorHandler() as express.ErrorRequestHandler,
    );


    await app.listen(process.env.PORT);
}
bootstrap();
