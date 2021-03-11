import React, { useEffect, useState } from 'react';

const Scores = () => {
    const date = "2021-03-9"


    const [scores, setScores] = useState([]);
    const [salami, setSalami] = useState([]);

    const getScores = async () => {
        try {

            const response = await fetch("https://statsapi.web.nhl.com/api/v1/schedule");//?date=" + date);
            const jsonData = await response.json();
            var games = jsonData.dates[0].games;
            
            setScores(games);

            var homeScore = 0;
            var awayScore = 0;

            for (var i = 0; i < games.length; i++){

                homeScore += games[i].teams.home.score;

                awayScore += games[i].teams.away.score;
            }


            setSalami([homeScore, awayScore])

            
        } catch (err){

        }
    }


    useEffect(() => {
        getScores();
    }, [])


    let scoresToRender;
    if (scores) {
      scoresToRender = scores.map(score => {
        return <div class="score">
        <h1><img src={"https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/" + score.teams.home.team.id + ".svg"} alt={score.teams.home.team.name} class="teamLogo"></img> {score.teams.home.score}</h1><br></br>
        <h1><img src={"https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/" + score.teams.away.team.id + ".svg"} alt={score.teams.away.team.name} class="teamLogo"></img> {score.teams.away.score}</h1>
        </div>
      });
    }
  
    return (
    <>
    <div class="score">
        <h1>Home: {salami[0]}</h1>
        <h1>Away: {salami[1]}</h1>
        </div>
    <div class="scores">{scoresToRender}</div>
    </>);
}

export default Scores;