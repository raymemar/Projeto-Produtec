import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import EditableText from './components/EditableText';
import './Carnauba.css';

export default function Carnauba() {
  return (
    <div className="carnauba-page">
      <Header />
      
      <main className="main-content">
        <div className="hero-section">
          <EditableText
            id="carnauba_title"
            initialText="A Carnaúba"
            tag="h1"
            className="page-title"
          />
          
          <EditableText
            id="carnauba_subtitle"
            initialText="A árvore da vida do sertão brasileiro"
            tag="h2"
            className="page-subtitle"
          />
        </div>

        <div className="content-section">
          <div className="text-content">
            <EditableText
              id="carnauba_intro"
              initialText="A carnaúba (Copernicia prunifera) é uma palmeira endêmica do nordeste brasileiro, conhecida como a 'árvore da vida' devido à sua versatilidade e importância econômica para a região."
              tag="p"
              className="intro-text"
              multiline={true}
            />

            <EditableText
              id="carnauba_description"
              initialText="Suas folhas produzem uma cera natural de alta qualidade, utilizada em diversos setores industriais, desde cosméticos até produtos automotivos. Além disso, a carnaúba desempenha um papel fundamental na preservação do meio ambiente semiárido."
              tag="p"
              className="description-text"
              multiline={true}
            />

            <div className="characteristics-section">
              <EditableText
                id="carnauba_char_title"
                initialText="Características da Carnaúba"
                tag="h3"
                className="section-title"
              />
              
              <EditableText
                id="carnauba_characteristics"
                initialText="• Resistente à seca e adaptada ao clima semiárido<br/>• Pode atingir até 20 metros de altura<br/>• Folhas em formato de leque<br/>• Produz cera natural de alta qualidade<br/>• Frutos comestíveis ricos em nutrientes"
                tag="div"
                className="characteristics-list"
                multiline={true}
              />
            </div>

            <div className="sustainability-section">
              <EditableText
                id="carnauba_sustain_title"
                initialText="Sustentabilidade e Futuro"
                tag="h3"
                className="section-title"
              />
              
              <EditableText
                id="carnauba_sustainability"
                initialText="O cultivo sustentável da carnaúba representa uma oportunidade única de desenvolvimento econômico aliado à preservação ambiental. Nosso projeto estuda formas de otimizar seu uso como alternativa sustentável em tempos de mudanças climáticas."
                tag="p"
                className="sustainability-text"
                multiline={true}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
