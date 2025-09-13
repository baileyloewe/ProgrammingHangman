import { vi, describe, test, expect } from 'vitest'
import { render, screen} from '@testing-library/react'
import React from "react"
import App from './App.js'
import * as utils from '../utils/utils.js'


describe("App", () => {
    test("Displays app name", () => {
        render(<App />)
        expect(screen.getByText("Programming Hangman")).toBeInTheDocument()
    })

    test("Displays instructions", () => {
        render(<App />)
        expect(screen.getByText("Guess the word within 8 attempts to keep the programming world safe from Assembly!")).toBeInTheDocument()
    })

    test("Displays langauages", () => {
        render(<App />)
        expect(screen.getByText("HTML")).toBeInTheDocument()
        expect(screen.getByText("CSS")).toBeInTheDocument()
        expect(screen.getByText("JavaScript")).toBeInTheDocument()
        expect(screen.getByText("React")).toBeInTheDocument()
        expect(screen.getByText("TypeScript")).toBeInTheDocument()
        expect(screen.getByText("Node.js")).toBeInTheDocument()
        expect(screen.getByText("Python")).toBeInTheDocument()
        expect(screen.getByText("Ruby")).toBeInTheDocument()
        expect(screen.getByText("Assembly")).toBeInTheDocument()
    })

    test("Displays correct number of letters", () => {
        vi.spyOn(utils, 'getRandomWord').mockReturnValue('testing')
        render(<App />)
        const letterElements = screen.getAllByLabelText('letter')
        expect(letterElements).toHaveLength(7)
    })

    test("Displays full keyboard", () => {
        const { container } = render(<App />)
        const keyboardButtons = container.querySelectorAll('.key')
        expect(keyboardButtons).toHaveLength(26)
    })


})