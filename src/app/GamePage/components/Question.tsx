import { useEffect, useState } from "react";
type Question = {
  id: number;
  question: string;
  coin: number;
  answers: {
    real_answer: string;
    fake_answers: string[];
  };
};

export default function Question() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const fetchQuestions = async () => {
    const request = await fetch("/api/questions/GetQuestions");
    const response = await request.json();
    setQuestions(response);
    if (response.length > 0) {
      setCurrentQuestion(response[0]);
    }
    console.log(response);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const newIndex = prevIndex < questions.length - 1 ? prevIndex + 1 : 0;
      setCurrentQuestion(questions[newIndex]);
      return newIndex;
    });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-5">
      <div className="bg-yellow-400 p-5 rounded">
        <h1 className="text-5xl">Question: {currentQuestion?.question}</h1>
      </div>
      <div className="w-11/12 grid grid-cols-2 grid-rows-2 gap-3">
        {currentQuestion?.answers.fake_answers.map((FakeAnswer, index) => (
          <div key={index}>
            <input
              type="text"
              value={FakeAnswer || ""}
              readOnly
              className="w-full p-2 border rounded cursor-pointer"
            />
          </div>
        ))}

        <input
          type="text"
          value={currentQuestion?.answers.real_answer || ""}
          readOnly
          className="w-full p-2 border rounded cursor-pointer"
        />
      </div>
      <div>
        <button
          onClick={() => nextQuestion()}
          className="bg-black p-3 text-white rounded"
        >
          Next Question
        </button>
      </div>
    </div>
  );
}
