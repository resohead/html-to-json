# HTML to JSON

## Features
* convert html to json
* get open graph data from html
*

## Todo

* [ ] create an API in separate repo with meta endpoint (twitter, open graph, hybrid)
  * [ ] disable cache (always get latest content)
  * [ ] disable JS (faster/no puppeteer)
* [ ] add html inferred key to Open Graph object (e.g. H1, page title, images etc)
* [ ] convert to Typescript
* [ ] create an `OpenGraph` object/class?

## Convert HTML to JSON

Extract specific tags directly to JSON:
```js
const parser = new Parser()
parser.parse(html).asJson('meta')
```

Convert entire document to JSON, keep only meta tags and remove redundant keys:
```js
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
const Parser = require("./parser")
const parser = new Parser()

const json = parser.parse(html).getOpenGraphData()
```

Manually convert JSON to an Open Graph Object
```js
const Parser = require("./parser")
const parser = new Parser()
const meta = require('./meta')

const json = parser.parse(html).asJson('meta')
return meta.openGraph(json)
```

## Tests

```
npm run tests
```