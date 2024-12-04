import mongoose from "mongoose";

export const createRoute = (handle) => async (req, res) => {
  try {
    // Connexion à MongoDB avec mongoose
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connecté à MongoDB");
    }

    // Traiter la requête avec la fonction passée
    await handle(req, res);
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    res.status(500).send("Erreur de connexion à MongoDB");
  }
};
