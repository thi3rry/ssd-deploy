"use strict";

const fs   = require('fs');
const path = require('path');


/**
 * Trim and Remove empty filePath element
 * @param  {[type]} __files [description]
 * @return {[type]}         [description]
 */
module.exports = function(__files, __cwd) {
    let files = __files.map((elem) => elem.trim());
    files = files.filter((elem) => elem != '');

    for(let f of files) {
        let isDir = f.substring(f.length-1, f.length) == '/';
        if (fs.statSync(path.join(__cwd, f)).isDirectory()) {
            files = files.concat(getRecursiveFiles(path.join(__cwd, f), __cwd));
        }
    }

    return files;
}
