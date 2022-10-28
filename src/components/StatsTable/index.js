import React from 'react'
import './style.css'

const StatsTable = () => {
    return (
        <div>

            <div className='filters'>

                <div role='team'>
                    <label className='filter-padding' for="team">Team</label>
                    <select name="team" id="team">
                        <option value="Arsenal">Arsenal FC</option>
                        <option value="Aston Villa">Aston Villa FC</option>
                        <option value="Bournemouth">AFC Bournemouth</option>
                        <option value="Brentford">Brentford FC</option>
                    </select>
                </div>

                <div role='position'>
                    <label className='filter-padding' for="position">Position</label>
                    <select name="position" id="position">
                        <option value="GK">GK</option>
                        <option value="DF">DF</option>
                        <option value="MF">MF</option>
                        <option value="FW">FW</option>
                    </select>
                </div>

            </div>

            <table className='sortable'>
                <tr>
                    <th>Player</th>
                    <th>Team</th>
                    <th>Position</th>
                    <th>Predicted points</th>
                    <th>Cost</th>
                </tr>
                <tr>
                    <td>Mason Mount</td>
                    <td>Chelsea FC</td>
                    <td>MF</td>
                    <td>4</td>
                    <td>£8.0m</td>
                </tr>
                <tr>
                    <td>Lisandro Martinez</td>
                    <td>Manchester United FC</td>
                    <td>DF</td>
                    <td>6</td>
                    <td>£5.0m</td>
                </tr>
            </table>


        </div>
    )
}

export default StatsTable
