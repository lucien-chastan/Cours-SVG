# Rendre les balises SVG responsive

Si le fichier SVG est intégré comme une image :

```html
<img src="mon-image.svg">
```

Vous n'aurez pas de problème, cette image se comportera exactement comme une image `*.png` ou `*.jpg`, vous pouvez donc utiliser les méthodes que vous utiliseriez pour une balise <img> standard.

C'est dans le cas de l'intégration du SVG directement dans le DOM avec les balises `<svg>` que ça va poser plus de problème. (ce que vous ferez certainement quand vous voudrez travailler sur cette image en JavaScript par exemple)

```html
<svg>
	<g>
		<path>
	</g>
</svg>
```

Pour que votre SVG s'adapte à la largeur de votre contenu, plusieurs petites règles doivent être appliquées.

**1.** Retirer les propriétés `height` et `width`de la balise `<svg>` (si elles y sont).

**2.** Encapsuler la balise `<svg>` dans une `<div>`.

```html
<div class="svg-container">
	<svg>
		<g>
			<path>
		</g>
	</svg>
</div>
```


**3.** Donner à cette `<div>` une classe css avec les propriétés suivantes :

```css
.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 50%;
  vertical-align: middle;
}
```

*Voir l'exemple dans ce dossier.*