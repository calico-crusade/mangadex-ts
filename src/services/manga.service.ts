import { MangaFilters, MangaList, MangaCreate, MangaDexRoot, Manga, MangaIncludes } from "../models";
import { NetworkService } from "./helper";

export class MangaService {

    constructor(
        private http: NetworkService
    ) { }

    list(filter?: MangaFilters) { 
        return this.http.get<MangaList>('manga', <any>filter); 
    }

    create(manga: MangaCreate, token?: string) { 
        return this.http.post<MangaDexRoot<Manga>>('manga', null, manga, token); 
    }

    get(id: string, includes?: MangaIncludes[]) {
        return this.http.get<MangaDexRoot<Manga>>(`manga/${id}`, {
            'includes': includes || ['manga', 'covert_art', 'author', 'artist', 'tag' ]
        });
    }
}