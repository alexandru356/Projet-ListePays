import React, { useEffect, useState } from "react";
import ListePays from "./ListePays";
import { Form } from "react-bootstrap";  // Importer Form.Control de Bootstrap
import "../styles/Pays.css";

const Pays = () => {
  const [listeDesPays, setListeDesPays] = useState([]); 
  const [paysFiltres, setPaysFiltres] = useState([]); 
  const [termeRecherche, setTermeRecherche] = useState("");  
  const [continentSelectionne, setContinentSelectionne] = useState("");  
  const [optionTri, setOptionTri] = useState("alphabetique");  

  useEffect(() => {
    const recupererPays = async () => {
      try {
        const reponse = await fetch("http://localhost:3005/pays");
        if (!reponse.ok) {
          throw new Error(`Erreur: ${reponse.status}`);
        }
        const donnees = await reponse.json();
        setListeDesPays(donnees);  
        setPaysFiltres(donnees);  
      } catch (err) {
        console.log(err);
      }
    };

    recupererPays();
  }, []); //empty array pour que sa render une seule fois

  const gererChangementRecherche = (e) => {
    const valeur = e.target.value.toLowerCase();  
    setTermeRecherche(valeur); 
    filtrerPays(valeur, continentSelectionne, optionTri);
  };

  const gererChangementContinent = (e) => {
    const continent = e.target.value;
    setContinentSelectionne(continent);  
    filtrerPays(termeRecherche, continent, optionTri);
  };

  const gererChangementTri = (e) => {
    const valeurTri = e.target.value;
    setOptionTri(valeurTri);
    filtrerPays(termeRecherche, continentSelectionne, valeurTri);
  };

  const filtrerPays = (termeRecherche, continent, optionTri) => {
    let paysFiltres = listeDesPays.filter((pays) => {
      const correspondRecherche = pays.nom.toLowerCase().includes(termeRecherche);
      const correspondContinent = continent && continent !== "Tous les continents" ? pays.continent === continent : true;
      return correspondRecherche && correspondContinent;
    });

    if (optionTri === "alphabetique") {
      paysFiltres = paysFiltres.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (optionTri === "population") {
      paysFiltres = paysFiltres.sort((a, b) => b.population - a.population);
    }

    setPaysFiltres(paysFiltres); 
  };

  // Liste des continents
  const continents = [
    "Tous les continents",
    "Afrique",
    "Amérique du Nord",
    "Amérique du Sud",
    "Asie",
    "Europe",
    "Océanie"
  ];

  return (
    <>
      <div className="formulaire">
        <div className="recherche">
          <Form.Control
            type="text"
            placeholder="Rechercher"
            value={termeRecherche}
            onChange={gererChangementRecherche}
            className="item-filtre"
            style={{width: "250px"}}
          />
        </div>

        <div className="filtre-continent">
          <Form.Select
            value={continentSelectionne}
            onChange={gererChangementContinent}
            style={{width: "250px"}}
          >
            {continents.map((continent, index) => (
              <option key={index} value={continent}>
                {continent}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className="filtre-tri">
          <Form.Select
            value={optionTri}
            onChange={gererChangementTri}
            style={{width: "250px"}}
          >
            <option value="alphabetique">Trier par ordre alphabétique</option>
            <option value="population">Trier par population</option>
          </Form.Select>
        </div>
      </div>

      <ListePays pays={paysFiltres} />
    </>
  );
};

export default Pays;
