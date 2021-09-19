# HTML to JSON
Convert HTML to JSON including open graph extraction. Note: This package does not handle the retrieval of HTML from urls.

- [Features](#features)
- [Convert HTML to JSON](#convert-html-to-json)
- [Open Graph Object](#open-graph-object)
  - [Example](#example)
- [Tests](#tests)
- [Todo](#todo)

## Features
* convert html to json
* get open graph data from html

## Convert HTML to JSON

You must pass HTML (from file, website etc) to the Parser class through the contructor (using options) or via the `parse` method.
You can access remote data in a number of different ways using npm packages. For example,

- https
- node-fetch
- puppeteer


Extract specific tags directly to JSON:
```js
import { Parser } from 'html-to-json'

const parser = new Parser()
parser.parse(html).asJson('meta')
```

Convert entire document to JSON, keep only meta tags and remove redundant keys:
```js
import { Parser, openGraph } from 'html-to-json'

let json = parser.parse(html).asJson('*')
let filtered = json
  .filter((element) => element.tagType === 'tag' && element.tagName === 'meta')
  .map((element) => {
      ['tagName', 'tagType', 'classes', 'children', 'text'].forEach(k => delete element[k])
      return element
  })

```

## Open Graph Object

Extract Open Graph, Twitter and other meta data from HTML using the `getOpenGraphData` method on the parser:
```js
import { Parser } from 'html-to-json'

const parser = new Parser()

const json = parser.parse(html).getOpenGraphData()
```

Manually convert JSON to an Open Graph Object
```js
import { Parser, openGraph } from 'html-to-json'
const parser = new Parser()

const json = parser.parse(html).asJson('meta')
return openGraph(json)
```

### Example

From:
```html
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=11" />

    <meta name="author" content="Author Name Here" />
    <meta name="description"
        content="This is a test meta description" />
    <meta name="keywords" content="HTML, CSS, JavaScript">

    <!-- Twitter Card data -->
    <meta name="twitter:card" content="twitter-card" />
    <meta name="twitter:site" content="@organisation" />
    <meta name="twitter:title" content="Example Site Twitter Meta" />
    <meta name="twitter:description"
        content="This is a test og twitter description tag" />
    <meta name="twitter:creator" content="@handle" />
    <!-- Twitter Summary card images must be at least 120x120px -->
    <meta name="twitter:image" content="https://example.com/twitter-social-image.jpg" />


    <!-- Open Graph data -->
    <meta property="og:title" content="Example Site Title Meta" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://example.com" />
    <meta property="og:image" content="https://example.com/social-image-1.jpg" />
    <meta property="og:image" content="https://example.com/social-image-2.jpg" />
    <meta property="og:description"
        content="This is a test og description tag" />
    <meta property="og:site_name" content="Example Site Name Meta" />


    <title>Website | Page Title Here</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <script async src='https://www.google-analytics.com/analytics.js'></script>
    <link rel="stylesheet" href="/css/app.css">
</head>
```
To:
```json
{
    "hybrid": {
        "url": "https://example.com",
        "name": "Example Site Name Meta",
        "handle": "@organisation",
        "title": "Example Site Title Meta",
        "description": "This is a test meta description",
        "type": "article",
        "images": [
            "https://example.com/social-image-1.jpg",
            "https://example.com/social-image-2.jpg",
            "https://example.com/twitter-social-image.jpg"
        ],
        "image": "https://example.com/social-image-2.jpg",
        "author": "Author Name Here",
        "authorHandle": "@handle",
        "keywords": "HTML, CSS, JavaScript"
    },
    "author": "Author Name Here",
    "description": "This is a test meta description",
    "keywords": "HTML, CSS, JavaScript",
    "openGraph": {
        "images": [
            "https://example.com/social-image-1.jpg",
            "https://example.com/social-image-2.jpg"
        ],
        "title": "Example Site Title Meta",
        "type": "article",
        "url": "https://example.com",
        "image": "https://example.com/social-image-2.jpg",
        "description": "This is a test og description tag",
        "siteName": "Example Site Name Meta"
    },
    "twitter": {
        "images": ["https://example.com/twitter-social-image.jpg"],
        "card": "twitter-card",
        "site": "@organisation",
        "title": "Example Site Twitter Meta",
        "description": "This is a test og twitter description tag",
        "creator": "@handle",
        "image": "https://example.com/twitter-social-image.jpg"
    }
}
```

## Tests

```
npm run tests
```

## Todo

* [ ] create an API in separate repo with meta endpoint (twitter, open graph, hybrid)
  * [ ] disable cache (always get latest content)
  * [ ] disable JS (faster/no puppeteer)
* [ ] add html inferred key to Open Graph object (e.g. H1, page title, images etc)
* [ ] convert to Typescript
* [ ] create an `OpenGraph` object/class?
* [ ] test it works with tables