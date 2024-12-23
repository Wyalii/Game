import { useEffect, useState } from "react";
import { useContext } from "react";
import { User } from "../page";
import { toast } from "react-toastify";
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
  const context = useContext(User);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { Coins, email, setCoins } = context;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const fetchQuestions = async () => {
    const request = await fetch("/api/questions/GetQuestions");
    const response = await request.json();
    setQuestions(response);
    if (response.length > 0) {
      setCurrentQuestion(response[0]);
      shuffleAnswers(response[0]);
    }
    console.log(response);
  };

  const shuffleAnswers = (question: Question) => {
    const allAnswers = [
      question.answers.real_answer,
      ...question.answers.fake_answers,
    ];
    // Fisher-Yates shuffle
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    setShuffledAnswers(allAnswers);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const newIndex = prevIndex < questions.length - 1 ? prevIndex + 1 : 0;
      setCurrentQuestion(questions[newIndex]);
      shuffleAnswers(questions[newIndex]);
      return newIndex;
    });
  };

  async function SubmitAnswer() {
    const body = {
      questionId: currentQuestion?.id,
      email: email,
      answer: selectedAnswer,
      coins: currentQuestion?.coin,
    };
    const request = await fetch("/api/questions/SubmitQuestion", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const response = await request.json();
    if (request.ok) {
      setCoins(response.updatedCoins);
      nextQuestion();
      toast.success(response.message);
    } else {
      toast.error(response.error);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-5">
      <div className="bg-yellow-400 p-5 rounded">
        <h1 className="text-5xl">Question: {currentQuestion?.question}</h1>
      </div>
      <div className="w-11/12 grid grid-cols-2 grid-rows-2 gap-3">
        {shuffledAnswers.length > 0 ? (
          <>
            {shuffledAnswers.map((answer, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={answer}
                  readOnly
                  className="w-full p-2 rounded cursor-pointer focus:outline-none focus:bg-blue-300 hover:bg-slate-500 hover:text-white transition-colors duration-300"
                  onClick={() => setSelectedAnswer(answer)}
                />
              </div>
            ))}
          </>
        ) : (
          <div className="col-span-2 row-span-2 text-center">Loading...</div>
        )}
      </div>
      <div className="flex w-full items-center justify-center gap-6">
        <button
          className="bg-green-600 p-3 rounded text-white"
          onClick={() => SubmitAnswer()}
        >
          Submit
        </button>
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
