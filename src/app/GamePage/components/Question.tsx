import { useEffect, useState, useCallback } from "react";
import { useContext } from "react";
import { UserContext } from "@/app/lib/UserContext";
import { toast } from "react-toastify";
import Image from "next/image";
type Question = {
  id: number;
  question: string;
  coin: number;
  answers: {
    real_answer: string;
    fake_answers: string[];
    gif: string;
    gif_wrong_answer: string;
  };
};

export default function Question() {
  const context = useContext(UserContext);

  const { email, setCoins } = context;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);
  const [gif, setGif] = useState<string | undefined>(undefined);

  const fetchQuestions = useCallback(async () => {
    const request = await fetch("/api/questions/GetQuestions", {
      method: "POST",
      body: JSON.stringify({ email: email }),
    });

    const response = await request.json();
    if (response.length > 0) {
      setQuestions(response);
      setCurrentQuestion(response[0]);
      shuffleAnswers(response[0]);
      if (response[0].answers.gif) {
        setGif(response[0].answers.gif);
      }
    }
  }, [email]);

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
      if (questions[newIndex].answers.gif) {
        setGif(questions[newIndex].answers.gif);
      } else {
        setGif(undefined);
      }
      return newIndex;
    });
  };

  async function SubmitAnswer() {
    console.log(currentQuestionIndex);
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
      toast.success(response.message);
      setFetchTrigger(true);
      setGif(undefined);
    } else {
      toast.error(response.error);
      setGif(currentQuestion?.answers.gif_wrong_answer);
    }
  }

  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        await fetchQuestions();
        setFetchTrigger(false);
      };
      fetchData();
    }
  }, [email, fetchQuestions]);

  useEffect(() => {
    if (fetchTrigger) {
      const fetchData = async () => {
        await fetchQuestions();
        setFetchTrigger(false);
      };
      fetchData();
    }
  }, [fetchTrigger, fetchQuestions]);

  if (!context) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full max-w-[800px] h-full flex items-center justify-center flex-col gap-5">
      {gif ? (
        <Image
          src={gif}
          alt="gif"
          height={300}
          width={300}
          className="rounded"
        ></Image>
      ) : null}
      <div className="bg-yellow-400 p-5 rounded w-2/4 md:w-full">
        <h1 className=" text-xl text-center md:text-5xl">
          Question: {currentQuestion?.question}
        </h1>
      </div>
      <div className="w-11/12 flex flex-col  md:grid md:grid-cols-2 md:grid-rows-2 gap-3">
        {shuffledAnswers.length > 0 ? (
          <>
            {shuffledAnswers.map((answer, index) => (
              <div key={index} className="w-full max-w-[800px]">
                <input
                  type="text"
                  value={answer}
                  readOnly
                  className="w-full text-wrap p-2 rounded cursor-pointer focus:outline-none focus:bg-blue-300 hover:bg-slate-500 hover:text-white transition-colors duration-300"
                  onClick={() => setSelectedAnswer(answer)}
                />
                {}
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
