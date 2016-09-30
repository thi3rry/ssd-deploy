"use strict";

/**
 * Trim and Remove empty filePath element
 * @param  {[type]} __files [description]
 * @return {[type]}         [description]
 */
module.exports = function(__files) {
    let files = __files.map((elem) => elem.trim());
    files = files.filter((elem) => elem != '');

    for(let f of files) {
        let isDir = f.substring(f.length-1, f.length) == '/';
        if (fs.statSync(path.join(configuration.source.cwd, f)).isDirectory()) {
            files = files.concat(getRecursiveFiles(path.join(configuration.source.cwd, f), configuration.source.cwd));
        }
    }

    return files;
}
