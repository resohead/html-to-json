import fs from "fs/promises"
import openGraph from '../src/meta.js'

const files = [
    'meta.json',
    'meta-og.json',
    'meta-twitter.json'
]

describe.each(files)(`meta tag arrays`, (file) => {
    it(`from ${file} should be converted to a meta object`, async () => {
        const input = await fs.readFile(`tests/fixtures/input/${file}`, "binary");
        const expected = await fs.readFile(`tests/fixtures/expected/${file}`, "binary");

        expect(
            openGraph(JSON.parse(input))
        )
        .toEqual(JSON.parse(expected));
    });
});
