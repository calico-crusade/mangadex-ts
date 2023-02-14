import { Filters, NetworkService, FilterBuilder } from "./network.interface";
import axios from 'axios';

export class AxiosNetwork implements NetworkService {

    constructor(
        private token?: string
    ) { }

    get<T>(url: string, filter?: Filters, data?: any, token?: string): Promise<T> {
        return this.prep<T>('GET', url, filter, data, token);
    }

    post<T>(url: string, filter: Filters, data: any, token?: string): Promise<T> {
        return this.prep<T>('POST', url, filter, data, token);
    }

    put<T>(url: string, filter: Filters, data: any, token?: string): Promise<T> {
        return this.prep<T>('PUT', url, filter, data, token);
    }

    delete<T>(url: string, filter?: Filters, data?: any, token?: string): Promise<T> {
        return this.prep<T>('DELETE', url, filter, data, token);
    }
    
    private prep<T>(method: 'GET' | 'PUT' | 'POST' | 'DELETE', url: string, filters?: Filters, data?: any, token?: string) {
        url = FilterBuilder.build(url, filters);
        if(!token) token = this.token;

        const headers: { authorization?: string } = {};
        if (token) headers.authorization = 'Bearer ' + token;

        return axios<T>({ method, url, headers, data })
            .then(t => t.data);
    }
}