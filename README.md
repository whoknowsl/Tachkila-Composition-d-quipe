# Tachkila – Composition d'équipe Atlas FC

Application web interactive qui permet à l'entraîneur d'**Atlas FC** de gérer son effectif et de placer ses joueurs sur un terrain schématisé en **4-4-2**.

- 🌐 **Site en ligne (Vercel)** : https://VOTRE-PROJET.vercel.app
- 📦 **Dépôt GitHub** : https://github.com/VOTRE-COMPTE/tachkila
- 🎨 **Maquette / présentation (Canva)** : https://canva.link/4lty8g0d8ryuv3b
- 🗓️ **Planification des tâches** : _lien vers le tableau (GitHub Projects / Jira / Notion)_

---

## Aperçu

_Ajoutez ici une capture d'écran de l'application :_

```md
![Aperçu de Tachkila](imgs/screenshot.png)
```

---

## Fonctionnalités

### Gestion de l'effectif

- Ajouter un joueur depuis une modale (nom complet, poste, numéro). Il arrive sur le **banc**.
- Modifier un joueur dans la modale préremplie. Si son poste change alors qu'il est sur le terrain, il retourne sur le banc.
- Supprimer un joueur après confirmation. Sa position redevient **Libre**.
- Compteurs automatiques : nombre de joueurs et « Joueurs placés : x / 11 ».

### Terrain

- Grille **CSS Grid native** de 12 colonnes × 9 lignes, écrite en HTML et placée en CSS (`grid-column`, `grid-row`).
- 11 positions du 4-4-2 : chaque position occupe 2 cases, celle du gardien 2 colonnes × 3 lignes.
- Code couleur des postes : **GB** jaune, **DEF** bleu, **MIL** vert, **ATT** rouge.
- État des positions : **Libre** ou **Occupée** (numéro et nom du joueur affichés).

### Assignation

- Un `select` sur chaque carte permet de choisir la position du joueur.
- Règles : la position doit correspondre au poste du joueur et être libre (un gardien ne peut pas jouer en attaque).
- Option « Sur le banc » pour libérer la position.
- La carte d'un joueur placé devient pâle.

### Formulaire et retours utilisateur

- Validation en temps réel avec **regex** et messages d'erreur sous chaque champ.
- Fermeture de la modale avec ×, Annuler, Échap ou clic sur le fond (un clic dans la fenêtre ne ferme pas la modale).
- Messages de succès ou d'erreur qui disparaissent après 3 secondes.

### Sauvegarde

- L'effectif et la composition sont conservés après actualisation grâce à **localStorage**.

---

## Règles de validation

| Champ  | Règle                                              | Regex                       |
| ------ | -------------------------------------------------- | --------------------------- |
| Nom    | Obligatoire, lettres uniquement, 3 à 30 caractères | `/^[A-Za-zÀ-ÿ\s'-]{3,30}$/` |
| Poste  | Obligatoire (GB, DEF, MIL ou ATT)                  | –                           |
| Numéro | Obligatoire, de 1 à 99, **unique** dans l'effectif | `/^([1-9]\|[1-9][0-9])$/`   |

---

## Positions du 4-4-2

| `data-position` | Poste | Description         |
| --------------- | ----- | ------------------- |
| `GB`            | GB    | Gardien             |
| `DG`            | DEF   | Défenseur gauche    |
| `DC1`           | DEF   | Défenseur central 1 |
| `DC2`           | DEF   | Défenseur central 2 |
| `DD`            | DEF   | Défenseur droit     |
| `MG`            | MIL   | Milieu gauche       |
| `MC1`           | MIL   | Milieu central 1    |
| `MC2`           | MIL   | Milieu central 2    |
| `MD`            | MIL   | Milieu droit        |
| `BU1`           | ATT   | Buteur 1            |
| `BU2`           | ATT   | Buteur 2            |

---

## Modèle de données

Les joueurs sont stockés dans un tableau d'objets, synchronisé avec `localStorage` (`JSON.stringify` / `JSON.parse`).

