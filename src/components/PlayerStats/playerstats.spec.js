import { default as PlayerStats } from '.';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe("PlayerStats", () => {
    beforeEach(() => {
        
        render(<PlayerStats  />, { wrapper: MemoryRouter })
    })

    test("It renders", () => {
        const playerStatsDiv = screen.getAllByRole('playerStats')
        expect(playerStatsDiv).toBeTruthy()
    })
})
