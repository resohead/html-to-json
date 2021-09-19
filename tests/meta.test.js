const fs = require("fs").promises
const meta = require('../src/meta')


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
            meta.openGraph(JSON.parse(input))
        )
        .toEqual(JSON.parse(expected));
    });
});
