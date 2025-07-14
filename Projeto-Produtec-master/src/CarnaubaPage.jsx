import React from 'react';
import { useAuth } from './ADM/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPopup from './components/LoginPopup';
import EditableText from './components/EditableText';
import "./CarnaubaPage.css";

// Importação de imagens
import cesto from './assets/cesto.png';
import decoracoes from './assets/decoracoes.png';
import cobertura from './assets/cobertura.png';
import bolsa from './assets/bolsa.png';

export default function Carnauba() {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
    const { isAuthenticated, logout } = useAuth();

    const handleLoginClick = () => setIsLoginPopupOpen(true);
    const handleLogoutClick = () => logout();
    const handleClosePopup = () => setIsLoginPopupOpen(false);

    return (
        <div className="carnauba-page">
            <Header />

            <main className="main-content">
                <section className="intro-section">
                    <div className="intro-text" style={{ minHeight: '400px' /* Altura mínima fixa */ }}>
                        <EditableText
                            id="carnauba_title"
                            initialText="Falando mais <br/> sobre a carnaúba"
                            tag="h1"
                            className="main-title"
                            multiline={true}
                        />
                        <EditableText
                            id="carnauba_subtitle"
                            initialText="<strong>Árvore da vida</strong><br />"
                            tag="p"
                            className="section-text"
                            multiline={true}
                        />
                        <EditableText
                            id="multiplicidades_intro_text"  /* id único */
                            initialText="Carnaúba (<em>Copernicia prunifera</em>) é uma palmeira nativa do Brasil, especialmente do Nordeste, conhecida como árvore da vida, que é chamada assim devido aos produtos, usos e conexões culturais.<br />A carnaúba é um elemento chave para o sustento de muitos sertanejos, especialmente na cultura para as comunidades do Ceará, sendo símbolo dos estados do Ceará, Piauí e Rio Grande do Norte."
                            tag="p"
                            className="section-text"
                            multiline={true}
                        />
                    </div>
                    <div className="carnauba-illustration">
                        <img src="/Group-121.png" alt="Ilustração da Carnaúba" />
                    </div>
                </section>

                <section className="multiplicidades-section">
                    <EditableText
                        id="multiplicidades_section_text" /* id único */
                        initialText="Multiplicidades de uso em todas as suas partes"
                        tag="h3"
                        className="section-title-green"
                    />
                    <EditableText
                        id="multiplicidades_section_desc" /* id único */
                        initialText="Da cera e suas folhas pode-se fazer cosméticos, medicamentos, vernizes, palmeiras, embalagens e mais.<br/>Os frutos viram alimentação animal, farinha e óleo.<br/>Sua palha vira artesanato, sua madeira é boa para construções, e suas raízes viram remédio."
                        tag="p"
                        className="section-text"
                        multiline={true}
                    />
                </section>

                <section className="produtos-section">
                    <EditableText
                        id="produtos_title"
                        initialText="Os produtos da carnaúba"
                        tag="h3"
                        className="produtos-title"
                    />
                    <div className="produtos-gallery">
                        {/* Cards */}
                        <div className="produto-card">
                            <img src={bolsa} alt="Bolsa de palha" />
                            <EditableText
                                id="bolsa_desc"
                                initialText="Bolsa feita a partir da palha natural e tingida"
                                tag="p"
                                className="produto-desc"
                            />
                        </div>
                        <div className="produto-card">
                            <img src={cesto} alt="Cestos de fibra" />
                            <EditableText
                                id="cesto_desc"
                                initialText="Cestos de fibra trançada"
                                tag="p"
                                className="produto-desc"
                            />
                        </div>
                        <div className="produto-card">
                            <img src={decoracoes} alt="Decorações" />
                            <EditableText
                                id="decoracoes_desc"
                                initialText="Decorações confeccionadas a partir dos talos das folhas"
                                tag="p"
                                className="produto-desc"
                            />
                        </div>
                        <div className="produto-card">
                            <img src={cobertura} alt="Cobertura de ambientes" />
                            <EditableText
                                id="cobertura_desc"
                                initialText="Cobertura de ambientes ao ar livre"
                                tag="p"
                                className="produto-desc"
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <LoginPopup
                isOpen={isLoginPopupOpen}
                onClose={handleClosePopup}
            />
        </div>
    );
}
