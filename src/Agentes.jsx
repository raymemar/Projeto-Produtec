import React from "react"; 
import { useAuth } from "./ADM/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPopup from "./components/LoginPopup";
import EditableText from "./components/EditableText";
import CadastroAgente from "./components/CadastroAgente";
import './Agentes.css';
import EditableGallery from './components/EditableGallery';

import image22 from './assets/image22.png';
import Group117 from './assets/Group117.png';


export default function Agentes() {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
    const [isCadastroOpen, setIsCadastroOpen] = React.useState(false);
    const { isAuthenticated, logout } = useAuth();

    const handleLoginClick = () => setIsLoginPopupOpen(true);
    const handleLogoutClick = () => logout();
    const handleClosePopup = () => setIsLoginPopupOpen(false);
    
    const handleCadastroClick = () => setIsCadastroOpen(true);
    const handleCloseCadastro = () => setIsCadastroOpen(false);
    
    const handleCadastroSuccess = (novoAgente) => {
        console.log('Novo agente cadastrado:', novoAgente);
        // Aqui você pode adicionar lógica adicional, como atualizar uma lista de agentes
    };

return (
    <div className=" agentes-page">
        <Header/>

        <main className="main-content">
            <div className="title-section">
                <EditableText
                    id="agentes_intro_title"
                    initialText="Quem são os Agentes ProduTec?"
                    tag="h3"
                    className="section-title"
                />
            </div>
           
         <div className="content-layout">
             
            <div className="left-column">
                 <EditableText
                    id="agentes_intro_text"
                    initialText="Os Agentes são pessoas que se dedicam a estudar, atuar e
                    transformar a realidade ambiental da nossa região. São
                    estudantes, professores, moradores e apaixonados pela natureza,
                    unidos pelo propósito de proteger o meio ambiente e promover
                    práticas sustentáveis que beneficiem toda a comunidade.

                    Além disso eles desenvolvem pesquisas, ações práticas e educativas voltadas à preservação da natureza e à melhoria da qualidade de
                    vida local."
                    tag="p"
                    className="section-text"
                />

                 <EditableText
                    id="agentes_intro_text"
                    initialText="
                    Além disso eles <strong> desenvolvem pesquisas, ações práticas e educativas </strong> voltadas à preservação da natureza e à melhoria da qualidade de
                    vida local."
                    tag="p"
                    className="section-text"
                />
                 <section className="chamada-agentes">
                 <button className="botao-agentes" onClick={handleCadastroClick}>Seja um agente!</button>
                </section>

            </div>  

            <div className="right-column">
             <img src={Group117} alt="Agentes em campo"/>
            </div>
         </div>

        </main>        
         <section className="galeria-agentes">
            <EditableText 
                id="agentes-title"
                initialText="Conheça nossos agentes"
                tag="h1"
                className="agentes-title"
                />
            <div className="agentes-container">
                <div className="agente-card">
                  <div className="agente-image">
                    <img src={image22} alt="Agente Maria Alice"/>
                  </div>
                   <div className="agente-info">
                              <EditableText
                              id="agente01"
                              initialText="Maria Alice"
                              tag="h3"
                              className="agente-name"
                              />

                              <EditableText 
                              id="agente01_description"
                              initialText="Oi, me chamo Maria Alice, tenho 15 anos e sou uma mistura de
                              animada e sonhadora! Amo música pop, maratonar séries de
                              fantasia (como Stranger Things) e ler livros de romance juvenil.
                              Na escola, minhas matérias preferidas são Biologia e Artes. Nos
                              meus momentos livres, curto passar tempo com meus amigos,
                              inventar coreografias e planejar uma futura viagem para o Japão.
                              Sou meio tímida no início, mas, quando pego confiança, mostro
                              toda minha energia!"
                              tag="p"
                              className="agente-descripition"
                              multiline={true}
                              /> 
                            </div>
                </div>

                
            </div>
         </section>

        <section className="virar-agente">
            <EditableText 
                id="virar-agente_title"
                initialText="Como se tornar um Agente ProduTec?"
                tag="h2"
                className="virar-agente-title"
            />

            <EditableText
             id="texto-chamada"
             initialText="Se você acredita que pequenas ações geram grandes mudanças e quer contribuir com um futuro mais verde, essa é a sua chance!"
             tag="p"
             className="texto-chamada"
             />


        <div className="interesses-container">
            <div className="interesse-1">
                <EditableText
                    id="interesse-1"
                    initialText="Tenho interesse pelo meio ambiente e sustentabilidade."
                    tag="p"
                    className="interesse-texto"
                />
            </div>
            <div className="interesse-2">
                <EditableText
                    id="interesse-2"
                    initialText="Quero aprender, trocar experiências e crescer junto com a comunidade."
                    tag="p"
                    className="interesse-texto"
                />
            </div>

             <div className="interesse-3">
                <EditableText
                    id="interesse-3"
                    initialText="Desejo participar das ações locais com impacto real."
                    tag="p"
                    className="interesse-texto"
                />
            </div>
        </div>

        </section>

        <section className="faça-parte">
            <EditableText 
                id="faça-parte_title"
                initialText="Faça parte do movimento!"
                tag="h2"
                className="faça-parte-title"
            />

            <EditableText 
            id="faça-parte-texto"
            initialText="Se voce acredita que pequenas ações geram grandes mudanças e quer continuar com um futuro mais verde, essa é a sua chance!"
            tag="p"
            className="faça-parte-texto"
            />

            <section className="chamada-agentes">
                <button 
                    className="botao-agentes-faça-parte"
                    onClick={handleCadastroClick}
                >
                    Quero ser um agente
                </button>
            </section>

        </section>
        
        <Footer onLoginClick={handleLoginClick} />

        <LoginPopup 
            isOpen={isLoginPopupOpen} 
            onClose={handleClosePopup} 
        />
        
        <CadastroAgente 
            isOpen={isCadastroOpen}
            onClose={handleCloseCadastro}
            onSuccess={handleCadastroSuccess}
        />
    </div>
)

}