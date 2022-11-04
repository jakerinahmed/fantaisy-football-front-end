import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { userEvent } from '@testing-library/user-event'
import userEvent  from '@testing-library/user-event';
import { default as StatsTable } from '.'

describe('StatsTable', () => {
    beforeEach(() => {
        const allData=[{"name": "Erling Haaland", "team": "Manchester City F.C.", "position": "FW", "predicted_points": 13, "cost": 12.8}]
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
        expect(options.length).toBe(29)
        expect(options[0].textContent).toContain('All')
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
        expect(options[21].textContent).toContain('Any')
        expect(options[22].textContent).toContain('GK')
        expect(options[23].textContent).toContain('DF')
        expect(options[24].textContent).toContain('MF')
        expect(options[25].textContent).toContain('FW')
        expect(options[26].textContent).toContain('Predicted Points')
        expect(options[27].textContent).toContain('Cost')
        expect(options[28].textContent).toContain('PP per Cost')
    });

    test("hello", () => {
        userEvent.selectOptions(screen.getByRole("teamDropdown"),['All'])
        
        userEvent.selectOptions(screen.getByRole("positions"),['Any'])
        userEvent.selectOptions(screen.getByRole("tablefilter"),['PP'])
        const table = screen.getAllByRole("columnheader")
        // fireEvent.click(screen.getByText("All"))
        // fireEvent.click(screen.getByText("Manchester United"))
        expect(screen.getByRole('option', {name: 'All'}).selected).toBe(true)
        expect(screen.getByRole('option', {name: 'Any'}).selected).toBe(true)
        expect(screen.getByRole('option', {name: 'Arsenal'}).selected).toBe(false)
        expect(screen.getByRole('option', {name: 'Aston Villa'}).selected).toBe(false)
        expect(screen.getByRole('option', {name: 'Bournemouth'}).selected).toBe(false)
        expect(screen.getByRole('option', {name: 'Brentford'}).selected).toBe(false)
        expect(table.length).toBe(6)


    })
})
