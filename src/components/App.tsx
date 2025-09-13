import { languages, type Language} from "../data/languages.js"
import { useState } from 'react'
import * as React from "react"
import { nanoid } from "nanoid"
import { getFarewellText, getRandomWord } from "../utils/utils.js"


export default function Hangman() {

  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(() => new Set())
  const [word, setWord] = useState<string>(() => getRandomWord())
  const alphabet: string = "abcdefghijklmnopqrstuvwxyz"
  const wrongGuessCount: number = [...guessedLetters].reduce((acc, letter) => !word.includes(letter) ? acc + 1 : acc, 0)
  const isGameWon: boolean = word.split("").every(letter => guessedLetters.has(letter))
  const isGameLost: boolean = wrongGuessCount === languages.length - 1
  const isGameOver: boolean = isGameWon || isGameLost
  const lastGuessedLetter: string = Array.from(guessedLetters).pop() || ""
    const isLastGuessIncorrect: boolean =  Array.from(guessedLetters)[0] !== undefined ? !word.includes(Array.from(guessedLetters).pop() || "") : false


  const languageElements = languages.map((lang: Language, index: number) => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    return <span className={`language-chip ${index < wrongGuessCount ? "lost" : ""}`} key={lang.name} style={styles}>{lang.name}</span>
  })

  const letterElements = word.split('').map(letter => (
    <span aria-label="letter" className={`letter ${isGameOver && !guessedLetters.has(letter) ? "wrong" : ""}`} key={nanoid()}>{guessedLetters.has(letter) || isGameOver ? letter.toUpperCase() : ""}</span>)
  )

  const keyboardElements = alphabet.split('').map(letter => {
    const isGuessed = guessedLetters.has(letter)
    const inWord = word.includes(letter)
    const correctStatus = 
        isGuessed && inWord ? "correct" :
        isGuessed && !inWord ? "incorrect" :
        isGameOver ? "disabled" : ""
    const disabled = isGameOver ? "disabled" : ""
    return <button key={letter} disabled={isGameOver} aria-label={`Letter: ${letter}`} aria-disabled={Array.from(guessedLetters).includes(letter)} className={`key ${correctStatus} ${disabled}`} onClick={() => addGuessedLetter(letter)}>{letter.toUpperCase()}</button>
  })

  function addGuessedLetter(letter: string) {
    if (!isGameOver)
    setGuessedLetters(prevLetters => new Set(prevLetters).add(letter))

  }

  function renderGameStatus() {
  const lang = languages[wrongGuessCount - 1]
  if (lang && !isGameOver && isLastGuessIncorrect && wrongGuessCount > 0) {
    return <h2>{getFarewellText(lang.name)}</h2>
  }
    if (isGameWon) { return <><h2>You win!</h2><p>Well done! 🎉</p></> }
    else if (isGameLost) { return <><h2>Game Over!</h2><p>You lose! Better start learning Assembly!</p></> }
    else { return <><h2></h2><p></p></> }
  }

  function resetGame() {
    setWord(getRandomWord())
    setGuessedLetters(new Set([]))
  }

  return (
      <main>
          <header>
            <h1>Programming Hangman</h1>
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
          <section className="sr-only" aria-live="polite" role="status">
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
          {isGameOver ? <button onClick={() => resetGame()} className="new-game">New Game</button> : null}
      </main>
  )
}