import React from 'react'
import './style.css'

const About = () => {
  return (
    <div>

      <div className='fpl-about'>
        <h1>About fantasy premier league</h1>
        <div>

          <section>
            <h2 className='rules-headers'><u>How to play</u></h2>
            <h3>Building a squad</h3>
            <ul className='fpl-rules'>
              <li>Once you have signed up, FPL managers have a budget of £100.0m to spend on an initial squad of 15 players.</li>
              <li>A squad consists of two goalkeepers, five defenders, five midfielders and three forwards.</li>
              <li>A maximum of three players can be chosen from any one Premier League club.</li>
            </ul>
          </section>

          <section>
            <h3>Selecting your team</h3>
            <ul className='fpl-rules'>
              <li>Managers must choose a starting XI from their 15-man squad before each Gameweek deadline.</li>
              <li>Any formation can be chosen as long as the line-up includes one goalkeeper, at least three defenders, at least two midfielders and at least one forward.</li>
              <li>The deadline is always 90 minutes before the kick-off time of the first match of the Gameweek.</li>
            </ul>
          </section>

          <section>
            <h3>Scoring points</h3>
            <ul className='fpl-rules'>
              <li>Points are awarded to players for goals, assists, saves and clean sheets.</li>
              <li>Players can also earn additional bonus points if they are among the top performers in the Bonus Points System (BPS) in a match.</li>
              <li>A team's points for the Gameweek will be scored by their 11 starting players.</li>
              <li>But if a starting player does not feature for their club, the points scored by the first player on your bench will automatically be counted instead.</li>
              <li>The same process occurs if two or three starting players fail to appear for their teams.</li>
              <li>Managers should therefore rank their substitutes in order of preference, to ensure that their first-choice reserve player is first in line.</li>
              <li>Managers must choose a captain and a vice-captain for the Gameweek in their XI.</li>
              <li>A captain's score is doubled, but if the selected skipper does not play in the Gameweek then the vice-captain's score is doubled instead.</li>
            </ul>
          </section>

          <section>
            <h3>Making transfers</h3>
            <ul className='fpl-rules'>
              <li>After the first deadline of the season has passed, managers are given one free transfer for each Gameweek.</li>
              <li>This enables them to sign a player in exchange for a member of their 15-man squad, as long as the switch is within their budget.</li>
              <li>If managers want to make additional transfers in a Gameweek, they will lose four points for each one.</li>
              <li>If managers do not use their free transfer, they can carry it over and have two free transfers for the following Gameweek.</li>
              <li>However, they are unable to build up more than two free transfers.</li>
            </ul>
          </section>

          <section>
            <h3>Player prices</h3>
            <ul className='fpl-rules'>
              <li>Player prices change during the season depending on their popularity among all the managers in the game.</li>
              <li>Managers who own the player while his price is increasing will make a profit if they sell him at the higher price. However, they must pay a sell-on fee of 50 per cent, rounded down to the nearest £0.1m.</li>
            </ul>
          </section>
        </div>
      </div>


      <div className='model-about'>

        <h1>Our model</h1>
        <ul>
          <li>Reasoning behind model and aim</li>
          <li>Functionality</li>
          <li>Methodology about the model</li>
          <li>Button to view results</li>
        </ul>

      </div>

    </div>
  )
}

export default About
