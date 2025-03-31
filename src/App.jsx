import { useState, useEffect } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";

const triviaQuestion = rawTriviaQuestion.results[0];
const triviaAPIURL = 'https://opentdb.com/api.php?amount=1&category=9&type=multiple';

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(triviaQuestion);

  const fetchNewQuestion = async () =>{
    try{
      const response = await fetch(triviaAPIURL);
      const json = await response.json();
      setQuestionData(json.results[0]);
    }catch(error){
      console.error ("Error fetching trivia question:", error);
    }
  };

  function handleNextButton(){
    fetchNewQuestion();
    setSelectedAnswer(null);
  }

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };
  
  let card;

  if (selectedAnswer) {
    card = (
      <ResultCard
        correct={selectedAnswer === questionData.correct_answer}
        answer={questionData.correct_answer}
      />
    );
  } else {
    let options = [
      questionData.correct_answer,
      ...questionData.incorrect_answers,
    ];
    card = (
      <QuestionCard
        question={questionData.question}
        options={shuffleArray(options)}
        selectAnswer={selectAnswer}
      />
    );
  }

  return (
    <div className="w-100 my-5 d-flex justify-content-center align-items-center">
      <div style={{ maxWidth: "45%" }}>
        <h1 className="text-center">Trivia App</h1>
        <button onClick = {handleNextButton} className="btn btn-success">Next Question</button>
        {card}
      </div>
    </div>
  );
}

export default App;
