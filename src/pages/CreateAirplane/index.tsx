import React, { FormEvent, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiCheckCircle, FiHome, FiList } from 'react-icons/fi';
import axios from 'axios';
import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.png';

const CreateAirplane = () => {
    const [formData, setFormData] = useState({
        fabricante: '',
        modelo: '',
        capacidadepassageiro: Number
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value })
    }

    async function postEvent(event: FormEvent) {
        event.preventDefault();
        const { fabricante, modelo, capacidadepassageiro } = formData;
        const data = {
            fabricante,
            modelo,
            capacidadepassageiro
        }
        await api.post('/', data);
        const divSucesso = document.querySelector("#sucesso");
        divSucesso?.classList.add("classDisplayFlex");
    }

    return (
        <div id="page-create-airplane">
            <header>
                <img src={logo} alt="Aviões" width="150" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para o início
                </Link>
            </header>
            <form>
                <h1>Cadastro de<br />Avião</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="fabricante">Fabricante</label>
                        <input
                            type="text"
                            name="fabricante"
                            id="fabricante"
                            className="imputs"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="modelo">Modelo</label>
                        <input
                            type="text"
                            name="modelo"
                            id="modelo"
                            className="imputs"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="capacidadepassageiro">Nº de passageiros</label>
                        <input
                            type="number"
                            name="capacidadepassageiro"
                            id="capacidadepassageiro"
                            className="imputs"
                            onChange={handleInputChange}
                        />
                    </div>

                </fieldset>

                <a id="salvarAviao" onClick={postEvent}>
                    <span>
                        <FiSave />
                    </span>
                    <strong>
                        Salvar avião
                        </strong>
                </a>
            </form>
            <div id="sucesso" className="sucesso">
                <FiCheckCircle />
                <h2>
                    Avião cadastrado com sucesso!
                </h2>
                <div className="sucessoButtons">
                    <Link id="voltarInicio" to="/">
                        <span>
                            <FiHome />
                        </span>
                        <strong>Voltar para o início</strong>
                    </Link>

                    <Link id="buscarAviao" to="/FindAirplane">
                        <span>
                            <FiList />
                        </span>
                        <strong>Buscar avião</strong>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CreateAirplane;