import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [logs, setLogs] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(true);

    const apiUrl = import.meta.env.VITE_API_URL || '';

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 5000); // Refresh every 5s
        return () => clearInterval(interval);
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/stats`);
            if (response.ok) {
                const data = await response.json();
                setStats(data.stats);
                setLogs(data.logs);
            }
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            padding: '40px',
            backgroundColor: '#f4f4f4',
            minHeight: '100vh',
            fontFamily: "'Lato', sans-serif",
        },
        header: {
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        title: {
            fontSize: '32px',
            color: '#1a1a1a',
            fontFamily: "'Playfair Display', serif",
        },
        tabs: {
            display: 'flex',
            gap: '20px',
            marginBottom: '30px',
            borderBottom: '1px solid #ddd',
        },
        tab: (isActive) => ({
            padding: '10px 20px',
            cursor: 'pointer',
            borderBottom: isActive ? '3px solid #1a1a1a' : '3px solid transparent',
            fontWeight: isActive ? 'bold' : 'normal',
            color: isActive ? '#1a1a1a' : '#666',
        }),
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
        section: {
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            marginBottom: '40px',
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
            backgroundColor: '#fafafa',
        },
        td: {
            padding: '15px',
            borderBottom: '1px solid #eee',
            fontSize: '14px',
            verticalAlign: 'top',
        },
        badge: (type) => ({
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            backgroundColor: type === 'Mobile' ? '#e3f2fd' : type === 'iOS' ? '#f3e5f5' : '#f5f5f5',
            color: type === 'Mobile' ? '#1565c0' : type === 'iOS' ? '#7b1fa2' : '#333',
        }),
        chartBar: (percent) => ({
            height: '24px',
            backgroundColor: '#1a1a1a',
            width: `${percent}%`,
            borderRadius: '0 4px 4px 0',
            transition: 'width 0.5s ease',
        })
    };

    if (loading) return <div style={styles.container}>Loading analytics...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Eraeliya Analytics</h1>
                <button onClick={fetchStats} style={{ padding: '10px 20px', backgroundColor: '#1a1a1a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Refresh Data
                </button>
            </div>

            <div style={styles.tabs}>
                <div style={styles.tab(activeTab === 'dashboard')} onClick={() => setActiveTab('dashboard')}>Dashboard</div>
                <div style={styles.tab(activeTab === 'logs')} onClick={() => setActiveTab('logs')}>Conversation Logs</div>
            </div>

            {activeTab === 'dashboard' && (
                <>
                    <div style={styles.grid}>
                        <div style={styles.card}>
                            <div style={styles.cardTitle}>Total Conversations</div>
                            <div style={styles.cardValue}>{stats?.totalConversations || 0}</div>
                        </div>
                        <div style={styles.card}>
                            <div style={styles.cardTitle}>Avg. Response Time</div>
                            <div style={styles.cardValue}>{stats?.avgResponseTime || 0}ms</div>
                        </div>
                        <div style={styles.card}>
                            <div style={styles.cardTitle}>Active Devices</div>
                            <div style={styles.cardValue}>{Object.keys(stats?.deviceStats || {}).length}</div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={styles.section}>
                            <h3 style={{ ...styles.title, fontSize: '20px', marginBottom: '20px' }}>Device Breakdown</h3>
                            {Object.entries(stats?.deviceStats || {}).map(([device, count]) => (
                                <div key={device} style={{ marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <span>{device}</span>
                                        <span>{count}</span>
                                    </div>
                                    <div style={{ width: '100%', backgroundColor: '#eee', borderRadius: '4px' }}>
                                        <div style={styles.chartBar((count / stats.totalConversations) * 100)}></div>
                                    </div>
                                </div>
                            ))}
                            {(!stats?.deviceStats || Object.keys(stats.deviceStats).length === 0) && <p>No data yet.</p>}
                        </div>

                        <div style={styles.section}>
                            <h3 style={{ ...styles.title, fontSize: '20px', marginBottom: '20px' }}>Activity by Hour</h3>
                            {Object.entries(stats?.hourlyStats || {}).map(([hour, count]) => (
                                <div key={hour} style={{ marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <span>{hour}</span>
                                        <span>{count}</span>
                                    </div>
                                    <div style={{ width: '100%', backgroundColor: '#eee', borderRadius: '4px' }}>
                                        <div style={styles.chartBar((count / stats.totalConversations) * 100)}></div>
                                    </div>
                                </div>
                            ))}
                            {(!stats?.hourlyStats || Object.keys(stats.hourlyStats).length === 0) && <p>No data yet.</p>}
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'logs' && (
                <div style={styles.section}>
                    <h3 style={{ ...styles.title, fontSize: '24px', marginBottom: '20px' }}>Detailed Conversation Logs</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Time</th>
                                <th style={styles.th}>Device</th>
                                <th style={styles.th}>User Query</th>
                                <th style={styles.th}>Bot Response</th>
                                <th style={styles.th}>Resp. Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.id}>
                                    <td style={styles.td}>{new Date(log.timestamp).toLocaleTimeString()} <br /> <span style={{ fontSize: '11px', color: '#999' }}>{new Date(log.timestamp).toLocaleDateString()}</span></td>
                                    <td style={styles.td}><span style={styles.badge(log.device)}>{log.device}</span></td>
                                    <td style={{ ...styles.td, fontWeight: 'bold' }}>{log.query}</td>
                                    <td style={{ ...styles.td, color: '#555', maxWidth: '400px' }}>{log.response.substring(0, 100)}...</td>
                                    <td style={styles.td}>{log.responseTime}ms</td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ ...styles.td, textAlign: 'center' }}>No conversations recorded yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
