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
];

function QuizPage() {
    const [indice, setIndice] = useState(0);
    const [selecionada, setSelecionada] = useState("");
    const [mostrarResposta, setMostrarResposta] = useState(false);
    const [tempo, setTempo] = useState(30); // ⏱️ Agora são 30 segundos
    const [finalizado, setFinalizado] = useState(false);
    const [score, setScore] = useState(0); // ✅ Score atual
    
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

    // Atualiza o tempo
    useEffect(() => {
        if (tempo > 0 && !mostrarResposta) {
            const timer = setTimeout(() => setTempo((t) => t - 1), 1000);
            return () => clearTimeout(timer);
        } else if (tempo === 0 && !mostrarResposta) {
            setMostrarResposta(true);
        }
    }, [tempo, mostrarResposta]);

    // Envia a resposta e computa o score
    const enviar = () => {
        if (selecionada) {
            setMostrarResposta(true);
            if (selecionada === perguntas[indice].resposta) {
                const novoScore = score + 1;
                setScore(novoScore);
                localStorage.setItem("scoreTotal", novoScore); 
            }
        }
    };

    const proximo = () => {
        if (indice + 1 < perguntas.length) {
            setIndice((i) => i + 1);
            setSelecionada("");
            setMostrarResposta(false);
            setTempo(30); // reinicia tempo
        } else {
            setFinalizado(true);
        }
    };

    // Se o quiz terminou
    if (finalizado)
        return (
            <div>
                <h2>Parabéns! Quiz finalizado com sucesso.</h2>
                <p>Seu score: {score} / {perguntas.length}</p>
                <p>Score total salvo no navegador: {localStorage.getItem("scoreTotal") || score}</p>
            </div>
        );

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
                        <div className="palm-leaf"></div>
                    </div>
                </div>

                <div className="quiz-section">
                    <h2>Pronto para começar? Aqui estão as perguntas!</h2>
                    
                    <div className="question-container">
                        <h3>{pergunta.pergunta}</h3>
                        
                        <div className="options-container">
                            {pergunta.opcoes.map((opcao, i) => (
                                <div
                                    key={i}
                                    className={`option ${opcao === selecionada ? 'selected' : ''} ${
                                        mostrarResposta && opcao === pergunta.resposta ? 'correct' : ''
                                    }`}
                                    onClick={() => !mostrarResposta && setSelecionada(opcao)}
                                >
                                    <span className="option-checkbox">●</span>
                                    {opcao}
                                </div>
                            ))}
                        </div>
                        
                        <button 
                            className="quiz-button"
                            onClick={!mostrarResposta ? enviar : proximo}
                        >
                            {!mostrarResposta ? 'Confira seu resultado' : 'Próxima pergunta'}
                        </button>
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

