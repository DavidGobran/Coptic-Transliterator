import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { transliterateController } from './controller/Controller'
import Model from './model/Model'
import { useState } from 'react'

export default function Home() {
  const [model, setModel] = useState(new Model());
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
          id="copticText"
          className={styles.box}
          type="text"
          placeholder="Enter Coptic Text Here"
          // value="Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ ⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ: ⲫⲏⲉ̀ⲧⲁϥⲙⲟⲩ ⲁϥϩⲱⲙⲓ ⲉ̀ϫⲉⲛ ⲫ̀ⲙⲟⲩ ⲟⲩⲟϩ ⲛⲏⲉⲧⲭⲏ ϧⲉⲛ ⲛⲓⲙ̀ϩⲁⲩ ⲁϥⲉⲣϩ̀ⲙⲟⲧ ⲛⲱⲟⲩ ⲙ̀ⲡⲓⲱⲛϧ ⲛ̀ⲉ̀ⲛⲉϩ."
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
