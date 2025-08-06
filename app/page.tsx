import React from 'react';
import Head from 'next/head';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Procys</title>
        <meta name="description" content="Procys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Procys</h1>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Procys
        </h1>

        <p className={styles.description}>
          Procys is your trusted financial management solution.
        </p>
      </main>

      <footer className={styles.footer}>
        <p>Procys &copy; 2023</p>
      </footer>
    </div>
  );
}
