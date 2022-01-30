import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import styles from './styles.module.scss';
import dragonImg from '../../assets/img/dragon.png';

export function Details() {
  const { id } = useParams();
  const [dragons, setDragons] = useState([])

  

  useEffect(() => {
    async function getDragonAPI() {
      let response = await fetch(`${process.env.REACT_APP_URL_API}/dragon/${id}`)
      response = await response.json()
      const date = new Date(response.createdAt);
      const formattedDate = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
      setDragons({
        ...response,
        createdAt: formattedDate
      })
    }

    getDragonAPI();
  }, [id]);

  return( 
    <section>
      <Link to="/dragons">
        <BsFillArrowLeftCircleFill />
      </Link>
      <div className={styles.card}>
            <div className={styles.alignCards}>
              <Link to="/detalhe">
                <img src={dragonImg} alt="Dragão" />
              </Link>              
              <div className={styles.description}>
                <h1>{dragons.name}</h1>
                <p>{dragons.type}</p>
                <p>{dragons.createdAt}</p>
              </div>
            </div>
      </div>
    </section>
  );
}
