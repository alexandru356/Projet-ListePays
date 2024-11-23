import React from "react";
import { Accordion } from "react-bootstrap";


const ListePays = ({ pays = []}) => {
  return (
    <Accordion defaultActiveKey="0" className="mx-auto" style={{ maxWidth: '770px', marginTop: '20px'}}>
      {pays.map((pays, index) => (
        <Accordion.Item eventKey={index} key={index}>
          <Accordion.Header>{pays.nom}</Accordion.Header>
          <Accordion.Body>
            <div><strong>Capitale :</strong> {pays.capitale}</div>
            <div>
              <strong>Population :</strong> {pays.population.toLocaleString()}
            </div>
            <div>
              <strong>Langues officielles :</strong> {pays.langues_officielles.join(", ")}
            </div>
            <div>
              <strong>Drapeau :</strong>{" "}
              <a href={pays.drapeau} target="_blank" rel="noopener noreferrer">
                {pays.drapeau}
              </a> 
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ListePays;