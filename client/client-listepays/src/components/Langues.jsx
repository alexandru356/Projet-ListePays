import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "../styles/Langues.css";

const Langues = () => {
  const [continentSelectionne, setContinentSelectionne] = useState("");
  const [message, setMessage] = useState(
    "Choisissez un continent dans la liste déroulante pour voir toutes les langues officielles qu'on y parle !"
  );

  const gererChangementContinent = async (e) => {
    const continent = e.target.value;
    setContinentSelectionne(continent);

    if (continent === "") {
        setMessage("Choisissez un continent dans la liste déroulante pour voir toutes les langues officielles qu'on y parle");
        return;
    }

    const params = new URLSearchParams();
    params.append("continent", continent.toLowerCase());
    const url = `http://localhost:3005/langues?${params.toString()}`;
    try {
      const reponse = await fetch(url);
      if (!reponse.ok) {
        throw new Error(`Erreur: ${reponse.status}`);
      }
      const donnees = await reponse.json();
      const lstLang = donnees.langues_officielles.join(", ");
      setMessage(`Les langues parlées en ${continent} sont : ${lstLang}`);
    } catch (err) {
      console.error(err);
    }
  };

  const continents = [
    "Afrique",
    "Amérique du Nord",
    "Amérique du Sud",
    "Asie",
    "Europe",
    "Océanie",
  ];

  return (
    <>
      <div className="filtre-continent formulaire-lang">
        <Form.Select
          value={continentSelectionne}
          onChange={gererChangementContinent}
          style={{ width: "250px" }}
        >
          <option value="">Sélectionner un continent</option>
          {continents.map((continent, index) => (
            <option key={index} value={continent}>
              {continent}
            </option>
          ))}
        </Form.Select>
      </div>
      <div className="liste-lang">{message}</div>
    </>
  );
};

export default Langues;
