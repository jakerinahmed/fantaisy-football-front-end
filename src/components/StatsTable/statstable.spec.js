import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { default as StatsTable } from '.'

describe('StatsTable', () => {
    beforeEach(() => {
        render(
            <Router>
                <StatsTable allData={allData}/>
            </Router>
        )
    })

    test('renders the filters', () => {
        let filters = screen.getByRole("filters")
        expect(filters).toBeTruthy
    })

    test('renders team filter', () => {
        let teamFilter = screen.getByRole("team")
        expect(teamFilter).toBeTruthy()
    })

    test('it renders the all the teams in options', () => {
        const options = screen.getAllByRole('option')
        options.pop()
        expect(options.length).toBe(21)
        expect(options[0].textContent).toContain('jsdhjshjdh')
        expect(options[1].textContent).toContain('Arsenal')
        expect(options[2].textContent).toContain('Aston Villa')
        expect(options[3].textContent).toContain('Bournemouth')
        expect(options[4].textContent).toContain('Brentford')
        expect(options[5].textContent).toContain('Brighton & Hove Albion')
        expect(options[6].textContent).toContain('Chelsea')
        expect(options[7].textContent).toContain('Crystal Palace')
        expect(options[8].textContent).toContain('Everton')
        expect(options[9].textContent).toContain('Fulham')
        expect(options[10].textContent).toContain('Leicester City')
        expect(options[11].textContent).toContain('Leeds United')
        expect(options[12].textContent).toContain('Liverpool')
        expect(options[13].textContent).toContain('Manchester City')
        expect(options[14].textContent).toContain('Manchester United')
        expect(options[15].textContent).toContain('Newcastle United')
        expect(options[16].textContent).toContain('Nottingham Forest')
        expect(options[17].textContent).toContain('Southampton')
        expect(options[18].textContent).toContain('Tottenham Hotspur')
        expect(options[19].textContent).toContain('West Ham United')
        expect(options[20].textContent).toContain('Wolverhampton Wanderers')
       
    });
})
