import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { ExtensionMessage, StatusResponse } from './shared/messages';

export default function App() {
  const [status, setStatus] = useState<string>('Initializing...');
  const [timestamp, setTimestamp] = useState<number | null>(null);

  const checkBackgroundStatus = () => {
    setStatus('Checking...');
    const checkMessage: ExtensionMessage = { type: 'CHECK_STATUS' };
    chrome.runtime.sendMessage(checkMessage, (response: StatusResponse) => {
      if (chrome.runtime.lastError) {
        setStatus('Offline');
        setTimestamp(null);
      } else {
        setStatus('Connected');
        setTimestamp(response.timestamp);
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkBackgroundStatus();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logoDot} />
          <h1 className={styles.title}>Cloakify</h1>
        </div>
        <span className={styles.statusBadge}>ACTIVE</span>
      </header>

      <main className={styles.mainCard}>
        <div className={styles.cardTop}>
          <h2 className={styles.cardTitle}>Runtime Status</h2>
          <p className={styles.cardDescription}>
            Service Worker Status: <strong>{status}</strong>
            {timestamp && (
              <span
                style={{
                  display: 'block',
                  fontSize: '11px',
                  marginTop: '4px',
                  color: 'var(--text-muted)',
                }}
              >
                Last Ping: {new Date(timestamp).toLocaleTimeString()}
              </span>
            )}
          </p>
          <div className={styles.techStackList}>
            <span className={styles.techTag}>React 19</span>
            <span className={styles.techTag}>Vite</span>
            <span className={styles.techTag}>TypeScript</span>
            <span className={styles.techTag}>Turborepo</span>
            <span className={styles.techTag}>MV3</span>
          </div>
        </div>

        <button id="action-btn" className={styles.actionButton} onClick={checkBackgroundStatus}>
          Check Runtime Status
        </button>
      </main>

      <footer className={styles.footer}>
        <span className={styles.version}>Cloakify v1.0.0</span>
      </footer>
    </div>
  );
}
