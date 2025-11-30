import React from 'react';

const AdminDashboard = () => {
    const styles = {
        container: {
            padding: '40px',
            backgroundColor: '#f4f4f4',
            minHeight: '100vh',
            fontFamily: "'Lato', sans-serif",
        },
        header: {
            marginBottom: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        title: {
            fontSize: '32px',
            color: '#1a1a1a',
            fontFamily: "'Playfair Display', serif",
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
        },
        card: {
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
        cardTitle: {
            fontSize: '14px',
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '10px',
        },
        cardValue: {
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#1a1a1a',
        },
        chartContainer: {
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            marginBottom: '40px',
        },
        barChart: {
            display: 'flex',
            alignItems: 'flex-end',
            height: '200px',
            gap: '20px',
            paddingTop: '20px',
        },
        barGroup: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        bar: {
            width: '40px',
            backgroundColor: '#1a1a1a',
            borderRadius: '4px 4px 0 0',
            transition: 'height 0.5s ease',
        },
        label: {
            marginTop: '10px',
            fontSize: '12px',
            color: '#666',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            textAlign: 'left',
            padding: '15px',
            borderBottom: '2px solid #eee',
            color: '#666',
            fontSize: '14px',
        },
        td: {
            padding: '15px',
            borderBottom: '1px solid #eee',
            fontSize: '14px',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Eraeliya Analytics</h1>
                <button style={{ padding: '10px 20px', backgroundColor: '#1a1a1a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Export Report</button>
            </div>

            <div style={styles.grid}>
                <div style={styles.card}>
                    <div style={styles.cardTitle}>Total Conversations</div>
                    <div style={styles.cardValue}>1,248</div>
                </div>
                <div style={styles.card}>
                    <div style={styles.cardTitle}>Leads Generated</div>
                    <div style={styles.cardValue}>86</div>
                </div>
                <div style={styles.card}>
                    <div style={styles.cardTitle}>Avg. Response Time</div>
                    <div style={styles.cardValue}>0.8s</div>
                </div>
                <div style={styles.card}>
                    <div style={styles.cardTitle}>User Satisfaction</div>
                    <div style={styles.cardValue}>4.9/5</div>
                </div>
            </div>

            <div style={styles.chartContainer}>
                <h3 style={{ ...styles.title, fontSize: '24px', marginBottom: '20px' }}>Most Asked Topics</h3>
                <div style={styles.barChart}>
                    <div style={styles.barGroup}>
                        <div style={{ ...styles.bar, height: '80%' }}></div>
                        <span style={styles.label}>Villas</span>
                    </div>
                    <div style={styles.barGroup}>
                        <div style={{ ...styles.bar, height: '60%' }}></div>
                        <span style={styles.label}>Offers</span>
                    </div>
                    <div style={styles.barGroup}>
                        <div style={{ ...styles.bar, height: '45%' }}></div>
                        <span style={styles.label}>Dining</span>
                    </div>
                    <div style={styles.barGroup}>
                        <div style={{ ...styles.bar, height: '30%' }}></div>
                        <span style={styles.label}>Experiences</span>
                    </div>
                    <div style={styles.barGroup}>
                        <div style={{ ...styles.bar, height: '20%' }}></div>
                        <span style={styles.label}>Contact</span>
                    </div>
                </div>
            </div>

            <div style={styles.chartContainer}>
                <h3 style={{ ...styles.title, fontSize: '24px', marginBottom: '20px' }}>Recent Inquiries</h3>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Time</th>
                            <th style={styles.th}>User Query</th>
                            <th style={styles.th}>Bot Response</th>
                            <th style={styles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.td}>2 mins ago</td>
                            <td style={styles.td}>"How much is Villa Bawana?"</td>
                            <td style={styles.td}>Provided pricing info</td>
                            <td style={styles.td}><span style={{ color: 'green' }}>Resolved</span></td>
                        </tr>
                        <tr>
                            <td style={styles.td}>15 mins ago</td>
                            <td style={styles.td}>"Do you have vegan food?"</td>
                            <td style={styles.td}>Confirmed vegan options</td>
                            <td style={styles.td}><span style={{ color: 'green' }}>Resolved</span></td>
                        </tr>
                        <tr>
                            <td style={styles.td}>1 hour ago</td>
                            <td style={styles.td}>"Book a room for next week"</td>
                            <td style={styles.td}>Redirected to booking</td>
                            <td style={styles.td}><span style={{ color: '#d4af37', fontWeight: 'bold' }}>Lead</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
