import React from 'react';
import './footer.css';
import { PAGES } from '../../constants/pages';

const Footer = ({ onNavigate }) => {
    const handleLinkClick = (e, page) => {
        e.preventDefault();
        onNavigate(page);
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-section left">
                        <a href="/" className="logo-footer" draggable="false" onClick={(e) => handleLinkClick(e, PAGES.HOME)}>
                            <img src="/logo.svg" alt="Логотип" className="logo" draggable="false" />
                        </a>
                    </div>

                    <div className="footer-section center">
                        <p className="footer-description">
                            Ваш надежный магазин электроники. <br />
                            Только оригинальные товары с гарантией.
                        </p>
                    </div>

                    <div className="footer-section right">
                        <div className="footer-group">
                            <h4 className="footer-h4">Поддержка</h4>
                            <a href="/help" className="footer-link" onClick={(e) => handleLinkClick(e, PAGES.HELP)}>Помощь</a>
                            <a href="/shipping" className="footer-link" onClick={(e) => handleLinkClick(e, PAGES.DELIVERY)}>Доставка</a>
                            <a href="/returns" className="footer-link" onClick={(e) => handleLinkClick(e, PAGES.RETURNS)}>Возврат</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copy">
                        &copy; {new Date().getFullYear()} OnlyByte's Store. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
                    </div>
                    <div className="footer-socials">
                        <a href="https://t.me/onlybyte" className="footer-link" target="_blank" rel="noreferrer">TELEGRAM</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
