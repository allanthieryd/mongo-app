const express = require('express');
const Movie = require('../models/Movies'); // Vérifie que le chemin vers le modèle est correct
const router = express.Router();

// Route GET pour obtenir tous les films
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route GET pour obtenir un film par son ID
router.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Film non trouvé' });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route POST pour ajouter un nouveau film
router.post('/movies', async (req, res) => {
  const { title, year, director, rating, actors } = req.body;

  // Vérifier si tous les champs nécessaires sont présents
  if (!title || !year || !director || !rating) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  const newMovie = new Movie({
    title,
    year,
    director,
    rating,
    actors: actors || [], // Si aucun acteur n'est fourni, utiliser un tableau vide
  });

  try {
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route PUT pour mettre à jour un film par son ID
router.put('/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Film non trouvé' });
    }
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route DELETE pour supprimer un film par son ID
router.delete('/movies/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Film non trouvé' });
    }
    res.status(200).json({ message: 'Film supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
