# Créer une font-icon avec Grunt

Il existe de nombreuses font-icônes sur le web disponible gratuitement ([bootstrap](https://getbootstrap.com) et [materialize](http://www.materializecss.com/) en inclus une par défaut), mais il est parfois nécessaire de créer la sienne. Quand vous travailler sur un site avec un métier spécifique par exemple.  
Certains sites internets vous proposent de créer une font-icône à partir de vos fichiers SVG, comme :

- [icomoon](https://icomoon.io/)
- [fontello](http://www.fontello.com/)
- et sûrement d'autre

C'est rapide et simple d'utilisation, mais dans un projet on a souvent besoin de mettre à jour notre police et la régénération de celle-ci sera vite chronophage.

Nous allons voir comment créer automatiquement une font-icône depuis un dossier contenant des fichiers SVG avec Grunt.

## Initialisation de Grunt

D'abord nous allons créer notre projet Grunt. À la racine de votre projet, lancez la commande suivante :

```bash
npm init
```
*Puis appuyez plusieurs fois sur entrer (vous pouvez compléter les informations demandées si vous le souhaitez)*

Installer Grunt et ses dépendances

```bash
npm install grunt --save-dev
```

Puis le package webfont
```bash
npm install grunt-webfont --save-dev
```

Pour compiler votre font, grunt peut utiliser soit node soit fontforge.  
fontforge donne meilleurs résultat et est plus permissifs par rapport à la pureté d'entré de vos SVG, par contre il faut l'installer, ça devient donc une dépendance de votre projet.

**Installer FontForge sur linux :**

```bash
sudo apt-get install fontforge ttfautohint
```

**Installer FontForge sur windows :**

Téléchargez et installer le logiciel [fontforge](http://fontforge.github.io/en-US/downloads/windows/) et [ffautohint](https://www.freetype.org/ttfautohint/#download)

Puis ajoutez `C:\Program Files (x86)\FontForgeBuilds\bin` à votre PATH de vos variables d’environnements windows.

## Configuration de Grunt

Créer un fichier `Gruntfile.js` contenant le code suivant : 

```JavaScript
module.exports = function (grunt) {

    grunt.initConfig({
        webfont: {
            icons: {
                src: 'src/*.svg',
                dest: 'font',
                destCss: 'style',
                options: {
                    templateOptions: {
                        baseClass: 'icon',
                        classPrefix: 'icon-',
                        mixinPrefix: 'icon-'
                    },
                    relativeFontPath: '../font/',
                    htmlDemo: true,
                    stylesheet: 'css',
                    engine: 'fontforge'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-webfont');

    grunt.registerTask('fonts', [
        'webfont'
    ]);
};
```
### Les options :

**src :** le dossier qui contient vos fichiers SVG

**dest :** le dossier où va être généré votre font
  
**destCss :** le dossier où sera généré les feuilles de style avec les classes associées

**relativeFontPath :** le chemin depuis la feuille de style `destStyle` vers le dossier de font `font`

**htmlDemo :** `true` ou `false` suivant si vous voulez que grunt vous génère une page html présentant vos icônes (page qui se trouvera au même emplacement que votre feuille de style, donc dans le dossier `destStyle`)

**stylesheet :** type du fichier de sortie, vous pouvez choisir scss si vous voulez l'inclure dans un projet sass plus large.

**engine :** `node` ou `fontforge`, choisissez node pour ne pas avoir de dépendance, fontforge s'il est installé sur votre machine

**templateOptions :** option de préfix et base de vos classes d'icônes.

*plus options sur le projet github de [grunt-webfont](https://github.com/sapegin/grunt-webfont).*

## Les icônes SVG

Les fichiers SVG qui serviront à votre font doivent respecter certaines règles :

- Être constitué d'un seul et unique chemin `<path>` (pas de `<rect>`, de `<cicle>` ou autre `<g>` ni même texte)
- votre document sur inkscape doit faire 512px * 512px (qui sera votre balise `<svg>` par la suite), vous pouvez changer cette dimension dans la config grunt avec l'option fontHeight
- Le dessin doit prendre toutes la place de votre page et être centrée sur celle-ci.

Enregistrer vos icônes dans le dossier `dest` configuré ci-dessus.

## Générer la font

Pour générer votre font, ouvrez un terminal à la racine de votre projet, et lancer la commande suivante :

```bash
grunt webfont
```

## Utiliser la police dans votre fichier HTML

Grunt a généré une feuille de style CSS (dans le dossier `destCss`) contenant les classes à renseigner pour utiliser votre font (feuille que vous devez inclure dans votre projet).

Par convention on utilise la balise `<i></i>` pour ajouter un icône, mais vos classes fonctionnent sur n'importe quelle balise.

Pour utiliser votre font il vous suffit d'utiliser deux classes sur votre balise, `baseClass classPrefix-[file-name]`.

**Exemple :**

```html
<i class="icon icon-home"></i>
```

*la `baseClass` et la `classPrefix` sont configurées dans votre Gruntfile.js*





