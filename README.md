# Artificialia-Prompt

Interface web locale pour le projet Artificialia-Prompt, composée de deux panneaux permettant de tester et d'observer le fonctionnement du cerveau d'Artificialia.

## Fonctionnalités

### Panneau de Chat (Gauche)
- Interface de chat classique avec Artificialia
- Envoi des prompts via l'API HTTP (POST /prompt)
- Réception des réponses via WebSocket en temps réel
- Historique complet du dialogue
- Indicateur de connexion WebSocket
- Gestion des erreurs de connexion

### Panneau de Logs (Droite)
- Affichage en temps réel des logs reçus via WebSocket
- Défilement automatique des logs
- Types de logs colorés :
  - **Système** (gris) : État des composants, synchronisation
  - **Pensée** (bleu) : Processus de réflexion
  - **Mémoire** (orange) : Accès aux données stockées
  - **Décision** (rouge) : Choix stratégiques
  - **Analyse** (vert) : Décomposition des requêtes
  - **Traitement** (violet) : Opérations de calcul
- Contrôles :
  - Bouton de défilement automatique
  - Bouton d'effacement des logs
  - Indicateur de connexion

## Installation

```bash
# Cloner le repository
git clone https://github.com/Mathieu-D-DDS/Artificialia-Prompt.git
cd Artificialia-Prompt

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'interface sera disponible à l'adresse : http://localhost:5173/

## Configuration API

L'application se connecte par défaut à l'API Artificialia sur `localhost:8000`. 
Pour modifier la configuration, éditez le fichier `src/config/api.js` :

```javascript
const API_CONFIG = {
  baseUrl: 'http://localhost:8000',
  websocketUrl: 'ws://localhost:8000/logs',
  endpoints: {
    prompt: '/prompt'
  }
};
```

## Utilisation avec Artificialia

1. **Démarrer le serveur Artificialia** (port 8000 par défaut)
2. **Lancer l'interface** : `npm run dev`
3. **Vérifier la connexion** : L'indicateur de statut doit afficher "Connecté"
4. **Interagir** : Tapez vos questions dans le chat et observez les logs en temps réel

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint

## Technologies utilisées

- **React 19** - Framework frontend
- **Vite** - Outil de build rapide
- **CSS3** - Styling avec design responsive
- **JavaScript ES6+** - Logique applicative

## Architecture

```
src/
├── components/
│   ├── ChatPanel.jsx       # Interface de chat
│   ├── ChatPanel.css       # Styles du chat
│   ├── LogsPanel.jsx       # Panneau de logs
│   └── LogsPanel.css       # Styles des logs
├── App.jsx                 # Composant principal
├── App.css                 # Styles globaux
├── index.css               # Styles de base
└── main.jsx                # Point d'entrée
```

## Fonctionnement

L'interface se connecte en temps réel à l'API Artificialia :

- **Chat** : Envoi des prompts via POST /prompt et réception des réponses via WebSocket
- **Logs** : Réception en temps réel des logs de traitement via WebSocket
- **WebSocket** : Connexion native à ws://localhost:8000/logs pour les logs et réponses

## Responsive Design

L'interface s'adapte automatiquement aux différentes tailles d'écran :
- **Desktop** : Panneaux côte à côte
- **Tablet/Mobile** : Panneaux empilés verticalement

## Prêt pour l'intégration

✅ **Intégration native avec Artificialia** :

- Connexion HTTP/WebSocket directe à l'API Artificialia
- Envoi des prompts via POST /prompt 
- Réception des réponses et logs via WebSocket ws://localhost:8000/logs
- Configuration API flexible pour le développement
- Gestion des erreurs de connexion et reconnexion automatique

## Développement

Pour contribuer au projet :

1. Fork le repository
2. Créer une branche pour votre fonctionnalité
3. Développer et tester vos modifications
4. Créer une Pull Request

## Licence

Ce projet est sous licence MIT.
