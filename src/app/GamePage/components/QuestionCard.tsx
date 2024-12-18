"use client";
import { useEffect, useState } from "react";
import GetUserEmail from "@/app/lib/GetUserEmail";
export default function QuestionCard() {
  type Question = {
    id: number;
    question: string;
    coin: number;
    answer: string;
  };
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [UserAnswer, SetUserAnswer] = useState("");

  useEffect(() => {
    const userEmail = GetUserEmail();
    setEmail(userEmail || "");
  }, []);

  async function FetchQuestions() {
    const request = await fetch("/api/questions/GetQuestions", {
      method: "GET",
    });
    const response = await request.json();
    setQuestions(response);
    console.log(response);
  }

  useEffect(() => {
    FetchQuestions();
  }, []);

  function handleNextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }

  async function SubmitQuestion() {
    const currentQuestion = questions[currentIndex];
    console.log(
      currentQuestion.coin,
      currentQuestion.id,
      currentQuestion.answer
    );
    const request = await fetch("/api/questions/SubmitQuestion", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        answer: UserAnswer,
        questionId: currentQuestion.id,
        coins: currentQuestion.coin,
      }),
    });
    const response = await request.json();
    console.log(request);
  }
  return (
    <div className="bg-white h-[400px] w-[400px] flex flex-col items-center justify-center rounded gap-7">
      <div className="flex flex-col items-center justify-center">
        <h1>Question:</h1>
        <p>
          {questions.length > 0
            ? questions[currentIndex].question
            : "Loading question..."}
        </p>
      </div>
      <input
        className="bg-slate-600 rounded text-center p-3"
        placeholder="write your anwser here"
        onChange={(e) => SetUserAnswer(e.target.value)}
      ></input>
      <div className="flex items-center justify-center gap-6">
        <button
          className="bg-green-600 rounded p-3 text-white"
          onClick={() => SubmitQuestion()}
        >
          Submit
        </button>
        <button
          className="bg-blue-600 rounded p-3 text-white"
          onClick={() => handleNextQuestion()}
        >
          Next Question
        </button>
      </div>
    </div>
  );
}
