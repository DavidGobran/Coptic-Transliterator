import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { convertController, transliterateController } from './controller/Controller'
import Model from './model/Model'
import { useState } from 'react'

export default function Home() {
  const [model, setModel] = useState(new Model());
  const [copticUnicode, setCopticUnicode] = useState();
  const [copticText, setCopticText] = useState();

  return (
    <>
      <Head>
        <title>Coptic Transliterator</title>
        <meta name="description" content="transliterate coptic te" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Coptic Transliterator</h1>
        <textarea
          id="copticFont"
          className={styles.box}
          type="text"
          placeholder="Enter Coptic Text Here (as copied from tasbeha.org)"
          rows="10"
        />
        <button onClick={() => convertController(model, setCopticUnicode)}>Convert</button>
        <textarea
          id="copticUnicode"
          className={styles.box}
          type="text"
          // placeholder="Enter Coptic Unicode Here"
          value={copticUnicode ? copticUnicode : ''}
          rows="10"
        />
        <button onClick={() => transliterateController(model, setCopticText)}>Transliterate</button>
        <textarea
          className={styles.box}
          readOnly={true}
          rows="10"
          value={copticText ? copticText : 'Transliterated Text'}
        />
      </main>
    </>
  )
}
