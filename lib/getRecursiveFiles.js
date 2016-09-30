
/**
 *
 * Gets the files of a path recursively
 * Recursive function
 *
 * @param      string    __path     The path to find files
 * @param      string    __rootDir  The initial root dir
 * @return     String[]  The files.
 */
let getRecursiveFiles = function getRecursiveFiles(__path, __rootDir) {
    let files       = fs.readdirSync(__path);
    files           = files.map((f) => path.join(__path, f));

    let directories = files.filter((f) => fs.statSync(f).isDirectory());
    files           = files.filter((f) => !fs.statSync(f).isDirectory());

    directories.map((dir) => {
        files = files.concat(getRecursiveFiles(dir, __rootDir));
    });

    files = files.map((f) => f.replace(__rootDir, ''));

    return files;
}

module.exports getRecursiveFiles;