import { FilterBuilder } from "../services";
import { Localization, LocalizationList, MangaDexAttributes, MangaDexCollection } from "./base.model";
import { ContentRating, Mode, OrderValue } from "./constants.model";
import { Relationships } from "./relationships.model";

export interface MangaTag {
    name: Localization;
    description: Localization;
    group: string;
    version: number;
}

export interface MangaAttributes {
    title: Localization;
    altTitles: LocalizationList;
    description: Localization;
    isLocked: boolean;
    links: Localization;
    originalLanguage: string;
    lastVolume: string;
    lastChapter: string;
    publicationDemographic: MangaDemographic;
    status: MangaStatus;
    year?: number;
    contentRating: string;
    tags: MangaDexAttributes<MangaTag>[];
    state: string;
    chapterNumbersResetOnNewVolume: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
    version: number;
    availableTranslatedLanguages: string[];
    latestUploadedChapter: string[];
}

export type Manga = MangaDexAttributes<MangaAttributes> & Relationships;
export type MangaList = MangaDexCollection<Manga>;
export type MangaIncludes = 'manga' | 'chapter' | 'cover_art' | 'author' | 'artist' | 'scanlation_group' | 'tag' | 'user' | 'custom_list';
export type MangaStatus = 'ongoing' | 'completed' | 'hiatus' | 'cancelled';
export type MangaDemographic = 'shounen' | 'shoujo' | 'josei' | 'seinen' | 'none';

export interface MangaCreate {
    title: Localization;
    altTitles: LocalizationList;
    description: Localization;
    authors: string[];
    artists: string[];
    links: Localization;
    originalLanguage: string;
    lastVolume?: string;
    lastChapter?: string;
    publicationDemographic?: MangaDemographic;
    status: MangaStatus;
    year?: number;
    contentRating: ContentRating;
    tags: string[];
    chapterNumbersResetOnNewVolume: boolean;
    version: number;
}

export interface MangaFilters extends FilterBuilder {
    title?: string;
    limit?: number;
    offset?: number;
    authorOrArtist?: string;
    contentRating?: ContentRating[];
    includes?: MangaIncludes[];
    authors?: string[];
    artists?: string[];
    year?: number;
    includedTags?: string[];
    includeTagsMode?: Mode;
    excludedTags?: string[];
    excludedTagsMode?: Mode;
    status?: MangaStatus[];
    originalLanguage?: string[];
    excludedOriginalLanguage?: string[];
    availableTranslatedLanguage?: string[];
    publicationDemographic?: MangaDemographic[];
    ids?: string[];
    createdAtSince?: Date;
    updatedAtSince?: Date;
    hasAvailableChapters?: boolean;
    group?: string;
    order?: {
        title?: OrderValue,
        year?: OrderValue,
        createdAt?: OrderValue,
        updatedAt?: OrderValue,
        latestUploadedChapter?: OrderValue,
        followedCount?: OrderValue,
        relevance?: OrderValue,
        rating?: OrderValue,
    };
}