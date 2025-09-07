import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '/src/components/App.jsx'

test("Ensures sr-only content is available", () => {
    render(<App />)
    expect(screen.getAllByRole('status')[1]).toBeInTheDocument()
})