import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Agent } from 'https';

@Injectable()
export class NetworkService {
    private readonly logger = new Logger(NetworkService.name);

    private readonly httpsAgent = new Agent({
        keepAlive: true,
        rejectUnauthorized: false,
        timeout: 45000,
    });

    post(url: string, data: any, config?: AxiosRequestConfig) {
        this.setHttpAgent(config);

        this.logger.log(
            { label: `Request ${url}`, method: this.post.name, message: data },
            NetworkService.name,
        );

        return axios
            .post(url, data, config)
            .then((value: AxiosResponse) => {
                this.logger.log(
                    { label: `Success ${url}`, method: this.post.name, message: null },
                );

                return value.data;
            })
            .catch(reason => {
                const error = (reason && reason.response && reason.response.data) || 'Network failure';

                this.logger.error({ label: `Failure ${url}`, method: this.post.name, message: error });

                throw { url, error, method: this.post.name };
            });
    }

    get(url: string, config?: AxiosRequestConfig) {
        this.setHttpAgent(config);

        this.logger.log(
            { label: `Request ${url}`, method: this.get.name, message: null },
        );

        return axios.get(url, config)
            .then((value: AxiosResponse) => {
                this.logger.log(
                    { label: `Success ${url}`, method: this.get.name, message: null },
                );
                return value.data;
            })
            .catch(reason => {
                const error = (reason && reason.response && reason.response.data) || 'Network failure';
                this.logger.error(
                    { label: `Failure ${url}`, method: this.get.name, message: error },
                );

                throw { url, error, method: this.get.name };
            });

    }

    private setHttpAgent(config: AxiosRequestConfig) {
        config = config || {};
        config.httpsAgent = this.httpsAgent;
    }
}