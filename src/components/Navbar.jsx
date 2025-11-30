import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

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

    const styles = {
        nav: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
            transition: 'all 0.3s ease',
            backgroundColor: scrolled ? 'white' : 'transparent',
            boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
            padding: scrolled ? '15px 0' : '25px 0',
            color: scrolled ? '#333' : 'white',
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
        },
        logo: {
            fontSize: '24px',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 'bold',
            letterSpacing: '2px',
            textTransform: 'uppercase',
        },
        links: {
            display: 'flex',
            gap: '30px',
        },
        link: {
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '400',
        }
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.container}>
                <div style={styles.logo}>Eraeliya</div>
                <ul style={styles.links}>
                    <li><a href="#" style={styles.link}>Home</a></li>
                    <li><a href="#villas" style={styles.link}>Villas & Rooms</a></li>
                    <li><a href="#offers" style={styles.link}>Offers</a></li>
                    <li><a href="#dining" style={styles.link}>Dining</a></li>
                    <li><a href="#experiences" style={styles.link}>Experiences</a></li>
                    <li><a href="#contact" style={styles.link}>Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
