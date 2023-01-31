import Alphabet from "./Alphabet";
import {font, consonants, vowels, others} from "./Alphabet";

var unicodeList // set of all Coptic unicode characters

export default class Model {
    constructor() {
        let a = new Alphabet()
        a.initializeConvert()
        a.initializeTranslit()
        // set unicode list to all keys in consonants, vowels, and others
        unicodeList = new Set([...consonants.keys(), ...vowels.keys(), ...others.keys()])
    }

    /* convert Coptic font to Unicode */
    convert(text) {
        // if already unicode, return text
        if (text.includes('̀')) {
            return text
        }
        // TODO: fix check if text contains any elements of unicodeList
        // let containsUnicode = false
        // unicodeList.forEach((item) => {
        //     if (text.includes(item)) {
        //         containsUnicode = true
        //         return
        //     }
        // })
        // if (containsUnicode) {
        //     return text
        // }

        // else, convert to unicode
        const original = text.split('')
        const swapped = text.split('')
        let res = []
        // TODO: handle abbreviations
        // swap jenkim to after letter
        original.forEach((item, index) => {
            if (item === '`') {
                swapped[index] = original[index + 1]
                swapped[index + 1] = item
            }
        })
        swapped.forEach((item) => {
            res.push(font.get(item) || item)
        })
        return res.join('')
    }

    /* transliterate Coptic Unicode */
    transliterate(text) {
        const original = text.split('')
        const swapped = text.split('')
        // swap jenkim to before letter
        original.forEach((item, index) => {
            if (item === '̀') {
                swapped[index] = original[index - 1]
                swapped[index - 1] = item
            }
        })
        const lowercase = swapped.join('').toLowerCase().split('')
        let res = []
        lowercase.forEach((item, index) => {
            const prev = lowercase[index - 1]
            const next = lowercase[index + 1]
            switch (true) {
                // TODO: ignore abbreviation line

                // add jenkim to consonant
                case item === '̀':
                    if (consonants.has(next)) {
                        res.push('e')
                    }
                return

                // TODO: finish handling names
                case (item === 'ⲓ' && next === 'ⲱ'):
                    this.isUppercase(swapped[index]) ? res.push('Y') : res.push('y')
                    return
                /* special vowel cases */
                // TODO: ⲟⲓ case, requies Greek distinction
                // ⲏⲓ case
                case (item === 'ⲏ' && next === 'ⲓ'):
                    res.push('e')
                    return
                // ⲩ follows ⲁ or ⲉ
                case ((item === 'ⲁ' || item === 'ⲉ') && next === 'ⲩ'):
                    this.isUppercase(swapped[index]) ? res.push(vowels.get(item).toUpperCase()) : res.push(vowels.get(item))
                    res.push('v')
                    return
                // ⲩ follows ⲟ
                case (item === 'ⲟ' && next === 'ⲩ'):
                    this.isUppercase(swapped[index]) ? res.push('O') : res.push('o')
                    res.push('u')
                    return
                // ⲩ is follows ⲁ or ⲉ or ⲟ
                case (item === 'ⲩ' && (prev === 'ⲁ' || prev === 'ⲉ' || prev === 'ⲟ')):
                    return

                /* special consonant cases */
                // ⲅ makes g sound
                case (item === 'ⲅ' && (next === 'ⲓ' || next === 'ⲉ')):
                    this.isUppercase(swapped[index]) ? res.push('G') : res.push('g')
                    return
                // consecutive ⲅ
                case (item === 'ⲅ' && next === 'ⲅ'):
                    res.push('n')
                    return
                // ϫ makes g sound
                case (item === 'ϫ' && (next === 'ⲁ' || next === 'ⲟ' || next === 'ⲱ' || 
                                        (!consonants.has(next) && !vowels.has(next)))):
                    this.isUppercase(swapped[index]) ? res.push('G') : res.push('g')
                    return
                // ⲃ at the end of word
                case (item === 'ⲃ' && (!consonants.has(next) && !vowels.has(next))):
                    res.push('b')
                    return
                // ⲭ makes sh sound
                case (item === 'ⲭ' && (next === 'ⲉ' || next === 'ⲏ')):
                    this.isUppercase(swapped[index]) ? res.push('Sh') : res.push('sh')
                    return
                default:
                    console.log(item)
            }
            // preserve capitalization
            if (this.isUppercase(swapped[index]))
                res.push(vowels.get(swapped[index]) || consonants.get(swapped[index]) || others.get(swapped[index]) || item)
            else
                res.push(vowels.get(item) || consonants.get(item) || others.get(item) || item)
        });

        // add dashes for consecutive vowels
        res.forEach((item, index) => {
            const next = res[index + 1]
            if (item.match(/\p{Letter}/gu) && ((item === next && this.isVowel(item)) 
                                                || (item === 'u' && next === 'o')
                                                || (item === 'i' && next === 'e')
                                                || (item === 'a' && next === 'e')))
                res[index] = item + '-'
        })
        return res.join('')
    }

    /* helper functions */
    isVowel(char) {
        return char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u'
    }

    isUppercase(char) {
        return char === char.toUpperCase()
    }
}