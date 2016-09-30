#! /usr/local/bin/node
"use strict";
/**
 *
 * # Installation
 *
 * ```bash
 * npm install --save ssh2-sftp-client
 * npm install --save promise-ftp
 * npm install --save promise-ftp-common
 * ```
 *
 * @see  https://github.com/jyu213/ssh2-sftp-client
 *
 * @see http://stackoverflow.com/questions/10341032/scp-with-port-number-specified
 * @see http://stackoverflow.com/questions/1894347/how-to-upload-ftp-files-to-server-in-a-bash-script
 *
 */
const fs                 = require('fs');
const path               = require('path');
const SftpClient         = require('ssh2-sftp-client');
const FtpClient          = require('promise-ftp');

const getRecursiveFiles  = require('./lib/getRecursiveFiles');
const cleanFilePaths     = require('./lib/cleanFilePaths');
const deepExtend         = require('./lib/deepExtend');
let defaultConfiguration = {
    source: {
        cwd: path.join(__dirname, './src')
    },
    destination: {
        protocol: 'ftp',
        cwd: '/',
        host: '127.0.0.1',
        port: 21,
        username: 'anonymous',
        password: null,
    },
    files: []
};

module.exports = function(__configuration) {
    let configuration = deepExtend(defaultConfiguration, __configuration);

    let client = null;
    let promise = null;
    if (configuration.destination.protocol == 'sftp') {
        client = new SftpClient();
    }
    else if (configuration.destination.protocol == 'ftp') {
        client = new FtpClient();
    }
    promise = client.connect({
        host: configuration.destination.host,
        port: configuration.destination.port,
        username: configuration.destination.username,
        user: configuration.destination.username,
        password: configuration.destination.password
    }).then(()=>{
        let files = cleanFilePaths(configuration.files);
        // console.log(files);
        files.map((elem) => {
            let src = path.join(configuration.source.cwd, elem);
            let dest = path.join(configuration.destination.cwd, elem);

            // console.log (src, '==>', dest);
            if (fs.statSync(src).isDirectory()) {
                client.mkdir(path.join(dest), true)
                    .then(()=>{ console.log('Création du dossier ', dest); })
                    .catch(()=>{ throw new Error('Création du dossier ', dest, ' impossible')})
                ;
            }
            else {
                let dir = path.dirname(path.join(dest))
                client.mkdir(dir, true).then(()=>{
                    return client.put(src, dest).then(()=>{ console.log('Upload du fichier ', dest); });
                })
                    .catch(()=>{ throw new Error('Upload du fichier', dest, ' impossible')})
                ;
            }
        });
    }).catch((err)=>{
        throw new Error(err);
    });;
}