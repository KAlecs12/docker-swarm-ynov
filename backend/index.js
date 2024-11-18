const express = require('express');
const fs = require('fs');  // Pour lire le secret
const app = express();

// Middleware pour analyser les requêtes en JSON
app.use(express.json());

// Lire le mot de passe de la base de données depuis le secret
const dbPassword = fs.readFileSync('/run/secrets/db_password', 'utf8').trim();

// Simuler une connexion à une base de données (exemple avec un mot de passe)
const connectToDatabase = () => {
  console.log(`Connexion à la base de données avec le mot de passe : ${dbPassword}`);
  // Vous pouvez ici implémenter une vraie logique pour vous connecter à une base de données
};

// Route de base (page d'accueil)
app.get('/', (req, res) => {
  res.send('Bienvenue dans le backend !');
});

// Une route API simple
app.get('/api/data', (req, res) => {
  res.json({ message: 'Voici des données depuis le backend.' });
});

// Une route POST pour traiter des données
app.post('/api/submit', (req, res) => {
  const { name } = req.body; // Récupère "name" du corps de la requête
  res.json({ message: `Bonjour, ${name}! Vos données ont été reçues.` });
});

// Configuration du port et lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToDatabase();  // Se connecter à la base de données lors du démarrage
  console.log(`Serveur démarré sur le port ${PORT}`);
});
