import styles from './OptionsApp.module.css';

export default function OptionsApp() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Cloakify Options</h1>
      </header>

      <main className={styles.card}>
        <h2 className={styles.subtitle}>Settings Interface</h2>
        <p className={styles.description}>
          This is the options page configuration hub. Settings will be configured in this workspace.
        </p>
      </main>
    </div>
  );
}
