import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { transliterateController } from '../controller/Controller'
import Model from '../model/Model'
import { useState } from 'react'

export default function Home() {
  const [model, setModel] = useState(new Model());
  // const [copticUnicode, setCopticUnicode] = useState();
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
        <h1 className={styles.code}>Coptic Transliterator</h1>
        <label className={styles.title}>Enter Coptic Unicode or paste text from <a href="http://tasbeha.org/hymn_library"
                                                                                    target="_blank"
                                                                                    className={styles.link}>Tasbeha.org</a></label>
        {/* <div class="textAreaColumn"> */}
          <textarea
            id="copticUnicode"
            className={styles.box}
            type="text"
            placeholder="Enter Coptic Here"
            rows="20"
          />
          <button onClick={() => transliterateController(model, setCopticText)}>Convert</button>
          <textarea
            className={styles.box}
            readOnly={true}
            rows="20"
            value={copticText ? copticText : ''}
          />
        {/* </div> */}
        <button onClick={() => navigator.clipboard.writeText(copticText)}>Copy</button>
      </main>
    </>
  )
}
