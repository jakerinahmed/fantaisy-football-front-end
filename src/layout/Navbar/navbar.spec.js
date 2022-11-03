import { default as Navbar } from '.';
import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';



describe('Navbar', () => {
    beforeEach(() => {
        render(<Navbar />, { wrapper: MemoryRouter })
    });
    
    test('it renders the navbar', () => {
        const navbar = screen.getAllByRole('nav')
        expect(navbar).toBeTruthy();
    });

});
