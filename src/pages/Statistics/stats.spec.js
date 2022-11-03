import { default as Statistics } from '.';
import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';



describe('Statistics', () => {
    beforeEach(() => {
        render(<Statistics />, { wrapper: MemoryRouter })
    });
    
    test('it renders two drop down menus', () => {
        
        const dropDowns = screen.getAllByRole('combobox')
        expect(dropDowns.length).toBe(2);
    });
    test('it renders a button that displays add second player', () => {
        
        const buttons = screen.getAllByRole('button')
        expect(buttons[0].textContent).toContain('Add second player')
        expect(buttons[1].textContent).toContain('Compare to the rest of the league')
        expect(buttons.length).toBe(2)
    });
    test('it renders the all the teams in options', () => {
        
        const options = screen.getAllByRole('option')
        options.pop()
        expect(options.length).toBe(21)
        expect(options[0].textContent).toContain('Arsenal')
        expect(options[1].textContent).toContain('Aston Villa')
        expect(options[2].textContent).toContain('Bournemouth')
        expect(options[3].textContent).toContain('Brentford')
        expect(options[4].textContent).toContain('Brighton & Hove Albion')
        expect(options[5].textContent).toContain('Chelsea')
        expect(options[6].textContent).toContain('Crystal Palace')
        expect(options[7].textContent).toContain('Everton')
        expect(options[8].textContent).toContain('Fulham')
        expect(options[9].textContent).toContain('Leicester City')
        expect(options[10].textContent).toContain('Leeds United')
        expect(options[11].textContent).toContain('Liverpool')
        expect(options[12].textContent).toContain('Manchester City')
        expect(options[13].textContent).toContain('Manchester United')
        expect(options[14].textContent).toContain('Newcastle United')
        expect(options[15].textContent).toContain('Nottingham Forest')
        expect(options[16].textContent).toContain('Southampton')
        expect(options[17].textContent).toContain('Tottenham Hotspur')
        expect(options[18].textContent).toContain('West Ham United')
        expect(options[19].textContent).toContain('Wolverhampton Wanderers')
       
    });

    
    



});
