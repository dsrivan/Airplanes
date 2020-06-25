import React from 'react';
import { FiLogIn, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.png';
import aviao from '../../assets/aviao.png';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Aviões" width="150" />
                </header>

                <main>
                    <div className="textsAndAirplane">
                        <div className="texts">
                            <h1>A sua galeria de aviões gigantes.</h1>
                            <p>Tudo sobre os maiores aviões comerciais em atividade, em um só lugar.</p>
                        </div>
                        <div className="airplane">
                            <img src={aviao} alt="Aviões" width="600" />
                        </div>
                    </div>
                    <div className="contentButtons">
                        <Link id="cadastrarAviao" to="/CreateAirplane">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>Cadastrar um avião</strong>
                        </Link>

                        <Link id="buscarAviao" to="/FindAirplane">
                            <span>
                                <FiSearch />
                            </span>
                            <strong>Buscar avião</strong>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home;