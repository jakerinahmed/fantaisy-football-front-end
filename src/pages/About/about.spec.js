import { default as About } from '.';
import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';



describe('About', () => {
    beforeEach(() => {
        render(<About />, { wrapper: MemoryRouter })
    });
    
    test('it renders the about header fpl', () => {
        
        const heading = screen.getAllByRole('heading')
        expect(heading[0].textContent).toContain("About fantasy premier league");
    });
    test('it renders the about header model', () => {
        
        const heading = screen.getAllByRole('heading')
        expect(heading[1].textContent).toContain("How to play");
    });



});
