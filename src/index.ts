import { MangaDexApi } from "./mangadex-api";


async function main() {

    const api = new MangaDexApi();

    const unrivaled = await api.manga.get('fc0a7b86-992e-4126-b30f-ca04811979bf');
    console.log('Results', { manga: JSON.stringify(unrivaled) });

    const manga = await api.manga.list({
        title: 'The unrivaled'
    });
    
    for(let m of manga.data) {
        console.log('Manga: ' + m.attributes.title, { manga: JSON.stringify(m) });
    }
}

main();