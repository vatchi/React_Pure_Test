﻿import React, { Component } from 'react';
import './Quiz.css';

/*
Game criterias:
- Number of correct answer streak should be shown.
- There should be a limited time to answer a question.
- The difficulty should be increased after a certain number of correct answers.
- The player can answer incorrectly a certain number of times.

Optionals:
- There should be a game menu where you can choose difficulty and category.
*/

let decodeString = function (encodedString) {
    var parser = new DOMParser();
    var dom = parser.parseFromString(
        '<!doctype html><body>' + encodedString,
        'text/html');
    var decodedString = dom.body.textContent;

    return decodedString;
}


let shuffleAnswers = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


const AnswerAlternatives = (props) => {

    let answerAlternatives;

    if (props.showGameDialog) {
        answerAlternatives = 
            <div className="col-md-12 alternatives">
                {props.shuffledAnswers.map(function (item, index) {
                    return <div className="col-md-6 col-xs-12 questions-container" key={index}><p className="alternative">{item}</p></div>;
                })}
            </div>
    }
    else {
        answerAlternatives = 
            <div className="col-md-12 alternatives" onClick={props.checkAnswer.bind(this)}>
                {props.shuffledAnswers.map(function (item, index) {
                    return <div className="col-md-6 col-xs-12 questions-container" key={index}><p className="alternative">{item}</p></div>;
                })}
            </div>
    }

    return (
        <div>
            {answerAlternatives}
        </div>
    );
}

const GameDialog = (props) => {
    let gameDialog;
    if (props.showGameDialog) {
        gameDialog =
            <div className="col-md-12 nextQuestionContainer">
                <button className="btn btn-success nextQuestion" onClick={props.fetchNewQuestion}>Next question &raquo;</button>
            </div>
    }
    else {
        gameDialog = null;
    }
    return (
        <div>
            {gameDialog}
        </div>
    );
}


const questionApiUrl = 'https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple';
class FetchQuestion extends Component {
    constructor() {
        super();
        this.state = {
            question: '',
            incorrectAnswers: [],
            correctAnswer: '',
            category: '',
            shuffledAnswers: [],
            numberOfCorrectAnswers: 0,
            numberOfWrongAnswers: 5,
            answerIsCorrect: false,
            showGameDialog: false,
            gameOver: false,
        }
    }

    fetchNewQuestion = () => {

        this.setState({
            showGameDialog: false,
        })

        let correctAnswer = document.getElementsByClassName("correctAnswer");
        let wrongAnswers = document.getElementsByClassName("wrongAnswer");

        if (correctAnswer.length !== 0) {
            correctAnswer[0].className = correctAnswer[0].className.replace(/\b correctAnswer\b/g, "");
        }

        while (wrongAnswers.length !== 0) {
            wrongAnswers[0].className = wrongAnswers[0].className.replace(/\b wrongAnswer\b/g, "");
            wrongAnswers = document.getElementsByClassName("wrongAnswer");
        }


        fetch(questionApiUrl)
            .then((response) => response.json())
            .then((result) => {

                let question = result.results[0].question;
                question = decodeString(question);

                let incorrectAnswer = result.results[0].incorrect_answers;
                incorrectAnswer.forEach(function (item, index) {
                    console.log(incorrectAnswer[index]);
                    incorrectAnswer[index] = decodeString(incorrectAnswer[index]);
                    console.log(incorrectAnswer[index]);
                })

                let correctAnswer = result.results[0].correct_answer;
                correctAnswer = decodeString(correctAnswer);

                let category = result.results[0].category;
                category = decodeString(category);

                let allAnswerAlternativesArray = [];

                incorrectAnswer.forEach(function (element) {
                    allAnswerAlternativesArray.push(element);
                });

                allAnswerAlternativesArray.push(correctAnswer);

                let shuffledAllAlternativesArray = shuffleAnswers(allAnswerAlternativesArray);

                this.setState({
                    question: question,
                    incorrectAnswers: incorrectAnswer,
                    correctAnswer: correctAnswer,
                    category: category,
                    shuffledAnswers: shuffledAllAlternativesArray,
                })
            })
    }

    componentDidMount() {

        this.fetchNewQuestion();
    }


    checkAnswer = (event) => {
        let userAnswer = event.target.textContent;

        //Check that clicks arent outside of alternatives
        if (event.target.className === "alternative") {

            //Disable clicks if the click on wrongAnswer again
            if (event.target.className !== "alternative wrongAnswer") {
                if (userAnswer === this.state.correctAnswer) {

                    event.target.className += " correctAnswer";
                    this.setState({
                        numberOfCorrectAnswers: this.state.numberOfCorrectAnswers + 1,
                        answerIsCorrect: true,
                        showGameDialog: true,
                    })
                }
                else {
                    event.target.className += " wrongAnswer";
                    if (this.state.numberOfWrongAnswers === 0) {
                        this.setState({
                            gameOver: true,
                        })
                    }
                    this.setState({
                        numberOfWrongAnswers: this.state.numberOfWrongAnswers - 1,
                        answerIsCorrect: false,
                        showGameDialog: false,
                    })
                }
            }
        }
    }


    resetGame = () => {
        this.setState({
            question: '',
            category: '',
            shuffledAnswers: [],
            numberOfCorrectAnswers: 0,
            numberOfWrongAnswers: 5,
            showGameDialog: false,
            gameOver: false,
        })
        this.fetchNewQuestion();
    }


    render() {
        return (
            <div>
                {this.state.gameOver ?
                    <div className="tryAgainContainer">
                        <h2>Game Over!</h2>
                        <button className="btn btn-primary tryAgain" onClick={this.resetGame}>Try again &raquo;</button>
                    </div>
                    : 
                    <div>
                        <h2>{this.state.question}</h2>
                        <h3>Category: {this.state.category}</h3>
                        <div className="gameStatus">
                            <h4 className="col-md-5 col-md-offset-1">Number of tries left: {this.state.numberOfWrongAnswers}</h4>
                            <h4 className="col-md-5 col-md-offset-1">Number of correct answers: {this.state.numberOfCorrectAnswers}</h4>
                        </div>
                        <AnswerAlternatives checkAnswer={this.checkAnswer}
                            shuffledAnswers={this.state.shuffledAnswers}
                            showGameDialog={this.state.showGameDialog}
                            gameOver={this.state.gameOver} />
                        <GameDialog showGameDialog={this.state.showGameDialog}
                            fetchNewQuestion={this.fetchNewQuestion} />
                        </div>
                     }
            </div>
        );
    }
}

class GameArea extends Component {

    render() {
        return (
            <div className="container">
                <h1>Take the Quiz and see how far you can go!</h1>
                <hr />
                <FetchQuestion />
            </div>
        );
    }
}


export class Quiz extends Component {
    render() {
        return (
            <div>
                <GameArea />
            </div>
        );
    }
}