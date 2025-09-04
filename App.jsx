export default function Hangman() {
    return (
        <>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world
                safe from Assembly!</p>
            </header>
            <main>
                Game goes here
            </main>
        </>
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