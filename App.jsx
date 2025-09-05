import { languages } from "./languages.js"
import { useState, useEffect, useRef } from 'react'
import { nanoid } from "nanoid"
import { getFarewellText } from "./utils.js"


export default function Hangman() {

  const [guessedLetters, setGuessedLetters] = useState(() => new Set())
  const [word, setWord] = useState(() => "react")
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const wrongGuessCount = [...guessedLetters].reduce((acc, letter) => !word.includes(letter) ? acc + 1 : acc, 0)
  const isGameWon = word.split("").every(letter => guessedLetters.has(letter))
  const isGameLost = wrongGuessCount === languages.length - 1
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = Array.from(guessedLetters).pop()
  const isLastGuessIncorrect = Array.from(guessedLetters)[0] && !word.includes(Array.from(guessedLetters).pop())

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
        isGameOver ? "disabled" : ""
    const disabled = isGameOver ? "disabled" : ""
    return <button disabled={isGameOver} aria-label={`Letter: ${letter}`}aria-disabled={Array.from(guessedLetters).includes(letter)} className={`key ${correctStatus} ${disabled}`} onClick={() => addGuessedLetter(letter)}>{letter.toUpperCase()}</button>
  })

  function addGuessedLetter(letter) {
    if (!isGameOver)
    setGuessedLetters(prevLetters => new Set(prevLetters).add(letter))
  }

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) { return <><h2>{getFarewellText(languages[wrongGuessCount - 1].name)}</h2></> }
    
    if (isGameWon) { return <><h2>You win!</h2><p>Well done! 🎉</p></> }
    else if (isGameLost) { return <><h2>Game Over!</h2><p>You lose! Better start learning Assembly!</p></> }
    else { return <><h2></h2><p></p></> }
  }

  return (
      <main>
          <header>
            <h1>Assembly: Endgame</h1>
            <p>Guess the word within 8 attempts to keep the 
            programming world safe from Assembly!</p>
          </header>
          <section className={`game-status ${isGameWon ? "won" : isGameLost ? "lost" : isLastGuessIncorrect ? "farewell" : ""}`} aria-live="polite" role="status">
            {renderGameStatus()}
          </section>
          <section className="language-chips">
            {languageElements}
          </section>
          <section className="word">
            {letterElements}
          </section>
          <section className="sr-only" aria-live="polite" role="status" >
            <p>
              {word.includes(lastGuessedLetter) ? 
                  `Correct! The letter ${lastGuessedLetter} is in the word.` : 
                  `Sorry, the letter ${lastGuessedLetter} is not in the word.`
              }
              You have {word.length - wrongGuessCount} attempts left.
            </p>
            <p>Current word: 
            {word.split("").map(letter => 
            Array.from(guessedLetters).includes(letter) ? letter + "." : "blank.")
            .join(" ")}
            </p>
            
            </section>
          <section className="keyboard">
            {keyboardElements}
          </section>
          {isGameLost ? <button className="new-game">New Game</button> : null}
      </main>
  )
}