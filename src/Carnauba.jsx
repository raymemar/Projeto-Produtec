import React from 'react';
import { useAuth } from './ADM/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPopup from './components/LoginPopup';
import EditableText from './components/EditableText';
import "./Carnauba.css";

// Importação de imagens
import cesto from './assets/cesto.png';
import decoracoes from './assets/decoracoes.png';
import cobertura from './assets/cobertura.png';
import bolsa from './assets/bolsa.png';
import carnaubaImage from './assets/Carnauba.png';

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
                    <div className="intro-text">
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
                            id="carnauba_description"
                            initialText="Carnaúba (Copernicia prunifera) é uma palmeira nativa do Brasil, especialmente do Nordeste, conhecida por sua cera, que é usada em diversos produtos, desde cosméticos a embalagens. É também chamada de árvore da vida devido à sua importância socioeconômica e cultural para as comunidades da Caatinga, sendo um símbolo dos estados do Ceará, Piauí e Rio Grande do Norte.<br/><br/>Falando sobre suas características, pode atingir até 15 metros de altura, possui folhas largas e cerosas, cera essa que impede a perda de água."
                            tag="p"
                            className="section-text"
                        />
                    </div>
                    <div className="carnauba-illustration">
                        <img src={carnaubaImage} alt="Ilustração da Carnaúba" />
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
                        initialText="Da cera de suas folhas pode-se fazer cosméticos, medicamentos, vernizes, polimentos, embalagens e mais.<br/>Os seus <strong>frutos</strong> viram alimentação animal, farinha e óleo.<br/>Sua <strong>palha</strong> vira artesanato, sua <strong>madeira</strong> é boa para construções, e suas <strong>raízes</strong> viram remédio."
                        tag="div"
                        className="multiplicidades-text"
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
