const fs = require("node:fs");
const { connectToDatabase } = require("./utils/db");
const Movie = require("./models/Movies");
const { default: mongoose } = require("mongoose");

(async () => {
  try {
    // Se connecter à la base de données MongoDB
    await connectToDatabase();

    // Lire les données depuis le fichier JSON
    const data = JSON.parse(fs.readFileSync("./src/data/movies.json"));
    console.log("File read successfully:", data.length); // Affiche le nombre d'entrées

    // Insérer les données dans la collection Movie
    await Movie.insertMany(data);
    console.log("Data inserted successfully!");

  } catch (e) {
    // Si une erreur survient, l'afficher
    console.log(e.message);
  } finally {
    // Déconnexion de MongoDB
    mongoose.disconnect();
  }
})();
