import { default as PlayerCard } from '.';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe("PlayerCard", () => {
    beforeEach(() => {
        
        render(<PlayerCard name='Lewis Dunk' points='12' code='83299' />, { wrapper: MemoryRouter })
    })

    test("It renders player card", () => {
        const playerName = screen.getByRole('playerName')
        expect(playerName.textContent).toBe(' Lewis Dunk')
    })
    test("It renders player image", () => {
        const img = screen.getByRole('img')
        expect(img.src).toBe('https://resources.premierleague.com/premierleague/photos/players/110x140/p83299.png')
    })
    test("It renders player card", () => {
        const playerPoints = screen.getByRole('playerPoints')
        expect(playerPoints.textContent).toBe('points:12')
    })
})
