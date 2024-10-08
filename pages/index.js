import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';
import styles from '../styles/Home.module.css'
import Model from '../model/Model'
import { useState, useEffect } from 'react'

export default function Home() {
  const [model, setModel] = useState(new Model());
  const [copticText, setCopticText] = useState();

  useEffect(() => {
    const copticUnicode = document.getElementById('copticUnicode');
    copticUnicode.addEventListener('input', (e) => {
      setCopticText(model.transliterate(e.target.value))
    });
  })

  return (
    <>
      <Head>
        <title>Coptic Transliterator</title>
        <meta name="description" content="Automatically transliterate Coptic to English." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cross.ico" />
      </Head>
      <Analytics />
      <main className={styles.main}>
        <h1 className={styles.title}>Coptic Transliterator</h1>
        <label className={styles.title}>Enter Coptic Unicode or paste text from <a href="http://tasbeha.org/hymn_library"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}>Tasbeha.org</a></label>
        <textarea
          id="copticUnicode"
          className={styles.box}
          type="text"
          placeholder="Enter Coptic Here"
        />
        <textarea
          className={styles.box}
          readOnly={true}
          placeholder="Transliteration will appear here"
          value={copticText ? copticText : ''}
        />
        <button onClick={() => navigator.clipboard.writeText(copticText)}>Copy</button>
      </main>
      <footer className={styles.footer}>
        <a href="https://github.com/DavidGobran/Coptic-Transliterator" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
        <a href="mailto:dygobran@wpi.edu" target="_blank" rel="noopener noreferrer">
          Contact
        </a>
      </footer>
    </>
  )
}
