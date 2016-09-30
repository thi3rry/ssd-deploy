# Utilisation

```bash
npm install --save git@git.shoot-shoot.com:shoot/ssd-deploy.git
```

À la racine de votre projet créé un fichier `deploy.js` et mettez-y le contenu suivant :

```js
# !/usr/local/bin/node

const path = require('path');
require('ssd-deploy')({
    source: {
        cwd: path.join(__dirname, './src')
    },
    destination: {
        protocol: 'ftp', // ftp or sftp
        cwd: '/',
        host: '127.0.0.1',
        port: 21,
        username: 'anonymous',
        password: null,
    },
    files: []
});
```

Modifier les paramètres de configuration et remplicer le tableau `files`.

ATTENTION à bien renseigner le paramètre `cwd` de source et de destination. C'est le root qui sera utiliser pour déplacer de la source à la destination.

Exemple :

Dans l'exemple suivant, à chaque `node deploy.js`, on enverra tous les fichiers/dossiers situé dans le dossier local `src/dist/css`et `src/dist/js` vers le dossier du FTP `/web/vhost/www.monsite.com/htdocs`.

Autrement dit, le dossier `src/` local, correspond au dossier `/web/vhost/www.monsite.com/htdocs` distant.

```js
# !/usr/local/bin/node

const path = require('path');
require('ssd-deploy')({
    source: {
        cwd: path.join(__dirname, './src')
    },
    destination: {
        protocol: 'sftp', // ftp or sftp
        cwd: '/web/vhost/www.monsite.com/htdocs',
        host: 'sftp.dc0.gpaas.net',
        port: 22,
        username: '798456',
        password: 'test',
    },
    files: [
        '/dist/css/',
        '/dist/js/'
    ]
});
```

# Développement

@see  https://github.com/jyu213/ssh2-sftp-client
@see http://stackoverflow.com/questions/10341032/scp-with-port-number-specified
@see http://stackoverflow.com/questions/1894347/how-to-upload-ftp-files-to-server-in-a-bash-script


```bash
npm install
```