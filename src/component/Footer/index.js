// Footer.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

import './Footer.css';

// Adicione os ícones diretamente no componente
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faLinkedin, faGithub);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Desenvolvido por James Bassani</p>
        <div className="social-logos">
          {/* LinkedIn Logo */}
          <a href="https://www.linkedin.com/in/jheimys/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          {/* GitHub Logo */}
          <a href="https://github.com/Jheimys" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
