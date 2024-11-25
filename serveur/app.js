const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3005;
const paysDonnes = require("./pays.json").pays;

//consome les donnees au format JSON
app.use(express.json());
//permet le cross-origin
app.use(cors());

//Retourne tous les pays
app.get("/pays", (req, res) => {
  res.json(paysDonnes);
});

//Retourne les langues officielles par continent
app.get("/langues", (req, res) => {
  const { continent } = req.query;

  const continentsValides = [
    "Afrique",
    "Amérique du Nord",
    "Amérique du Sud",
    "Asie",
    "Europe",
    "Océanie",
  ];

  if (!continent || !continentsValides.includes(continentLowerCase)) {
    return res.status(400).json({ error: "Continent invalide ou manquant." });
  }

  const continentLowerCase = continent.toLowerCase();

  const languesSet = new Set(); //j'utilise set pour eviter doublons

  paysDonnes
    .filter(
      (pays) => pays.continent.toLowerCase() === continentLowerCase
    )
    .forEach((pays) =>
      pays.langues_officielles.forEach((langue) => languesSet.add(langue))
    );

  res.json({
    continent: continentLowerCase,
    langues_officielles: Array.from(languesSet),
  });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port http://localhost:${PORT}`);
});
