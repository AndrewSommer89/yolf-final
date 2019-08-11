import React from 'react';
import Card from "react-bootstrap/Card"
import "./HandicapCalculation.css"

const HandicapCalculation = (props) => {
    let scores = props.scores;

    

///SCORES ----- SCORES ---- SCORES --- SCORES
    //get all round scores to display in card
    const roundScores = scores.reverse().map(score => {
        return score.totalScore;
    })

    let score = roundScores[0]

    //get all round scores to display in card
    function allScoresDisplay(){
        let allScores = [];
        for(let i = 0; i < roundScores.length; i++){
            allScores.push(<li>{roundScores[i]} -</li>)
        }
        return allScores;
    }


    //get last 20 rounds to display in card
    function last20ScoresDsiplay(){
        let last20Scores = []
        for(let i = 0; i < 20; i++){
            last20Scores.push(<li>{roundScores[i]} -</li>)
        }
        return last20Scores;
    }

    //if player has more than 20 rounds display last 20 else display all rounds
    function displayScores(){
        if(scores.length > 20){
            return last20ScoresDsiplay();
        } else {
            return allScoresDisplay()
        }
    }


//HANDICAP ----- HANDICAP ----- HANDICAP ---- HANDICAP
    //get all handicap scores in reverse order so that most recent score is first
    const handicapScores = scores.map(score => {
        return score.handicapScore
            
    })

    let handicapScore = handicapScores[0]

    //get last 20 handicap scores
    function last20HandicapScores(){
        let handicap20Scores = [];
        for(let i = 0; i < 10; i++){
            handicap20Scores.push(handicapScores[i])
        }
        return handicap20Scores;
    }

    //sort last20HandicapScores so that lowest score is first
    let sortedHandicapScores = last20HandicapScores().sort(function(a,b){return b-a});

    //get top 10 of last 20 scores
    function handicapScoresForIndex(){
        let scoresForIndex = [];
        for(let i = 0; i < 9; i++){
            scoresForIndex.push(sortedHandicapScores[i])
        }
        return scoresForIndex;
    }

    let scoresForIndex = handicapScoresForIndex();

    //get player's hanidcap 
    function getHandicap(){
        //variable to store sum of scores
        let total = 0;
        //variable to store how many rounds
        let rounds;
        //set rounds to 10 unless player has less than 10 rounds
        if(scoresForIndex.length < 10){
            rounds = scoresForIndex.length
        } else {
            rounds = 10
        }
        //add score to totaL
        for(let i =0; i < rounds; i++){
            total = total + scoresForIndex[i]
        }
        //return sum of all scores by the number of rounds - display number with 2 decimals
        return (total/rounds).toFixed(2);
    }

    return (
        <div className="handicapDiv" >
            <p>{handicapScore}</p>
            <p>{score}</p>
            <Card className="text-center"  border="success" style={{ width: '600px' }}>
                <Card.Header> Handicap </Card.Header>
                <Card.Body>
                    <Card.Title className="cardTitle">{getHandicap()}</Card.Title>
                    <Card.Text>{displayScores()}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
export default HandicapCalculation;
