# Chatbot recruteur de Mattis

Chatbot for recruiters to get to know me more easily.

Webapp statique (aucun serveur) qui répond aux recruteurs sur ton profil, en anglais ou en français au choix. Le modèle d'IA tourne **dans le navigateur, sur le GPU de l'appareil** (WebGPU + WebLLM). Les questions ne quittent jamais l'appareil.

## Fichiers
- `index.html` : l'interface et la logique (WebLLM chargé depuis le CDN jsDelivr, version 0.2.84 figée).
- `knowledge.js` : ta base de connaissances en anglais, extraite du CV et des deux mémoires. C'est le fichier à modifier pour corriger ou ajouter une info.
- `knowledge-fr.js` : la même base en français (mêmes `id`). Quand tu modifies une section dans `knowledge.js`, modifie aussi sa version française.
- `retrieval.js` : la recherche dans le profil (mots-clés et sens), les réponses vérifiées et le garde-fou.
- `semantic.js` : le petit modèle de recherche par le sens (multilingual-e5-small, ~120 Mo).
- `tests/questions.js`, `tests/run.mjs`, `tests.html` : le jeu de tests (voir plus bas).

## Lancer en local
Double-clique sur `index.html` (Chrome, Edge ou Safari récents). Si le navigateur bloque quelque chose, lance plutôt un petit serveur dans ce dossier :
```
python3 -m http.server 8000
```
puis ouvre http://localhost:8000.

## Les étapes d'accueil
Avant le chat, le recruteur passe par 3 étapes :
1. **Choix du modèle** : l'app détecte l'appareil et conseille un modèle (Équilibré sur ordinateur, Le plus léger sur téléphone). Un avertissement s'affiche pour le gros modèle (réponses plus lentes) et pour le petit (erreurs plus probables). « Réponses rapides uniquement » évite tout téléchargement.
2. **Choix de la langue** (anglais ou français) pendant que le modèle se télécharge. En français, tout passe en français : interface, réponses rapides et réponses de l'IA.
3. **Poste recherché** : oui (Chef de projet, Business analyst, Product owner, Data/BI, ou « Autre » avec un champ libre) ou non (il découvre le profil).
Aux visites suivantes, seule l'étape 3 s'affiche ; le bouton « Modèle et langue » permet de changer les deux.

## Comment ça marche
1. **Réponses rapides** dès l'ouverture : l'app cherche la section la plus pertinente de `knowledge.js` et l'affiche (fonctionne partout, même sans GPU).
2. **Assistant IA** : bouton « Start the AI assistant ». Le modèle est téléchargé en mémoire et ne reste pas sur l'appareil du visiteur : les fichiers sont effacés du stockage du navigateur dès qu'il est chargé, il disparaît donc à la fermeture de l'onglet et se retélécharge à chaque visite. Changer de langue ou de modèle dans les réglages ne recharge plus la page.
   - Balanced : Qwen2.5 1.5B (~1 Go), par défaut
   - Best answers : Llama 3.2 3B (~2 Go), meilleure qualité si le GPU suit
   - Lightest : Llama 3.2 1B (~0,7 Go), pour les petites machines
   À chaque question, l'app envoie au modèle le résumé du profil + les 3 sections les plus pertinentes, avec des consignes : répondre en anglais, ne rien inventer, renvoyer vers LinkedIn si l'info manque.
3. Sans WebGPU, un message l'explique et les réponses rapides restent disponibles.

## Précision des réponses
- **Réponses vérifiées** (`faq` dans `knowledge.js` et `knowledge-fr.js`) : pour les questions fréquentes, la réponse est affichée mot pour mot, sans l'IA, avec la mention « Réponse vérifiée ». Chaque entrée a des formulations (`q`) et une réponse (`a`). Les boutons de suggestion tombent toujours sur ces réponses.
- **Garde-fou** : si une réponse de l'IA cite un nombre, un nom, un e-mail ou un lien absent de ce qu'on lui a donné, elle est remplacée par l'extrait du profil.
- **Recherche par le sens** : sur ordinateur, une fois le modèle d'IA prêt, un petit modèle (~120 Mo) compare le sens de la question aux sections et aux réponses vérifiées. Sans lui (téléphone, réponses rapides), la recherche par mots-clés est utilisée.
- **Tests** : `node tests/run.mjs` mesure la recherche par mots-clés (lancé aussi automatiquement par GitHub à chaque modification). `tests.html` mesure aussi la recherche par le sens dans le navigateur et aide à régler le seuil `FAQ_SEM_MIN` de `retrieval.js`. Ajoute `?debug` à l'adresse du chatbot pour voir comment chaque réponse a été trouvée.

## Modifier le contenu
Dans `knowledge.js`, chaque section a un `title`, des `keywords` (mots qui déclenchent la section) et un `text`. Garde chaque texte court (150 à 250 mots) : le modèle a une fenêtre de contexte de 4096 tokens.

## Mettre en ligne (pas fait, à décider)
Il suffit d'héberger ces deux fichiers sur un hébergement statique en HTTPS : GitHub Pages, Netlify ou Cloudflare Pages (gratuits). Ensuite tu mets le lien sur ton CV et ton LinkedIn.

## Tunnel de conversion
Le but du chatbot : amener le recruteur à demander tes coordonnées.
1. **Accroche** : message d'accueil qui résume ton profil, puis le pitch du poste choisi à l'étape 3 (ou une invitation à explorer s'il ne recrute pas pour un poste précis). S'il n'a rien choisi, des boutons lui demandent pour quel poste il recrute.
2. **Pitch ciblé** : 3 raisons concrètes pour lesquelles tu corresponds à ce poste (textes dans `roles` de `knowledge.js`).
3. **Preuves** : après chaque réponse, des boutons « Next » proposent les questions les plus utiles pour ce poste, avec toujours en premier « Get his contact details ».
4. **Appel à l'action** : après 3 réponses, ou dès qu'il parle de disponibilité, salaire, entretien, embauche…, une carte « Want to discuss your … opening with him? ».
5. **Contact** : bouton LinkedIn, email / téléphone / CV s'ils sont renseignés dans `contact`, et un message prêt à envoyer (copiable) qui mentionne le poste. Le bouton « Contact Mattis » en haut y mène à tout moment.
Avec l'IA activée, le modèle connaît le poste visé et termine chaque réponse par une question qui fait avancer la conversation.

Pour afficher ton email, ton téléphone ou ton CV : remplis `contact` dans `knowledge.js` (pour le CV, mets le PDF à côté de `index.html` et écris son nom dans `cv`).