```js
{
  id: 1729500000000,   // identifiant unique
  nom: "Ayoub Mansouri",
  numero: 7,
  poste: "ATT",        // GB | DEF | MIL | ATT
  position: "BU1"      // data-position occupée, ou null si sur le banc
}
```

---

## Technologies

- **HTML5** sémantique
- **Tailwind CSS 4** (interface : header, aside, modale, cartes)
- **CSS Grid natif** (terrain)
- **JavaScript** vanilla (`const` et `let` uniquement)
- **localStorage** pour la persistance
- **Git / GitHub** pour le suivi de version
- **Vercel** pour l'hébergement
- **Canva** pour la maquette et la présentation

---

## Concepts JavaScript mis en pratique

- Manipulation du DOM : `querySelector`, `createElement`, `appendChild`, `textContent`, `classList`, `remove()`
- **Délégation d'événements** : un seul écouteur `change` sur la liste des joueurs pour le choix de position
- **Propagation** : `stopPropagation()` pour qu'un clic dans la modale ne la ferme pas
- Parcours du DOM : `closest()` pour retrouver la carte à supprimer, `nextElementSibling` pour les messages d'erreur
- Formulaire : événement `submit` avec `preventDefault()`, validation en temps réel avec l'événement `input`
- Validation par expressions régulières

---

## Structure du projet

```
tachkila/
├── index.html      # Structure de la page (header, aside, terrain, modale)
├── style.css       # Styles complémentaires et grille du terrain
├── script.js       # Logique de l'application
├── imgs/
│   └── logo.jpeg
└── README.md
```

---

## Installation et lancement

Le projet ne demande aucune installation : il n'y a pas d'étape de build.

```bash
# 1. Cloner le dépôt
git clone https://github.com/VOTRE-COMPTE/tachkila.git

# 2. Entrer dans le dossier
cd tachkila

# 3. Ouvrir index.html dans le navigateur
#    (ou utiliser l'extension Live Server de VS Code)
```

---

## Déploiement sur Vercel

1. Pousser le projet sur GitHub.
2. Sur [vercel.com](https://vercel.com), cliquer sur **Add New → Project**.
3. Importer le dépôt `tachkila`.
4. Laisser le preset sur **Other** (sans commande de build) puis cliquer sur **Deploy**.

Chaque `git push` sur la branche `main` redéploie automatiquement le site.

---

## Responsive

| Écran                    | Largeur              |
| ------------------------ | -------------------- |
| Grand écran d'ordinateur | à partir de 1280 px  |
| Petit écran d'ordinateur | de 1024 px à 1279 px |
| Tablette                 | de 768 px à 1023 px  |
| Mobile                   | jusqu'à 767 px       |

---

## Accessibilité et bonnes pratiques

- Balises sémantiques (`header`, `aside`, `main`, `form`, `label`, `button`)
- Chaque champ du formulaire a un `label` associé
- Navigation au clavier : focus visible, fermeture de la modale avec Échap
- Contrastes de couleurs conformes aux recommandations WCAG
- HTML validé sur [validator.w3.org](https://validator.w3.org/)
- Code documenté et nommage clair

---

## Planification

| Jour | Date           | Objectifs                                                                                     |
| ---- | -------------- | --------------------------------------------------------------------------------------------- |
| 1    | Lundi 19/10    | Dépôt Git, planification, structure HTML / Tailwind (header, aside, terrain, modale)          |
| 2    | Mardi 20/10    | Terrain en CSS Grid (12 × 9), ouverture et fermeture de la modale                             |
| 3    | Mercredi 21/10 | Validation regex, ajout d'un joueur, liste colorée, premier déploiement Vercel                |
| 4    | Jeudi 22/10    | Assignation avec le select, affichage dans la case, carte pâle, retour sur le banc, compteurs |
| 5    | Vendredi 23/10 | Suppression avec confirmation, modification avec modale préremplie                            |
| 6    | Lundi 26/10    | Messages (3 s), localStorage, responsive, tests des cas d'erreur                              |
| 7    | Mardi 27/10    | README, livraison finale sur Git et Vercel                                                    |

---

## Auteur

**Soufiane Boushaba** – Brief Atlas FC – Octobre 2026
