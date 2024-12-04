const { connectToDatabase } = require("./utils/db"); // Vérifie que le chemin est correct
const Movie = require("./models/Movies");
const { default: mongoose } = require("mongoose");

(async () => {
  try {
    // Connexion à la base de données
    await connectToDatabase();

    // Query 1: Films avec DiCaprio
    const moviesWithDiCaprio = await Movie.find({
      actors: "Leonardo DiCaprio"
    });
      console.log("Films avec DiCaprio:", moviesWithDiCaprio);
      
    // Query 2: Films produits avant 2000
    const moviesBefore2000 = await Movie.find({
      year: { $lt: 2000 }
    });
    console.log("Films avant 2000:", moviesBefore2000);

    // Query 3: Films de Fincher ET Spielberg
    const moviesByFincherAndSpielberg = await Movie.find({
      director: { $in: ["David Fincher", "Steven Spielberg"] }
    });
    console.log("Films de Fincher et Spielberg:", moviesByFincherAndSpielberg);

    // Query 4: Film avec Brad Pitt et Morgan Freeman
    const movieWithBradAndMorgan = await Movie.find({
      actors: { $all: ["Brad Pitt", "Morgan Freeman"] }
    });
    console.log("Film avec Brad Pitt et Morgan Freeman:", movieWithBradAndMorgan);

    
      
  } catch (e) {
    console.log(e.message);
  } finally {
    mongoose.disconnect();
  }
})();
