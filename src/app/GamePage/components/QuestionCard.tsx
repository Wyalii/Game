"use client";
import { useEffect } from "react";
export default function QuestionCard() {
  async function FetchQuestions() {
    const request = await fetch("/api/questions/GetQuestions", {
      method: "GET",
    });
    const response = await request.json();
    console.log(response);
  }
  useEffect(() => {
    FetchQuestions();
  }, []);
  return (
    <div className="bg-white h-[400px] w-[400px] flex flex-col items-center justify-center rounded gap-7">
      <div className="flex flex-col items-center justify-center">
        <h1>Question:</h1>
        <p>2 + 2 equals??</p>
      </div>
      <input
        className="bg-slate-600 rounded text-center p-3"
        placeholder="write your anwser here"
      ></input>
      <div className="flex items-center justify-center gap-6">
        <button className="bg-green-600 rounded p-3 text-white">Submit</button>
        <button className="bg-blue-600 rounded p-3 text-white">
          Next Question
        </button>
      </div>
    </div>
  );
}
