const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./api/movies');  // Assure-toi que le chemin est correct
const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/vinci', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Utiliser les routes de movieRoutes avec le préfixe /api
app.use('/api', movieRoutes);  // Ici, toutes les routes dans movieRoutes seront sous /api

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
