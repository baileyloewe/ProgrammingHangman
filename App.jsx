import { languages } from "./languages.js"
import { useState, useEffect, useRef } from 'react'
import { nanoid } from "nanoid"


export default function Hangman() {

    const [guessedLetters, setGuessedLetters] = useState(() => new Set())
    const [word, setWord] = useState(() => "react")
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const wrongGuessCount = [...guessedLetters].reduce((acc, letter) => !word.includes(letter) ? acc + 1 : acc, 0)
    const isGameWon = word.split("").every(letter => guessedLetters.has(letter))
    const isGameLost = wrongGuessCount === languages.length - 1
    

  const languageElements = languages.map((lang, index) => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    return <span className={`language-chip ${index < wrongGuessCount ? "lost" : ""}`} key={lang.name} style={styles}>{lang.name}</span>
  })

  

  const letterElements = word.split('').map(letter => (
    <span className="letter" key={nanoid()}>{guessedLetters.has(letter) ? letter.toUpperCase() : ""}</span>)
  )

  const keyboardElements = alphabet.split('').map(letter => {
    const isGuessed = guessedLetters.has(letter)
    const inWord = word.includes(letter)
    const correctStatus = 
        isGuessed && inWord ? "correct" :
        isGuessed && !inWord ? "incorrect" :
        ""
    return <button className={`key ${correctStatus}`} onClick={() => addGuessedLetter(letter)}>{letter.toUpperCase()}</button>
  })

  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => new Set(prevLetters).add(letter))
  }

  return (
      <main>
          <header>
            <h1>Assembly: Endgame</h1>
            <p>Guess the word within 8 attempts to keep the 
            programming world safe from Assembly!</p>
          </header>
          <section className={`game-status ${isGameWon ? "won" : isGameLost ? "lost" : ""}`}>
                {
                isGameWon ?  <><h2>You win!</h2><p>Well done! 🎉</p></> : 
                isGameLost ? <><h2>Game Over!</h2><p>You lose! Better start learning Assembly!</p></> : 
                             <><h2></h2><p></p></>
                }
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
          {isGameLost ? <button className="new-game">New Game</button> : null}
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