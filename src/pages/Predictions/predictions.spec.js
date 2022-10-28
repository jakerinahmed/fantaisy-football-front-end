import { default as Predictions } from '.';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';



describe('About', () => {
    beforeEach(() => {
        render(<Predictions />, { wrapper: MemoryRouter })
    });

    test('it renders the dream team', () => {
        const dreamTeam = screen.getAllByRole('dream-team')
        expect(dreamTeam).toBeTruthy()
    });
    
    test('it renders the filters', () => {
        const teamFilter = screen.getAllByRole('team')
        const positionFilter = screen.getAllByRole('position')
        expect(teamFilter).toBeTruthy()
        expect(positionFilter).toBeTruthy()
    });

    test('it renders the stats table', () => {
        const table = screen.getAllByRole('table')
        expect(table).toBeTruthy;
    });



});
