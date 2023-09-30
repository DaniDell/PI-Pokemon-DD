import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './Card.css';

const Card = (props) => {
  return (
    <div className="card">
      <NavLink to={`/detail/${props.id}`}> 
        <div className='order'>
          <h1>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h1>
          <img src={props.imagen} alt={props.name} />
          <p>Vida: {props.vida}</p>
          <p>Ataque: {props.ataque}</p>
          <p>Defensa: {props.defensa}</p>
          <p>Velocidad: {props.velocidad}</p>
          <p>Altura: {props.altura}</p>
          <p>Peso: {props.peso}</p>
        </div>
        <div className='tipos'>
          <p>Tipos:</p>
          <div>
            {props.tipos.map((type, index) => (
              <button key={index}>{type.tipo}</button>
            ))}
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default Card;
