const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3005;
const paysDonnes = require('./pays.json').pays;

//consome les donnees au format JSON
app.use(express.json());
//permet le cross-origin
app.use(cors());


//Retourne tous les pays
app.get('/pays', (req,res) => {
    res.json(paysDonnes);
});

//Retourne les langues officielles par continent
app.get('/langues', (req,res) => {

    const { continent } = req.body;

    const continentsValides = [
        "Afrique",
        "Amérique du Nord",
        "Amérique du Sud",
        "Asie",
        "Europe",
        "Océanie"
    ];

    if (!continentsValides.includes(continent)) {
        return res.status(400).json({ erreur: "Continent invalide. Veuillez choisir parmi : " + continentsValides.join(', ') });
    }

    // Filtrer les langues officielles des pays du continent demandé
    //J'utilise un set pour ne pas avoir de doublons
    const languesSet = new Set(); 
    paysDonnes
        .filter(pays => pays.continent === continent)
        .forEach(pays => pays.langues_officielles.forEach(langue => languesSet.add(langue)));

    //Retourne langues en forme d'array
    res.json({ continent, langues_officielles: Array.from(languesSet) });
});


//Demarer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port http://localhost:${PORT}`);
});