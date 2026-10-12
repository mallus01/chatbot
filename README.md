# Chatbot recruteur de Mattis

Chatbot for recruiters to get to know me more easily.

Webapp statique (aucun serveur) qui répond en anglais aux recruteurs sur ton profil. Le modèle d'IA tourne **dans le navigateur, sur le GPU de l'appareil** (WebGPU + WebLLM). Les questions ne quittent jamais l'appareil.

## Fichiers
- `index.html` : l'interface et la logique (WebLLM chargé depuis le CDN jsDelivr, version 0.2.84 figée).
- `knowledge.js` : ta base de connaissances en anglais, extraite du CV et des deux mémoires. C'est le fichier à modifier pour corriger ou ajouter une info.

## Lancer en local
Double-clique sur `index.html` (Chrome, Edge ou Safari récents). Si le navigateur bloque quelque chose, lance plutôt un petit serveur dans ce dossier :
```
python3 -m http.server 8000
```
puis ouvre http://localhost:8000.

## Comment ça marche
1. **Réponses rapides** dès l'ouverture : l'app cherche la section la plus pertinente de `knowledge.js` et l'affiche (fonctionne partout, même sans GPU).
2. **Assistant IA** : bouton « Start the AI assistant ». Le modèle est téléchargé une seule fois puis gardé en cache ; aux visites suivantes il démarre tout seul.
   - Balanced : Qwen2.5 1.5B (~1 Go), par défaut
   - Best answers : Llama 3.2 3B (~2 Go), meilleure qualité si le GPU suit
   - Lightest : Llama 3.2 1B (~0,7 Go), pour les petites machines
   À chaque question, l'app envoie au modèle le résumé du profil + les 3 sections les plus pertinentes, avec des consignes : répondre en anglais, ne rien inventer, renvoyer vers LinkedIn si l'info manque.
3. Sans WebGPU, un message l'explique et les réponses rapides restent disponibles.

## Modifier le contenu
Dans `knowledge.js`, chaque section a un `title`, des `keywords` (mots qui déclenchent la section) et un `text`. Garde chaque texte court (150 à 250 mots) : le modèle a une fenêtre de contexte de 4096 tokens.

## Mettre en ligne (pas fait, à décider)
Il suffit d'héberger ces deux fichiers sur un hébergement statique en HTTPS : GitHub Pages, Netlify ou Cloudflare Pages (gratuits). Ensuite tu mets le lien sur ton CV et ton LinkedIn.

## Tunnel de conversion
Le but du chatbot : amener le recruteur à demander tes coordonnées.
1. **Accroche** : message d'accueil qui résume ton profil et demande « What role are you recruiting for? », avec des boutons (IT Project Manager, Business Analyst, Product Owner / AMOA, Data / BI, autre). Le recruteur peut aussi l'écrire librement.
2. **Pitch ciblé** : 3 raisons concrètes pour lesquelles tu corresponds à ce poste (textes dans `roles` de `knowledge.js`).
3. **Preuves** : après chaque réponse, des boutons « Next » proposent les questions les plus utiles pour ce poste, avec toujours en premier « Get his contact details ».
4. **Appel à l'action** : après 3 réponses, ou dès qu'il parle de disponibilité, salaire, entretien, embauche…, une carte « Want to discuss your … opening with him? ».
5. **Contact** : bouton LinkedIn, email / téléphone / CV s'ils sont renseignés dans `contact`, et un message prêt à envoyer (copiable) qui mentionne le poste. Le bouton « Contact Mattis » en haut y mène à tout moment.
Avec l'IA activée, le modèle connaît le poste visé et termine chaque réponse par une question qui fait avancer la conversation.

Pour afficher ton email, ton téléphone ou ton CV : remplis `contact` dans `knowledge.js` (pour le CV, mets le PDF à côté de `index.html` et écris son nom dans `cv`).
