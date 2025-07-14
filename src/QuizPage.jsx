import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        pergunta: "5. Qual palmeira é conhecida como 'árvore da vida' e produz cera natural?",
        opcoes: ["A: Licuri", "B: Carnaúba", "C: Tucumã", "D: Buriti"],
        resposta: "B: Carnaúba",
    },
    {
        pergunta: "6. Qual árvore da Caatinga é utilizada para alimentação animal e possui espinhos?",
        opcoes: ["A: Xique-xique", "B: Mandacaru", "C: Palma", "D: Todas as anteriores"],
        resposta: "D: Todas as anteriores",
    },
    {
        pergunta: "7. Qual dessas espécies é considerada indicadora de água subterrânea?",
        opcoes: ["A: Juazeiro", "B: Oiticica", "C: Baraúna", "D: Quixabeira"],
        resposta: "A: Juazeiro",
    },
    {
        pergunta: "8. Qual árvore produz uma resina aromática utilizada em rituais e medicina?",
        opcoes: ["A: Angico", "B: Aroeira", "C: Imburana", "D: Cumaru"],
        resposta: "C: Imburana",
    },
    {
        pergunta: "9. Qual dessas plantas é considerada símbolo de resistência do sertão?",
        opcoes: ["A: Xique-xique", "B: Mandacaru", "C: Coroa-de-frade", "D: Todas as anteriores"],
        resposta: "D: Todas as anteriores",
    },
    {
        pergunta: "10. Qual árvore da Caatinga tem flores roxas e é muito valorizada na medicina popular?",
        opcoes: ["A: Pau-d'arco", "B: Mulungu", "C: Mororó", "D: Jucá"],
        resposta: "A: Pau-d'arco",
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
    
    // Simplificando sem AuthContext por enquanto
    const isAuthenticated = false;
    
    const handleLoginClick = () => {
        // Lógica para abrir modal de login
        console.log('Login clicked');
    };
    
    const handleLogoutClick = () => {
        // Lógica para logout
        console.log('Logout clicked');
    };

    const proximo = () => {
        if (indice + 1 < perguntas.length) {
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
            if (selecionada === perguntas[indice].resposta) {
                const novoScore = score + 1;
                setScore(novoScore);
                localStorage.setItem("scoreTotal", novoScore); 
            }
        }
    };

    // Se o quiz terminou
    if (finalizado) {
        const porcentagem = Math.round((score / perguntas.length) * 100);
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
                <header className="header">
                    <div className="header-content">
                        <div className="logo">
                            <h1 className="logo-text">Projeto</h1>
                            <h2 className="logo-subtext">PRODUTEC</h2>
                        </div>
                        <nav className="nav-menu">
                            <Link to="/" className="nav-link">Sobre Nós</Link>
                            <Link to="/carnauba" className="nav-link">Carnaúba</Link>
                            <Link to="/arvores-nativas" className="nav-link">Árvores Nativas</Link>
                            <Link to="/agentes" className="nav-link">Agentes</Link>
                            <Link to="/quiz" className="nav-link active">Quiz</Link>
                        </nav>
                    </div>
                </header>
                
                <main className="quiz-main">
                    <div className="result-section">
                        <div className="result-content">
                            <h1>{emoji} Quiz Finalizado!</h1>
                            <div className="score-display">
                                <div className="score-circle-big">
                                    <span className="score-number">{score}</span>
                                    <span className="score-total">/{perguntas.length}</span>
                                </div>
                                <div className="percentage">{porcentagem}%</div>
                            </div>
                            <p className="result-message">{mensagem}</p>
                            <div className="action-buttons">
                                <button 
                                    className="quiz-button restart-button"
                                    onClick={() => window.location.reload()}
                                >
                                    Tentar Novamente
                                </button>
                                <Link to="/" className="quiz-button home-button">
                                    Voltar ao Início
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    const pergunta = perguntas[indice];

    return (
        <div className="quiz-container">
            {/* Header com navegação */}
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <h1 className="logo-text">Projeto</h1>
                        <h2 className="logo-subtext">PRODUTEC</h2>
                    </div>
                    <nav className="nav-menu">
                        <Link to="/" className="nav-link">Sobre Nós</Link>
                        <Link to="/carnauba" className="nav-link">Carnaúba</Link>
                        <Link to="/arvores-nativas" className="nav-link">Árvores Nativas</Link>
                        <Link to="/agentes" className="nav-link">Agentes</Link>
                        <Link to="/quiz" className="nav-link active">Quiz</Link>
                    </nav>
                </div>
            </header>

            <main className="quiz-main">
                <div className="quiz-intro">
                    <div className="quiz-text">
                        <h1>Vamos testar seus conhecimentos sobre as árvores da Caatinga</h1>
                        <p>Agora que você já leu sobre as árvores da Caatinga, que tal colocar seus saberes à prova com esse quiz? Rola para baixo e comece já.</p>
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
                            <p className="timer-label">Tempo restante</p>
                        </div>
                    </div>
                </div>

                <div className="quiz-section">
                    <div className="quiz-header">
                        <h2>Pergunta {indice + 1} de {perguntas.length}</h2>
                        <div className="progress-container">
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${((indice + 1) / perguntas.length) * 100}%` }}
                                ></div>
                            </div>
                            <span className="progress-text">{indice + 1}/{perguntas.length}</span>
                        </div>
                    </div>

                    {tempoExpirado && (
                        <div className="time-expired-banner">
                            <p className="time-expired-message"> Tempo esgotado! Passando para a próxima pergunta...</p>
                        </div>
                    )}
                    
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
                                {!mostrarResposta ? 'Confira seu resultado' : 'Próxima pergunta'}
                            </button>
                        )}
                    </div>
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

            <footer className="footer-section">
                <div className="footer-content">
                    <div className="footer-logo">
                        <h1>Projeto</h1>
                        <h2>PRODUTEC</h2>
                    </div>
                    
                    <div className="footer-nav">
                        <div className="nav-column">
                            <h4>Navegação</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/carnauba">Carnaúba</Link></li>
                                <li><Link to="/arvores-nativas">Árvores Nativas</Link></li>
                                <li><Link to="/agentes">Agentes</Link></li>
                                <li><Link to="/quiz">Quiz</Link></li>
                            </ul>
                        </div>
                        
                        <div className="nav-column">
                            <h4>Acesse também</h4>
                            <div className="social-links">
                                <a href="https://www.instagram.com/produtec2025/" className="social-link">
                                    <img src="/Vector_insta.png" alt="Instagram" className="social-icon" /> Instagram
                                </a>
                                <a href="#" className="social-link">
                                    <img src="/Vector_youtube.png" alt="Youtube" className="social-icon" /> Youtube
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="footer-button">
                        {isAuthenticated ? (
                            <button className="logout-btn" onClick={handleLogoutClick}>
                                Sair
                            </button>
                        ) : (
                            <button className="login-btn" onClick={handleLoginClick}>
                                Login Adm
                            </button>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default QuizPage;

