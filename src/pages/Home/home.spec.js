import { default as Home } from '.';
import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';



describe('Home', () => {
    beforeEach(() => {
        render(<Home />, { wrapper: MemoryRouter })
    });
    
    test('it renders the title', () => {
        
        
        const heading = screen.getByRole('welcome')
        expect(heading.textContent).toContain("Welcome to fantAIsy football!");
    });
    test('there are two buttons on the home page', () => {
        
      
        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBe(2);
    });
    test('there are two buttons on the home page', () => {

        const button = screen.getByText('View analysis')
        expect(button.href).toContain("/recommendations");
    });



});