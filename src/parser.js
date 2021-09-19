const cheerio = require("cheerio");
const meta = require('./meta')

class Parser {
    constructor(options = {}) {
        if(options.html){
            this.parse(options.html)
        }
    }

    parse(html){
        this.html = html;
        this.cheerio = cheerio.load(html);
        return this
    }

    asJson(selector = "*") {
        // e.g. '*', 'head', 'body', 'meta'
        return this.cheerio(selector)
            .get()
            .map((node) => {
                return this.convertToJson(node)
            })
    }

    getOpenGraphData(){
        return meta.openGraph(this.asJson('meta'))
    }

    getNodes(selector = "*") {
        return this.cheerio(selector).get()
    }

    convertToJson(element) {
        if (element.children) {
            element.children = element.children.map((child) =>
                this.convertToJson(child)
            );
        }

        const { type, name, attribs, children, ...remaining } = element;
        const classes = attribs?.class?.split(" ") ?? [];
        delete attribs?.class; // remove the class string attribute
        const text = this.cheerio(element).text()
        // console.log({ type, name, text })
        return {
            tagType: type,
            tagName: name,
            text: type === 'text' ? text: element.nodeValue,
            ...attribs,
            classes,
            children,
        };
    }
}

module.exports = Parser;
