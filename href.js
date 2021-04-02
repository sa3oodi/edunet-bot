const regex_href = /(href|src)=("|')(\/|..\/|(?!http)).*?('|")/gm;

function remover(link) {
    return link.replace(/'/, '')
}
async function hrefs(src) {
    if (src && typeof(src) == 'string') {
        let matches = src.match(regex_href);

        if (matches && matches.length > 0) {
            matches = matches.filter(item => !item.includes(`#`)).map(item => item.replace(/(href|src)=('|")/, '')).map(item => item.replace(/\"$/, ''))
        } else {
            return [];
        }
        return matches;
    } else {
        return [];
    }
}

module.exports = {
    get: hrefs,
    remover: remover

}