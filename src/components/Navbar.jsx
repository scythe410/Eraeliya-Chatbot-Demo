import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const styles = {
        nav: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
            transition: 'all 0.3s ease',
            backgroundColor: scrolled || mobileMenuOpen ? 'white' : 'transparent',
            boxShadow: scrolled || mobileMenuOpen ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
            padding: scrolled ? '15px 0' : '25px 0',
            color: scrolled || mobileMenuOpen ? '#333' : 'white',
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
            position: 'relative',
        },
        logo: {
            fontSize: '24px',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 'bold',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            zIndex: 102,
        },
        links: {
            display: 'flex',
            gap: '30px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
        },
        link: {
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '400',
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
        },
        // Mobile styles
        hamburger: {
            display: 'none', // Hidden by default on desktop
            flexDirection: 'column',
            gap: '6px',
            cursor: 'pointer',
            zIndex: 102,
        },
        hamburgerLine: {
            width: '25px',
            height: '2px',
            backgroundColor: scrolled || mobileMenuOpen ? '#333' : 'white',
            transition: 'all 0.3s ease',
        },
        mobileMenu: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.3s ease-in-out',
            zIndex: 101,
        },
        mobileLink: {
            fontSize: '20px',
            color: '#333',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '2px',
        }
    };

    return (
        <nav style={styles.nav}>
            <style>
                {`
                    @media (max-width: 768px) {
                        .desktop-links { display: none !important; }
                        .hamburger { display: flex !important; }
                    }
                `}
            </style>
            <div style={styles.container}>
                <div style={styles.logo}>Eraeliya</div>

                {/* Desktop Menu */}
                <ul style={styles.links} className="desktop-links">
                    <li><a href="#" style={styles.link}>Home</a></li>
                    <li><a href="#villas" style={styles.link}>Villas & Rooms</a></li>
                    <li><a href="#offers" style={styles.link}>Offers</a></li>
                    <li><a href="#dining" style={styles.link}>Dining</a></li>
                    <li><a href="#experiences" style={styles.link}>Experiences</a></li>
                    <li><a href="#contact" style={styles.link}>Contact</a></li>
                </ul>

                {/* Hamburger Icon */}
                <div
                    style={styles.hamburger}
                    className="hamburger"
                    onClick={toggleMobileMenu}
                >
                    <div style={{ ...styles.hamburgerLine, transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></div>
                    <div style={{ ...styles.hamburgerLine, opacity: mobileMenuOpen ? 0 : 1 }}></div>
                    <div style={{ ...styles.hamburgerLine, transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></div>
                </div>

                {/* Mobile Menu Overlay */}
                <div style={styles.mobileMenu}>
                    <a href="#" style={styles.mobileLink} onClick={toggleMobileMenu}>Home</a>
                    <a href="#villas" style={styles.mobileLink} onClick={toggleMobileMenu}>Villas & Rooms</a>
                    <a href="#offers" style={styles.mobileLink} onClick={toggleMobileMenu}>Offers</a>
                    <a href="#dining" style={styles.mobileLink} onClick={toggleMobileMenu}>Dining</a>
                    <a href="#experiences" style={styles.mobileLink} onClick={toggleMobileMenu}>Experiences</a>
                    <a href="#contact" style={styles.mobileLink} onClick={toggleMobileMenu}>Contact</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
