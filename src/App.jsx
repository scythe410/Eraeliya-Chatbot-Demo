import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Chatbot from './components/Chatbot';
import { knowledgeBase } from './data/knowledgeBase';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />

      <section id="villas" className="section">
        <div className="container text-center">
          <h2 className="section-title">Villas & Rooms</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 40px' }}>
            Eraeliya Villas & Gardens is a boutique oceanfront beach resort in Weligama South Sri Lanka offering accommodation for up to 22 guests while ensuring personalized care for each visitor.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {knowledgeBase.villas.map((villa, index) => (
              <div key={index} style={{ padding: '20px', border: '1px solid #eee', textAlign: 'left' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{villa.name}</h3>
                <p style={{ fontSize: '14px', color: '#666' }}>{villa.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="dining" className="section" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="container text-center">
          <h2 className="section-title">Dining</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 40px' }}>
            {knowledgeBase.dining.description}
          </p>
          <div style={{ padding: '30px', backgroundColor: 'white', display: 'inline-block', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Signature Dish</h3>
            <p style={{ fontStyle: 'italic', color: '#666' }}>{knowledgeBase.dining.signatureDish}</p>
          </div>
        </div>
      </section>

      <section id="offers" className="section">
        <div className="container">
          <h2 className="section-title">Special Offers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {knowledgeBase.offers.map((offer, index) => (
              <div key={index} style={{ padding: '30px', border: '1px solid #eee', transition: 'transform 0.3s' }} className="offer-card">
                <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>{offer.title}</h3>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>{offer.description}</p>
                <button className="btn">Book Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experiences" className="section" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'white' }}>Experiences</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {knowledgeBase.experiences.map((exp, index) => (
              <span key={index} style={{ padding: '10px 20px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '30px' }}>
                {exp}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" style={{ padding: '50px 0', backgroundColor: '#111', color: '#888', fontSize: '14px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <h3 style={{ color: 'white', marginBottom: '20px' }}>Eraeliya</h3>
            <p>{knowledgeBase.contact.address}</p>
            <p>{knowledgeBase.contact.phone}</p>
            <p>{knowledgeBase.contact.email}</p>
          </div>
          <div>
            <h3 style={{ color: 'white', marginBottom: '20px' }}>Links</h3>
            <ul style={{ lineHeight: '2' }}>
              <li><a href="#">Home</a></li>
              <li><a href="#villas">Villas</a></li>
              <li><a href="#offers">Offers</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center" style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #222' }}>
          <p>&copy; 2025 Eraeliya Villas & Gardens. Demo by Antigravity.</p>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}

export default App;
