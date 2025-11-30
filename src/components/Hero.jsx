import React from 'react';

const Hero = () => {
    const styles = {
        hero: {
            height: '100vh',
            backgroundImage: 'url("https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")', // Luxury resort placeholder
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            color: 'white',
            textAlign: 'center',
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
        },
        content: {
            position: 'relative',
            zIndex: 1,
            maxWidth: '800px',
            padding: '0 20px',
        },
        title: {
            fontSize: '60px',
            marginBottom: '20px',
            letterSpacing: '2px',
        },
        subtitle: {
            fontSize: '18px',
            marginBottom: '40px',
            fontWeight: '300',
            letterSpacing: '1px',
        }
    };

    return (
        <div style={styles.hero}>
            <div style={styles.overlay}></div>
            <div style={styles.content}>
                <h1 style={styles.title}>Welcome to Eraeliya Villas & Gardens</h1>
                <p style={styles.subtitle}>A BOUTIQUE OCEANFRONT BEACH RESORT IN WELIGAMA</p>
                <a href="#offers" className="btn" style={{ borderColor: 'white', color: 'white' }}>View Offers</a>
            </div>
        </div>
    );
};

export default Hero;
