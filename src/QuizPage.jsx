import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from './ADM/AuthContext';
import LoginPopup from './components/LoginPopup';
import EditableText from './components/EditableText';
import EditableQuiz from './components/EditableQuiz';
import Header from './components/Header';
import Footer from './components/Footer';
import "./QuizPage.css";

const perguntas = [
    {
        pergunta: "1. Qual é a árvore símbolo da Caatinga, conhecida por sua resistência à seca e casca esbranquiçada?",
        opcoes: ["A: Aroeira", "B: Juazeiro", "C: Mandacaru", "D: Catingueira"],
        resposta: "D: Catingueira",
    },
    {
        pergunta: "2. Qual dessas árvores possui frutos comestíveis e é muito utilizada na alimentação do sertanejo?",
        opcoes: ["A: Umbuzeiro", "B: Jurema-preta", "C: Angico", "D: Pau-d'arco"],
        resposta: "A: Umbuzeiro",
    },
    {
        pergunta: "3. Qual espécie é famosa por suas flores amarelas e é usada na medicina tradicional?",
        opcoes: ["A: Catingueira", "B: Jurema-branca", "C: Marmeleiro", "D: Imburana"],
        resposta: "C: Marmeleiro",
    },
    {
        pergunta: "4. Qual árvore é conhecida por sua madeira resistente e uso em cercas e construções rurais?",
        opcoes: ["A: Pereiro", "B: Faveleira", "C: Mulungu", "D: Sabiá"],
        resposta: "A: Pereiro",
    },
    {
        pergunta: "5. Qual árvore é conhecida por produzir uma resina medicinal chamada 'breu'?",
        opcoes: ["A: Barriguda (Cavanillesia arborea)", "B: Aroeira (Schinus terebinthifolius)", "C: Angico (Anadenanthera colubrina)", "D: Jucá (Libidibia ferrea)"],
        resposta: "A: Barriguda (Cavanillesia arborea)",
    },
    {
        pergunta: "6. Qual dessas árvores possui espinhos e é importante para a apicultura na Caatinga?",
        opcoes: ["A: Jurema-preta (Mimosa tenuiflora)", "B: Mandacaru (Cereus jamacaru)", "C: Xique-xique (Pilosocereus gounellei)", "D: Macambira (Bromelia laciniosa)"],
        resposta: "A: Jurema-preta (Mimosa tenuiflora)",
    },
    {
        pergunta: "7. Qual dessas espécies é considerada indicadora de água subterrânea?",
        opcoes: ["A: Juazeiro", "B: Oiticica", "C: Baraúna", "D: Quixabeira"],
        resposta: "A: Juazeiro",
    },
    {
        pergunta: "8. Qual árvore tem um tronco inchado que armazena água, adaptação à seca?",
        opcoes: ["A: Barriguda (Cavanillesia arborea)", "B: Mandacaru (Cereus jamacaru)", "C: Juazeiro (Ziziphus joazeiro)", "D: Aroeira (Schinus terebinthifolius)"],
        resposta: "A: Barriguda (Cavanillesia arborea)",
    },
    {
        pergunta: "9. Qual dessas árvores é típica da Caatinga e fornece sombra para o gado?",
        opcoes: ["A: Sabiá (Mimosa caesalpiniifolia)", "B: Jucá (Libidibia ferrea)", "C: Angico (Anadenanthera colubrina)", "D: Mulungu (Erythrina velutina)"],
        resposta: "A: Sabiá (Mimosa caesalpiniifolia)",
    },
    {
        pergunta: "10. Qual árvore possui frutos em forma de vagem e é usada como forragem?",
        opcoes: ["A: Algaroba (Prosopis juliflora)", "B: Jurema-branca (Piptadenia stipulacea)", "C: Catingueira (Poincianella pyramidalis)", "D: Imburana (Commiphora leptophloeos)"],
        resposta: "A: Algaroba (Prosopis juliflora)",
    },
];

