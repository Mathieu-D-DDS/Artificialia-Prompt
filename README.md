# Artificialia-Prompt

Interface web locale pour le projet Artificialia-Prompt, composée de deux panneaux permettant de tester et d'observer le fonctionnement du cerveau d'Artificialia.

## Fonctionnalités

### Panneau de Chat (Gauche)
- Interface de chat classique avec Artificialia
- Saisie utilisateur et affichage des réponses de l'IA
- Historique complet du dialogue
- Indicateur de frappe pendant la génération de réponse
- Réponses simulées pour les tests

### Panneau de Logs (Droite)
- Affichage en temps réel des "pensées" du cerveau d'Artificialia
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

L'interface utilise actuellement des données simulées :

- **Chat** : Réponses aléatoires d'Artificialia avec délai réaliste
- **Logs** : Génération automatique de logs de différents types
- **WebSocket** : Simulation de connexion temps réel

## Responsive Design

L'interface s'adapte automatiquement aux différentes tailles d'écran :
- **Desktop** : Panneaux côte à côte
- **Tablet/Mobile** : Panneaux empilés verticalement

## Prêt pour l'intégration

L'architecture est conçue pour faciliter l'intégration avec l'API réelle d'Artificialia :

- Les fonctions de mock peuvent être facilement remplacées par des appels API
- La structure WebSocket est prête à être connectée
- Les types de logs sont extensibles
- L'interface utilisateur est optimisée pour une utilisation intensive

## Développement

Pour contribuer au projet :

1. Fork le repository
2. Créer une branche pour votre fonctionnalité
3. Développer et tester vos modifications
4. Créer une Pull Request

## Licence

Ce projet est sous licence MIT.
