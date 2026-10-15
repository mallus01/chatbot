# Chatbot recruteur de Mattis Fernandez

**En ligne : [chatbot.milo-cat.com](https://chatbot.milo-cat.com)**

Un assistant conversationnel qui répond aux questions des recruteurs sur le profil de Mattis Fernandez, chef de projet informatique junior, en anglais ou en français. Le recruteur pose ses questions comme à une personne (expérience, compétences, diplôme, disponibilité, salaire…) et obtient une réponse immédiate, puis peut contacter Mattis en un clic.

L'IA tourne **entièrement dans le navigateur du visiteur**. Il n'y a aucun serveur : les questions et les réponses ne quittent jamais l'appareil, et le modèle est effacé à la fermeture de l'onglet.

## Le projet

### Le but
Remplacer la lecture d'un CV par une conversation. Un recruteur qui découvre le profil obtient en quelques minutes les réponses qui l'intéressent, sur le poste qu'il cherche à pourvoir, puis est guidé vers la prise de contact (LinkedIn en priorité, ou e-mail).

### Le parcours du visiteur
1. **Présentation** : le premier écran explique le but de l'assistant, son fonctionnement et la confidentialité.
2. **Choix du modèle** : l'application détecte l'appareil et conseille un modèle. Elle prévient que le gros modèle est plus lent et que le petit fait plus d'erreurs. On peut aussi choisir les réponses rapides, sans IA et sans téléchargement.
3. **Choix de la langue** (anglais ou français) pendant que le modèle se télécharge.
4. **Poste recherché** : chef de projet, business analyst, product owner, data/BI, ou un intitulé libre. Le visiteur peut aussi juste découvrir le profil.
5. **Discussion** : un message d'accueil, une présentation adaptée au poste, puis les questions du recruteur. Des suggestions de questions s'affichent après chaque réponse.
6. **Contact** : après quelques réponses, ou dès que le recruteur parle d'entretien, de salaire ou de disponibilité, une carte de contact apparaît avec un message prêt à envoyer qui mentionne le poste.

Aux visites suivantes, seule l'étape du poste s'affiche. Le bouton « Modèle et langue » permet de changer ces réglages sans recharger la page.

## Technologies

| Rôle | Technologie |
|---|---|
| Interface | HTML, CSS et JavaScript sans framework, en un seul fichier (`index.html`) |
| Modèle de langage | [WebLLM](https://github.com/mlc-ai/web-llm) 0.2.84, qui exécute le modèle sur la carte graphique via **WebGPU** |
| Modèles proposés | Qwen2.5 1.5B Instruct (~1 Go, par défaut), Llama 3.2 3B Instruct (~2 Go), Llama 3.2 1B Instruct (~0,7 Go), quantifiés en 4 bits |
| Recherche par le sens | [Transformers.js](https://github.com/huggingface/transformers.js) 3.8.1 avec le modèle multilingue `multilingual-e5-small` (~120 Mo) |
| Recherche par mots-clés | Code maison (`retrieval.js`) : mots-clés, titres et pondération par rareté des mots |
| Tests | Node.js (`tests/run.mjs`) et GitHub Actions, plus une page de test dans le navigateur (`tests.html`) |
| Hébergement | GitHub Pages, domaine personnalisé chez OVH |

Les bibliothèques sont chargées depuis le CDN jsDelivr à des versions figées. Les fichiers des modèles viennent de Hugging Face.

## Spécificités

### Tout en local, rien de conservé
- Pas de backend, pas de base de données, pas d'outil de statistiques : le site est un ensemble de fichiers statiques.
- Le modèle est téléchargé dans le navigateur et s'exécute sur la carte graphique du visiteur.
- Les fichiers du modèle sont effacés du stockage du navigateur dès qu'il est chargé, et les restes d'anciennes visites sont effacés au démarrage. Le modèle de recherche par le sens reste uniquement en mémoire. Rien ne reste donc sur l'appareil après la fermeture de l'onglet.

### Des réponses fiables avec un petit modèle
Un modèle de 1 à 3 milliards de paramètres peut inventer des faits. Plusieurs mécanismes l'en empêchent :
- **Génération augmentée par recherche (RAG)** : à chaque question, seuls le résumé du profil et les sections les plus pertinentes sont donnés au modèle, avec la consigne de ne rien inventer et de renvoyer vers Mattis si l'information manque.
- **Réponses vérifiées** : pour les questions fréquentes, une réponse relue par Mattis est affichée mot pour mot, sans passer par l'IA. Elle est trouvée par la formulation de la question ou, sur ordinateur, par son sens (seuil de similarité calibré à 0,92 sur le jeu de tests).
- **Recherche hybride** : les classements par mots-clés et par le sens sont fusionnés (*reciprocal rank fusion*), pour qu'un nom d'entreprise tapé tel quel compte toujours.
- **Garde-fou** : une réponse de l'IA qui cite un nombre, un nom propre, un e-mail ou un lien absent des informations fournies est rejetée et remplacée par l'extrait du profil.

### Adapté à chaque appareil
- Sur téléphone ou sur un ordinateur avec peu de mémoire, seul le plus petit modèle est proposé, avec un contexte et des réponses plus courts. Si la page plante faute de mémoire, l'application le détecte au rechargement et propose une solution plus légère.
- Sans WebGPU, les réponses rapides restent disponibles : elles affichent le passage du profil qui correspond le mieux à la question.

### Bilingue
Toute l'interface, le contenu du profil, les réponses vérifiées et les consignes du modèle existent en anglais et en français. La langue choisie s'applique à tout.

### Une interface vivante
Les étapes apparaissent en fondu. Les réponses enregistrées s'écrivent mot à mot, comme une réponse générée. Ces animations sont désactivées si le visiteur a demandé moins d'animations dans son système.

### Un tunnel de conversion
Le chatbot est pensé pour mener à la prise de contact : présentation ciblée selon le poste, suggestions de questions qui mettent en avant les points forts pour ce poste, bouton de contact toujours visible, carte de contact au bon moment et message prêt à copier.

## Structure du dépôt

| Fichier | Contenu |
|---|---|
| `index.html` | Interface, étapes d'accueil, chargement des modèles, tunnel de conversion |
| `knowledge.js` | Le profil en anglais : résumé, sections, réponses vérifiées (`faq`), présentations par poste (`roles`), textes du tunnel et coordonnées |
| `knowledge-fr.js` | La même chose en français, avec les mêmes `id` |
| `retrieval.js` | Recherche par mots-clés et par le sens, réponses vérifiées, garde-fou |
| `semantic.js` | Chargement du modèle de recherche par le sens |
| `tests/` | Questions de test et script de mesure |
| `tests.html` | Mesure de la recherche par le sens dans le navigateur et réglage du seuil |
| `CNAME` | Domaine personnalisé de GitHub Pages |

Le contenu vient uniquement du CV de Mattis et de ses deux mémoires (mémoire professionnel sur ses deux ans d'alternance, mémoire de diplôme sur la finance sans intermédiaires financiers).

## Lancer et tester

**En local** : ouvrir `index.html` dans un Chrome, Edge ou Safari récent. Si le navigateur bloque quelque chose, lancer un petit serveur dans le dossier :
```
python3 -m http.server 8000
```
puis ouvrir http://localhost:8000.

**Tests** :
- `node tests/run.mjs` mesure la recherche par mots-clés et le garde-fou. Il est lancé automatiquement par GitHub à chaque modification.
- `tests.html` mesure aussi la recherche par le sens et aide à régler le seuil `FAQ_SEM_MIN` de `retrieval.js`.
- Ajouter `?debug` à l'adresse du chatbot affiche comment chaque réponse a été trouvée.

## Modifier le contenu
- Chaque section de `knowledge.js` a un `title`, des `keywords` (mots qui la déclenchent) et un `text` court (150 à 250 mots), car le modèle a une fenêtre de contexte limitée.
- Toute modification de `knowledge.js` doit être reportée dans `knowledge-fr.js`.
- Après avoir ajouté des réponses vérifiées, relancer `tests.html` pour vérifier qu'aucune mauvaise réponse n'apparaît.
