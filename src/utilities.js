function ucfirst(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function lcfirst(str){
    return str.charAt(0).toLowerCase() + str.slice(1);
}

function separate(str, separator = "-") {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9 ]/g, ' ')
        .trim()
        .replace(/\s+/g, separator);
}

function camelCase(str){
    return separate(str)
        .split('-')
        .map((element, index) => {
           return index === 0 ? lcfirst(element) : ucfirst(element);
        })
        .join('')
}

module.exports = {
    ucfirst,
    lcfirst,
    separate,
    camelCase
}