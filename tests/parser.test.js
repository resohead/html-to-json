import fs from "fs/promises"
import Parser from '../src/parser.js'

const files = [
    'head',
    // 'meta',
    // 'no-meta',
    // 'body',
    // 'main',
    // 'full'
]

describe.each(files)(`meta tags`, (file) => {
    it(`can be extracted into an object from ${file}`, async () => {
        const input = await fs.readFile(`tests/fixtures/input/${file}.html`, "binary");
        const expected = await fs.readFile(`tests/fixtures/expected/${file}-og.json`, "binary");

        const parser = new Parser()
        expect(
            (parser.parse(input).getOpenGraphData())
        )
        .toEqual(JSON.parse(expected));
    });
});
