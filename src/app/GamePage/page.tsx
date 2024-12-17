"use client";
import GameHeader from "./components/GameHeader";
import QuestionCard from "./components/QuestionCard";
export default function GamePage() {
  return (
    <div className="bg-fuchsia-900 h-full w-full flex flex-col gap-4 items-center">
      <GameHeader />
      <QuestionCard />
    </div>
  );
}
