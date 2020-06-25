import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
    FiArrowLeft, FiLogIn, FiEdit2, FiSave,
    FiMinusCircle, FiX, FiEye, FiRefreshCw,
    FiCheckCircle, FiHome, FiList, FiArrowRight
} from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.png';
import aviao from '../../assets/aviaoLinhas.png';

interface Item {
    id: number;
    fabricante: string;
    modelo: string;
    capacidadepassageiro: number;
}

const FindAirplane = () => {
    const [spanStringFabricante, setSpanStringFabricante] = useState("");
    const [spanStringModelo, setSpanStringModelo] = useState("");
    const [idAirplaneToEdit, setIdAirplaneToEdit] = useState(-1);
    const [spanStringCapacidadePassageiros, setSpanStringCapacidadePassageiros] = useState(0);

    const [table, setTable] = useState(0);
    const [clickButton, setClickButton] = useState(0);
    const [items, setItems] = useState<Item[]>([]);
    const [formData, setFormData] = useState({
        fabricante: '',
        modelo: '',
        capacidadepassageiro: 0
    });

    useEffect(() => {
        api.get('/').then(response => {
            setItems(response.data);
        })
    }, [table, clickButton]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }

    function editAirplane(id: number, fabricante: string, modelo: string, capacidadepassageiro: number) {
        setSpanStringCapacidadePassageiros(capacidadepassageiro);
        setSpanStringFabricante(fabricante);
        setSpanStringModelo(modelo);
        setIdAirplaneToEdit(id);

        document.querySelector('#editAirplane')?.classList.remove("display-none");
    }

    function deleteAirplane(id: number) {
        document.querySelector(`#iconView_${id}`)?.classList.add("display-none");
        document.querySelector(`#iconEdit_${id}`)?.classList.add("display-none");
        document.querySelector(`#iconDelete_${id}`)?.classList.add("display-none");

        document.querySelector(`#iconSpinner_${id}`)?.classList.add("Rotate");
        document.querySelector(`#iconSpinner_${id}`)?.classList.remove("display-none");

        setTimeout(() => {
            api.delete(`/${id}`).then(response => {
                let help = table + 1;
                setTable(help);
            })
        }, 100);
    }

    function handleSearch() {
        const { fabricante, modelo, capacidadepassageiro } = formData;
        api.get(`/avioes/search?fabricante=${fabricante}&modelo=${modelo}`).then(response => {
            setItems(response.data);
        })
    }

    async function putEvent(event: FormEvent) {
        event.preventDefault();
        const { fabricante, modelo, capacidadepassageiro } = formData;
        const data = {
            fabricante,
            modelo,
            capacidadepassageiro
        }
        await api.put(`/${idAirplaneToEdit}`, data);
        document.querySelector('#editAirplane')?.classList.add("display-none");
        document.querySelector("#sucesso")?.classList.add("classDisplayFlex");

        let help = table + 1;
        setTable(help);

    }
    function showHideViewAirplane(action: number, id: number, fabricante: string, modelo: string, capacidadepassageiro: number) {
        const divViewAirplane = document.querySelector("#viewAirplane");

        if (action == 1) {
            divViewAirplane?.classList.add("classDisplayFlex");
            setSpanStringCapacidadePassageiros(capacidadepassageiro);
            setSpanStringFabricante(fabricante);
            setSpanStringModelo(modelo);
        } else {
            divViewAirplane?.classList.remove("classDisplayFlex");
        }
    }

    function iconShowHideEditAirplane() {
        document.querySelector('#editAirplane')?.classList.add("display-none");
    }

    function handleCloseBeforeUpdate() {
        const divSucesso = document.querySelector("#sucesso");
        divSucesso?.classList.remove("classDisplayFlex");
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
            <form className="formSearch">
                <h1>Cadastro de<br />avião</h1>
                <legend>
                    <h2>Dados</h2>
                </legend>
                <div className="field-group">
                    <div className="field">
                        <label htmlFor="fabricante">Fabricante</label>
                        <input
                            type="text"
                            name="fabricante"
                            id="buscarFabricante"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="buscarModelo">Modelo</label>
                        <input
                            type="text"
                            name="modelo"
                            id="buscarModelo"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        className="field btnSearchFiltered"
                        onClick={handleSearch}>
                        {/* <FiSearch /> */}
                                Buscar
                        </div>
                </div>
            </form>

            <form className="formFields">

                <fieldset className="formFieldSet">
                    <div className="field divTable">
                        <table>
                            <thead>
                                <tr>
                                    <td width="13%">ID</td>
                                    <td width="25%">Fabricante</td>
                                    <td width="20%">Modelo</td>
                                    <td width="20%">Nº de pass</td>
                                    <td width="22%">Ações</td>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item.id} >
                                        <td>{item.id}</td>
                                        <td>{item.fabricante}</td>
                                        <td>{item.modelo}</td>
                                        <td>{item.capacidadepassageiro}</td>
                                        <td>
                                            <span id={`iconView_${item.id}`}
                                                className="iconView"
                                                onClick={() =>
                                                    showHideViewAirplane(1,
                                                        item.id,
                                                        item.fabricante,
                                                        item.modelo,
                                                        item.capacidadepassageiro)
                                                }>
                                                <FiEye />
                                            </span>
                                            <span id={`iconEdit_${item.id}`}
                                                className="iconEdit"
                                                onClick={() =>
                                                    editAirplane(item.id,
                                                        item.fabricante,
                                                        item.modelo,
                                                        item.capacidadepassageiro)
                                                }>
                                                <FiEdit2 />
                                            </span>
                                            <span id={`iconDelete_${item.id}`}
                                                className="iconDelete"
                                                onClick={() =>
                                                    deleteAirplane(item.id)}>
                                                <FiMinusCircle />
                                            </span>
                                            <span id={`iconSpinner_${item.id}`}
                                                className="iconSpinner display-none">
                                                <FiRefreshCw />&nbsp;&nbsp;Excluindo...
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </fieldset>
                <Link id="cadastrarAviao" to="/CreateAirplane">
                    <span>
                        <FiLogIn />
                    </span>
                    <strong>Cadastrar um avião</strong>
                </Link>
            </form>
            <div id="viewAirplane" className="viewAirplane display-none">
                <div className="divContentInfoAirplane viewAirplaneContent">
                    <span id="iconShowHideViewAirplane"
                        onClick={() =>
                            showHideViewAirplane(0, -1, "", "", -1)
                        }>
                        <FiX />
                    </span>
                    <h1>Dados do<br />avião</h1>
                    <span id="spanNPassageiros">
                        Nº de passageiros:&nbsp;
                    <span id="spanStringCapacidadePassageiros">
                            {spanStringCapacidadePassageiros}
                        </span>
                    </span>
                    <span id="spanFabricante">
                        Fabricante:&nbsp;
                    <span id="spanStringFabricante">
                            {spanStringFabricante}
                        </span>
                    </span>
                    <span id="spanModelo">
                        Modelo:&nbsp;
                    <span id="spanStringModelo">
                            {spanStringModelo}
                        </span>
                    </span>
                    <img src={aviao} alt="Aviões" width="750" />
                </div>
            </div>
            <div id="editAirplane" className="display-none">
                <form>
                    <h1>Editar cadastro<br />do Avião</h1>

                    <fieldset>
                        <legend>
                            <h2>Dados do avião código {idAirplaneToEdit}</h2>
                        </legend>

                        <div className="field">
                            <label htmlFor="fabricante">Fabricante atual: <span> {spanStringFabricante} </span></label>
                            <input
                                type="text"
                                name="fabricante"
                                id="fabricante"
                                className="imputs"
                                placeholder="digite o novo nome do fabricante"
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="modelo">Modelo atual: <span> {spanStringModelo} </span></label>
                            <input
                                type="text"
                                name="modelo"
                                id="modelo"
                                className="imputs"
                                placeholder="digite o novo nome do modelo"
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="capacidadepassageiro">Nº de passageiros atual: <span> {spanStringCapacidadePassageiros} </span></label>
                            <input
                                type="number"
                                name="capacidadepassageiro"
                                id="capacidadepassageiro"
                                className="imputs"
                                placeholder="digite o novo úmero de passageiros"
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                    </fieldset>
                    <div id="buttonsUpdate">
                        <a id="iconShowHideEditAirplane"
                            onClick={iconShowHideEditAirplane}>
                            <span>
                                <FiX />
                            </span>
                            <strong>
                                Cancelar
                        </strong>
                        </a>

                        <a id="salvarAviao"
                            onClick={putEvent}>
                            <span>
                                <FiSave />
                            </span>
                            <strong>
                                Salvar
                        </strong>
                        </a>
                    </div>
                </form>
            </div>
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
                    <div id="buscarAviao" >
                        <span onClick={handleCloseBeforeUpdate}>
                            <FiX />
                        </span>
                        <strong>Fechar</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindAirplane;