import React from "react"; 
import { useAuth } from "./ADM/AuthContext";
import { PessoasService } from "./services/pessoasService";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPopup from "./components/LoginPopup";
import EditableText from "./components/EditableText";
import CadastroAgente from "./components/CadastroAgente";
import AddAgenteForm from "./components/AddAgenteForm";
import './Agentes.css';
import EditableGallery from './components/EditableGallery';

import Group117 from './assets/Group117.png';


export default function Agentes() {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
    const [isCadastroOpen, setIsCadastroOpen] = React.useState(false);
    const [isAddAgenteOpen, setIsAddAgenteOpen] = React.useState(false);
    const [agentes, setAgentes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const { isAuthenticated, logout } = useAuth();

    // Carregar agentes do Firebase ao montar o componente
    React.useEffect(() => {
        carregarAgentes();
    }, []);

    const carregarAgentes = async () => {
        setLoading(true);
        setError('');
        try {
            const resultado = await PessoasService.listarPessoas();
            if (resultado.success) {
                // Filtrar apenas agentes da galeria
                const agentesGaleria = resultado.pessoas.filter(pessoa => pessoa.tipo === 'galeria');
                setAgentes(agentesGaleria);
            } else {
                setError(resultado.message || 'Erro ao carregar agentes');
                console.error('Erro ao carregar agentes:', resultado.error);
            }
        } catch (err) {
            setError('Erro ao conectar com o servidor');
            console.error('Erro:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginClick = () => setIsLoginPopupOpen(true);
    const handleLogoutClick = () => logout();
    const handleClosePopup = () => setIsLoginPopupOpen(false);
    
    const handleCadastroClick = () => setIsCadastroOpen(true);
    const handleCloseCadastro = () => setIsCadastroOpen(false);
    
    const handleAddAgenteClick = () => setIsAddAgenteOpen(true);
    const handleCloseAddAgente = () => setIsAddAgenteOpen(false);
    
    const handleCadastroSuccess = (novoAgente) => {
        console.log('Novo agente cadastrado:', novoAgente);
        // Aqui você pode adicionar lógica adicional, como atualizar uma lista de agentes
    };

    const handleAddAgenteSuccess = async (novoAgenteData) => {
        try {
            // Preparar dados para salvar no pessoasService
            const dadosAgente = {
                nome: novoAgenteData.nome,
                descricao: novoAgenteData.descricao,
                imageUrl: novoAgenteData.imageUrl,
                tipo: 'galeria' // Marcar como agente da galeria
            };

            const resultado = await PessoasService.adicionarPessoa(dadosAgente);
            
            if (resultado.success) {
                // Atualizar lista local
                setAgentes(prevAgentes => [...prevAgentes, resultado.pessoa]);
                console.log('Agente adicionado com sucesso:', resultado.pessoa);
                alert('Agente adicionado à galeria com sucesso!');
            } else {
                alert(resultado.message || 'Erro ao adicionar agente');
                console.error('Erro:', resultado.error);
            }
        } catch (err) {
            alert('Erro ao salvar agente. Tente novamente.');
            console.error('Erro ao adicionar agente:', err);
        }
    };

    const handleDeleteAgente = async (id, nome) => {
        if (window.confirm(`Tem certeza que deseja remover o agente ${nome}?`)) {
            try {
                const resultado = await PessoasService.excluirPessoa(id);
                
                if (resultado.success) {
                    // Remover da lista local
                    setAgentes(prevAgentes => prevAgentes.filter(agente => agente.id !== id));
                    alert('Agente removido com sucesso!');
                    console.log('Agente removido:', nome);
                } else {
                    alert(resultado.message || 'Erro ao remover agente');
                    console.error('Erro:', resultado.error);
                }
            } catch (err) {
                alert('Erro ao remover agente. Tente novamente.');
                console.error('Erro ao remover agente:', err);
            }
        }
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
                    id="agentes_intro_text_1"
                    initialText="Os Agentes são pessoas que se dedicam a estudar, atuar e transformar a realidade ambiental da nossa região. São estudantes, professores, moradores e apaixonados pela natureza, unidos pelo propósito de proteger o meio ambiente e promover práticas sustentáveis que beneficiem toda a comunidade."
                    tag="p"
                    className="section-text"
                />

                 <EditableText
                    id="agentes_intro_text_2"
                    initialText="Os agentes <strong>desenvolvem pesquisas, ações práticas e educativas</strong> voltadas à preservação da natureza e à melhoria da qualidade de vida local."
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
            <div className="agentes-header">
                <EditableText 
                    id="agentes-title"
                    initialText="Conheça nossos agentes"
                    tag="h1"
                    className="agentes-title"
                />
                {isAuthenticated && (
                    <button 
                        onClick={handleAddAgenteClick} 
                        className="add-agente-btn"
                        title="Adicionar novo agente"
                    >
                        Adicionar Agente
                    </button>
                )}
            </div>

            {loading && (
                <div className="loading-message">
                    <p>Carregando agentes...</p>
                </div>
            )}

            {error && !loading && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={carregarAgentes} className="retry-btn">
                        Tentar novamente
                    </button>
                </div>
            )}

            {!loading && !error && (
                <div className="agentes-container">
                    {agentes.length > 0 ? (
                        agentes.map((agente) => (
                            <div key={agente.id} className="agente-card">
                                {isAuthenticated && (
                                    <button 
                                        onClick={() => handleDeleteAgente(agente.id, agente.nome)}
                                        className="delete-agente-btn"
                                        title="Remover agente"
                                    >
                                        ✕
                                    </button>
                                )}
                                <div className="agente-image">
                                    <img src={agente.imageUrl} alt={`Agente ${agente.nome}`}/>
                                </div>
                                <div className="agente-info">
                                    <EditableText
                                        id={`agente_nome_${agente.id}`}
                                        initialText={agente.nome}
                                        tag="h3"
                                        className="agente-name"
                                    />

                                    <EditableText 
                                        id={`agente_description_${agente.id}`}
                                        initialText={agente.descricao}
                                        tag="p"
                                        className="agente-descripition"
                                        multiline={true}
                                    /> 
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-agentes">
                            <p>Nenhum agente cadastrado ainda.</p>
                            {isAuthenticated && (
                                <button onClick={handleAddAgenteClick} className="empty-add-btn">
                                    Adicionar primeiro agente
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
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

        <AddAgenteForm 
            isOpen={isAddAgenteOpen}
            onClose={handleCloseAddAgente}
            onSubmit={handleAddAgenteSuccess}
        />
    </div>
)

}