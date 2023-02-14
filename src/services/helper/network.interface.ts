export interface Filters {
    [key: string]: string | number | Date | boolean | string[] | number[] | { [key: string]: string } | undefined 
}

export interface NetworkService {
    get<T>(url: string, filter?: Filters, data?: any, token?: string): Promise<T>;
    post<T>(url: string, filter: Filters | undefined, data: any, token?: string): Promise<T>;
    put<T>(url: string, filter: Filters | undefined, data: any, token?: string): Promise<T>;
    delete<T>(url: string, filter?: Filters, data?: any, token?: string): Promise<T>;
}

export class FilterBuilder {

    static BaseUrl: string = 'https://api.mangadex.org/';

    static build(url: string, filters?: Filters) {
        if (url.startsWith('/')) url = url.substring(1);

        if (!url.startsWith('http'))
            url = `${FilterBuilder.BaseUrl}/${url}`;

        if (url.endsWith('?')) url = url.substring(0, url.length - 2);
        if (url.endsWith('/')) url = url.substring(0, url.length - 2);

        if (!filters) return url;

        const parts = [];

        for(const key in filters) {
            const val = filters[key];

            if (typeof val === 'undefined') continue;

            if (typeof val === 'string' || typeof val === 'number') {
                parts.push(`${key}=${encodeURIComponent(val)}`);
                continue;
            }

            if (val instanceof Date) {
                parts.push(`${key}=${val.toJSON()}`);
                continue;
            }

            if (Array.isArray(val)) {
                for(let item of val) {
                    parts.push(`${key}[]=${item}`);
                }
                continue;
            }

            if (typeof val === 'boolean') {
                parts.push(`${key}=${val ? 1 : 0}`);
                continue;
            }

            for(let k in val) {
                const v = val[k];
                parts.push(`${key}[${k}]=${v}`);
            }
        }

        if (parts.length === 0)
            return url;

        const params = parts.join('&');
        return `${url}?${params}`;
    }
}