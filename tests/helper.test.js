const utilities = require('../src/utilities')

const words = [
    {input: 'site_name', output: 'siteName'},
    {input: 'site name', output: 'siteName'},
    {input: 'Site Name', output: 'siteName'},
    {input: 'siteName', output: 'siteName'},
]

describe.each(words)(`A JSON key`, (word) => {
    it(`${word.input} should be converted to ${word.output}`, () => {

        expect(
            utilities.camelCase(word.input)
        )
        .toEqual(word.output);
    });
});
