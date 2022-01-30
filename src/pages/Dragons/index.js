import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import dragonImg from '../../assets/img/dragon.png';
import { Modal } from '../../components/Modal';

import { api } from '../../services/api';

const initialValues = {
  name: '',
  type: '',
  histories: '',
}

export function Dragons() {
  const { logout } = useContext(AuthContext)
  const [dragons, setDragons] = useState([])
  const [modalDelete, setModalDelete] = useState(null)
  const [modal, setModal] = useState(null)
  const [values, setValues] = useState(initialValues)
  const [search, setSearch] = useState('')

  function onChange(e) {
    const { name, value } = e.target;

    setValues({...values, [name]: value});
  }

  function onSubmit(e) {
    e.preventDefault();

    if(values.name === '') {
      return alert('Nome do dragão é obrigatório!')
    }

    const method = values.id ? 'put' : 'post';

    const url = values.id ? `/dragon/${values.id}` : '/dragon';

    api[method](url, values).then(() => {
      setModal(null);
    })
  }

  async function onSubmitDelete(id) {
    await api.delete(`/dragon/${id}`);
    setModalDelete(null);
  }
 
  useEffect(() => {
    async function getDragonAPI() {
      const response = await api.get('/dragon');
      setDragons(response.data);
      
    }

    getDragonAPI();
  }, [modalDelete, modal]);

  function showModalCreate() {
    setValues(initialValues);
    setModal(true);
  }

  
  function showModalEdit(dragon) {
    setValues(dragon);
    setModal(dragon);
  }

  function showModalDelete(dragon) {
    setValues(dragon);
    setModalDelete(true);
  }  

  function logoutUser() {
    logout()
  }
  

  const lowerSearch = search.toLowerCase();
  const namesFiltered = dragons.filter(d => d.name.toLowerCase().includes(lowerSearch));
 
  return( 
    <section className={styles.section}>
      <div className={styles.header}>
        <h1>Dragões</h1>
        <button type='button' className={styles.buttonLogout} onClick={logoutUser}>Sair</button>
      </div>
      <div className={styles.header}>
        <input className={styles.headerInput} type="text" placeholder='Pesquisar' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button type='button' onClick={showModalCreate}>Criar Dragão</button>
      </div>
      <div className={styles.card}>
          {namesFiltered.map(dragon => (
            <div className={styles.alignCards} key={dragon.id}>
              <Link to={`/dragons/${dragon.id}`}>
                <img src={dragonImg} alt="Dragão" />
              </Link>              
              <div className={styles.description}>
                <Link to={`/dragons/${dragon.id}`}>
                  <h1>{dragon.name}</h1>
                  <p>{dragon.type}</p>
                  <p>{dragon.histories}</p>
                </Link>
                <div className={styles.alignButtons}>
                  <button className={styles.buttonDelete} onClick={() => showModalDelete(dragon)}>Excluir</button>
                  <button className={styles.buttonEdit} onClick={() => showModalEdit(dragon)}>Editar</button>
                </div>
              </div>
            </div>
          ))}
      </div>
      
      <Modal isOpen={!!modal} onClickClose={() => setModal(null)}>
        <h1 className={styles.titleModal}>{(modal && modal.id) ? 'Editar Dragão' : 'Criar Dragão'}</h1>
        <form className={styles.editDragon} onSubmit={onSubmit}>
            <label htmlFor="name">Nome</label>
            <input name="name" id="name" type="text" onChange={onChange} value={values.name}/>
            <label htmlFor="type">Tipo</label>
            <input name="type" id="type" type="text" onChange={onChange} value={values.type}/>
            <label htmlFor="histories">Histórias</label>
            <input name="histories" id="histories" type="text" onChange={onChange} value={values.histories}/>
            <button type="submit">{(modal && modal.id) ? 'Editar' : 'Criar'}</button>
        </form>
      </Modal>

      <Modal isOpen={!!modalDelete} onClickClose={() => setModalDelete(null)}>
        <h1 className={styles.titleModal}>Deletar Dragão {values.name}</h1>
        <div className={styles.deleteDragon}>
              <div className={styles.card}>
                <Link to={`/dragons/${values.id}`}>
                  <div className={styles.alignCards}>
                      <img src={dragonImg} alt="Dragão" /> 
                      <div className={styles.alignTextsModal}>
                        <p>{values.type}</p>
                        <p>{values.histories}</p>
                      </div>                 
                  </div>
                </Link>
              </div>

          <div className={styles.buttonsDelete}>
            <button type="button" className={styles.buttonEdit} onClick={() => setModalDelete(null)}>Cancelar</button>
            <button type="button" className={styles.buttonDelete} onClick={() => onSubmitDelete(values.id)}>Deletar</button>
          </div>      
        </div>
      </Modal>

    </section>
  );
}
