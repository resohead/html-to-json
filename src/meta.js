import { camelCase } from './utilities.js'
/**
 * Convert array of nodes to open graph object
 */
function openGraph(meta) {

    let openGraph = {images: []};
    let twitter = {images: []};
    let basic = {};

    let openGraphArray = []
    let twitterArray = []
    let basicArray = []

    openGraphArray = meta
        .filter((tag) => !!tag.property && tag.property.startsWith("og:"))
        .forEach((tag) => {
            if(tag.property === "og:image"){
                openGraph["images"].push(tag.content)
            }
            openGraph[camelCase(tag.property.replace("og:", ""))] = tag.content;
        });

    twitterArray = meta
        .filter((tag) => !!tag.name && tag.name.startsWith("twitter:"))
        .forEach((tag) => {
            if(tag.name === "twitter:image"){
                twitter["images"].push(tag.content)
            }
            twitter[camelCase(tag.name.replace("twitter:", ""))] = tag.content;
        });

    basicArray = meta
        .filter((tag) => !!tag.name && ["author", "description", "keywords"].includes(tag.name))
        .forEach((tag) => {
            basic[camelCase(tag.name)] = tag.content;
        });

    // console.log(meta.length, basicArray.length)

    // if(basicArray.length === 0 || openGraphArray.length === 0 || twitterArray.length === 0){
    //     throw 'No social preview data found'
    // }

    let hybrid = {
        url: openGraph["url"] ?? null,
        name: openGraph["siteName"] ?? null,
        handle: twitter["site"] ?? null,
        title: openGraph["title"] ?? twitter["title"] ?? null,
        description:
            basic["description"] ??
            openGraph["description"] ??
            twitter["description"] ?? null,
        type: openGraph["type"] ?? "website",
        images: [
            ...openGraph["images"],
            ...twitter["images"]
        ],
        image: openGraph["image"] ?? twitter["image"] ?? null,
        author: basic?.author ?? twitter["creator"] ?? null,
        authorHandle: twitter["creator"] ?? null,
        keywords: basic["keywords"] || null,
    };

    return {
        hybrid,
        ...basic,
        openGraph,
        twitter,
    };
}

export default openGraph