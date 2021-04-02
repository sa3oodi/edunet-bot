var fs = require('fs')
const getHrefs = require('get-hrefs');
const oses = require('./href')
fs.readFile('index.html', 'utf8', function(err, html) {
    // var links = html.getElementsByTagName("a")
    // var urls = [];

    // for (var i = 0; i < links.length; i++) {
    //     urls.push(links[i].getAttribute("href"));
    // }
    // console.log(urls)
    // console.log(html)
    // var links = getHrefs(html);
    // links.forEach(link => {
    //     if (link.includes('/Quiz/GetStudentResult?')) {
    //         console.log(link)
    //     }
    // });
    oses.hrefs(html).then(links => {
        links.forEach(link => {
            if (link.includes('/Quiz/s78978')) {
                // oses.remover(link).then(is => {
                //         console.log(is)
                //     })
                console.log(oses.remover(link))

            }
        });
    })
})