function QuizPage() {
    const [indice, setIndice] = useState(0);
    const [selecionada, setSelecionada] = useState("");
    const [mostrarResposta, setMostrarResposta] = useState(false);
    const [tempo, setTempo] = useState(30); // ⏱️ 30 segundos por pergunta
    const [finalizado, setFinalizado] = useState(false);
    const [score, setScore] = useState(0); // ✅ Score atual
    const [tempoExpirado, setTempoExpirado] = useState(false); // 🚫 Controla se tempo expirou
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [perguntasEditaveis, setPerguntasEditaveis] = useState(perguntas);
    
    // Usando o contexto de autenticação real
    const { isAuthenticated, logout } = useAuth();
    
    // Função para salvar pergunta editada
    const handleSaveQuestion = (index, updatedQuestion) => {
        const newPerguntas = [...perguntasEditaveis];
        newPerguntas[index] = updatedQuestion;
        setPerguntasEditaveis(newPerguntas);
        
        // Salvar no localStorage para persistir as alterações
        localStorage.setItem('quiz_perguntas', JSON.stringify(newPerguntas));
    };
    
    // Carregar perguntas do localStorage se existirem
    useEffect(() => {
        const savedPerguntas = localStorage.getItem('quiz_perguntas');
        if (savedPerguntas) {
            setPerguntasEditaveis(JSON.parse(savedPerguntas));
        }
    }, []);
    
    const handleLoginClick = () => {
        setIsLoginPopupOpen(true);
    };
    
    const handleLogoutClick = () => {
        logout();
    };

    const handleClosePopup = () => {
        setIsLoginPopupOpen(false);
    };

    const proximo = () => {
        if (indice + 1 < perguntasEditaveis.length) {
            setIndice((i) => i + 1);
            setSelecionada("");
            setMostrarResposta(false);
            setTempoExpirado(false); // Reseta o estado de tempo expirado
            setTempo(30); // reinicia tempo
        } else {
            setFinalizado(true);
        }
    };

    // Atualiza o tempo e bloqueia respostas quando tempo expira
    useEffect(() => {
        if (tempo > 0 && !mostrarResposta && !tempoExpirado) {
            const timer = setTimeout(() => setTempo((t) => t - 1), 1000);
            return () => clearTimeout(timer);
        } else if (tempo === 0 && !mostrarResposta && !tempoExpirado) {
            setTempoExpirado(true);
            // Auto-passa para próxima pergunta após 2 segundos
            setTimeout(() => {
                proximo();
            }, 2000);
        }
    }, [tempo, mostrarResposta, tempoExpirado]);

    // Envia a resposta e computa o score
    const enviar = () => {
        if (selecionada && !tempoExpirado) {
            setMostrarResposta(true);
            if (selecionada === perguntasEditaveis[indice].resposta) {
                const novoScore = score + 1;
                setScore(novoScore);
                localStorage.setItem("scoreTotal", novoScore); 
            }
        }
    };

    // Se o quiz terminou
    if (finalizado) {
        const porcentagem = Math.round((score / perguntasEditaveis.length) * 100);
        let mensagem = "";
        let emoji = "";
        
        if (porcentagem >= 90) {
            mensagem = "Excelente! Você é um expert em árvores da Caatinga!";
        } else if (porcentagem >= 70) {
            mensagem = "Muito bem! Você tem bom conhecimento sobre a Caatinga!";
        } else if (porcentagem >= 50) {
            mensagem = "Bom trabalho! Continue estudando sobre a Caatinga!";
        } else {
            mensagem = "Que tal estudar mais sobre as árvores da Caatinga?";
        }
        
        return (
            <div className="quiz-container">
                <Header />
                
                <main className="quiz-main">
                    <div className="result-section">
                        <div className="result-content">
                            <EditableText
                                id="quiz_completion_title"
                                initialText="Quiz Finalizado!"
                                tag="h1"
                                className="result-title"
                            />
                            <div className="score-display">
                                <div className="score-circle-big">
                                    <span className="score-number">{score}</span>
                                    <span className="score-total">/{perguntasEditaveis.length}</span>
                                </div>
                                <div className="percentage">{porcentagem}%</div>
                            </div>
                            <p className="result-message">{mensagem}</p>
                            <div className="action-buttons">
                                <EditableText
                                    id="quiz_restart_button"
                                    initialText="Tentar Novamente"
                                    tag="button"
                                    className="quiz-button restart-button"
                                    onClick={() => window.location.reload()}
                                />
                                <Link to="/" className="quiz-button home-button">
                                    <EditableText
                                        id="quiz_home_button"
                                        initialText="Voltar ao Início"
                                        tag="span"
                                        className="button-text"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
                
                {/* Popup de Login */}
                <LoginPopup 
                    isOpen={isLoginPopupOpen} 
                    onClose={handleClosePopup} 
                />
            </div>
        );
    }

    const pergunta = perguntasEditaveis[indice];

    return (
        <div className="quiz-container">
            <Header />

            <main className="quiz-main">
                <div className="quiz-intro">
                    <div className="quiz-text">
                        <EditableText
                            id="quiz_main_title"
                            initialText="Vamos testar seus conhecimentos sobre as árvores da Caatinga"
                            tag="h1"
                            className="quiz-title"
                        />
                        <EditableText
                            id="quiz_main_description"
                            initialText="Agora que você já leu sobre as árvores da Caatinga, que tal colocar seus saberes à prova com esse quiz? Rola para baixo e comece já."
                            tag="p"
                            className="quiz-description"
                        />
                    </div>
                    <div className="quiz-image">
                        <div className="main-timer-container">
                            <div className={`main-timer ${tempo <= 10 ? 'timer-warning' : ''} ${tempoExpirado ? 'timer-expired' : ''}`}>
                                <div className="main-timer-circle">
                                    <div 
                                        className="main-timer-fill" 
                                        style={{ 
                                            '--progress-angle': `${((30 - tempo) / 30) * 360}deg`,
                                            '--timer-color': (() => {
                                                const progress = (30 - tempo) / 30; // 0 = início, 1 = fim
                                                if (progress <= 0.6) {
                                                    // Verde até 60% do tempo (18 segundos passados)
                                                    return '#2ed573';
                                                } else if (progress <= 0.8) {
                                                    // Amarelo entre 60% e 80% (18-24 segundos)
                                                    return '#ffa502';
                                                } else {
                                                    // Vermelho nos últimos 20% (últimos 6 segundos)
                                                    return '#ff4757';
                                                }
                                            })()
                                        }}
                                    ></div>
                                    <div className="main-timer-text">
                                        {tempoExpirado ? 'Tempo!' : tempo}
                                    </div>
                                </div>
                            </div>
                            <EditableText
                                id="timer_label"
                                initialText="Tempo restante"
                                tag="p"
                                className="timer-label"
                            />
                        </div>
                    </div>
                </div>

                <div className="quiz-section">
                    <div className="quiz-header">
                        <h2>Pergunta {indice + 1} de {perguntasEditaveis.length}</h2>
                        <div className="progress-container">
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${((indice + 1) / perguntasEditaveis.length) * 100}%` }}
                                ></div>
                            </div>
                            <span className="progress-text">{indice + 1}/{perguntasEditaveis.length}</span>
                        </div>
                    </div>

                    {tempoExpirado && (
                        <div className="time-expired-banner">
                            <EditableText
                                id="time_expired_message"
                                initialText="⏰ Tempo esgotado! Passando para a próxima pergunta..."
                                tag="p"
                                className="time-expired-message"
                            />
                        </div>
                    )}
                    
                    {isAuthenticated ? (
                        <EditableQuiz
                            pergunta={pergunta.pergunta}
                            opcoes={pergunta.opcoes}
                            resposta={pergunta.resposta}
                            onSave={handleSaveQuestion}
                            perguntaIndex={indice}
                        />
                    ) : (
                        <div className="question-container">
                            <h3>{pergunta.pergunta}</h3>
                            
                            <div className="options-container">
                                {pergunta.opcoes.map((opcao, i) => (
                                    <div
                                        key={i}
                                        className={`option ${opcao === selecionada ? 'selected' : ''} ${
                                            mostrarResposta && opcao === pergunta.resposta ? 'correct' : ''
                                        } ${mostrarResposta && opcao === selecionada && opcao !== pergunta.resposta ? 'incorrect' : ''} ${
                                            tempoExpirado ? 'disabled' : ''
                                        }`}
                                        onClick={() => !mostrarResposta && !tempoExpirado && setSelecionada(opcao)}
                                    >
                                        <span className="option-checkbox">●</span>
                                        {opcao}
                                    </div>
                                ))}
                            </div>
                            
                            {!tempoExpirado && (
                                <button 
                                    className={`quiz-button ${!selecionada ? 'disabled' : ''}`}
                                    onClick={!mostrarResposta ? enviar : proximo}
                                    disabled={!selecionada && !mostrarResposta}
                                >
                                    {!mostrarResposta ? (
                                        <EditableText
                                            id="quiz_check_answer_button"
                                            initialText="Confira seu resultado"
                                            tag="span"
                                            className="button-text"
                                        />
                                    ) : (
                                        <EditableText
                                            id="quiz_next_question_button"
                                            initialText="Próxima pergunta"
                                            tag="span"
                                            className="button-text"
                                        />
                                    )}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {finalizado && (
                    <div className="result-section">
                        <h2>Parabéns, você acertou!</h2>
                        <div className="score-circle">
                            <span>{score}/{perguntas.length}</span>
                        </div>
                    </div>
                )}
            </main>

            <Footer onLoginClick={handleLoginClick} />

            {/* Popup de Login */}
            <LoginPopup 
                isOpen={isLoginPopupOpen} 
                onClose={handleClosePopup} 
            />
        </div>
    );
}

export default QuizPage;

