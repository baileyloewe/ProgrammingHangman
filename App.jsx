import { languages } from "./languages.js"
import { useState } from 'react'
import { nanoid } from "nanoid"


export default function Hangman() {

  const languageElements = languages.map(lang => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    return <span className="language-chip" key={lang.name}style={styles}>{lang.name}</span>
  })

  const [word, setWord] = useState(() => "react")

  const letterElements = word.split('').map(letter => <span className="letter" key={nanoid()}>{letter.toUpperCase()}</span>)

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const keyboardElements = alphabet.split('').map(letter => <button className="key">{letter.toUpperCase()}</button>)

  return (
      <main>
          <header>
            <h1>Assembly: Endgame</h1>
            <p>Guess the word within 8 attempts to keep the 
            programming world safe from Assembly!</p>
          </header>
          <section className="game-status">
            <h2>You Win!</h2>
            <p>Well done! 🎉</p>
          </section>
          <section className="language-chips">
            {languageElements}
          </section>
          <section className="word">
            {letterElements}
          </section>
          <section className="keyboard">
            {keyboardElements}
          </section>
          <button className="new-game">New Game</button>
      </main>
  )
}



/**
 * Project planning:
 * 
 * Questions to ask yourself before writing any code:
 * 
 * - What are the main containers of elements I need
 *   in this app?
 *  I'd do a header for title, instructions, and eventually the win/lost text. 
 *  I'd then have a main component, with 3 child components: langauges (alive and dead),
 * guess text, and then keyboard, then just a button for the new game
 * 
 * - What values will need to be saved in state vs.
 *   what values can be derived from the state?
 * 
 * guesses and alive/dead languages will need to be saved in state, winning state can be derived. 
 * 
 * - How will the user interact with the app? What
 *   events do I need to handle?
 * 
 * they will click on the letters, so we need to handle that event. they will also click
 * on new game
 */