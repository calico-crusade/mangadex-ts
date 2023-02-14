import { NetworkService, AxiosNetwork } from "./services";
import { MangaService } from "./services/manga.service";

export class Configuration {
    network?: NetworkService;
    token?: string;
}

export class MangaDexApi {

    private _http!: NetworkService;
    private _token?: string;

    constructor(config?: Configuration) {
        this._token = config?.token;
        this._http = config?.network || new AxiosNetwork(this._token);

        if (!this._http) throw new Error('Http binder is null');
    }

    get manga() { return new MangaService(this._http); }
}