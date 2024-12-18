import Database from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { questionId, email, answer, coins } = body;
    console.log(questionId, email, answer, coins);

    if (!questionId || !email || !answer || !coins) {
      return NextResponse.json(
        { error: "Must Provide all Details." },
        { status: 400 }
      );
    }

    // Find the question
    const FindQuestionQuery = `SELECT * FROM public."Questions" WHERE "id" = $1`;
    const FindQuestion = await Database(FindQuestionQuery, [questionId]);

    if (FindQuestion.length === 0) {
      return NextResponse.json(
        { error: "Couldn't find question in database." },
        { status: 404 }
      );
    }

    const question = FindQuestion[0];

    // Check if the provided answer is correct
    if (question.answer.toLowerCase() !== answer.toLowerCase()) {
      return NextResponse.json({ error: "Incorrect answer." }, { status: 400 });
    }

    // Find the user by email
    const FindUserByEmailQuery = `SELECT * FROM public."RegisteredUsers" WHERE "Email" = $1`;
    const FindUserByEmail = await Database(FindUserByEmailQuery, [email]);

    if (FindUserByEmail.length === 0) {
      return NextResponse.json(
        { error: "User could not be authenticated." },
        { status: 401 }
      );
    }

    const user = FindUserByEmail[0];
    console.log(user.coins);
    const updatedCoins = user.coins + coins;

    // Update user's coins
    const UpdateUserCoinsQuery = `
      UPDATE public."RegisteredUsers"
      SET "Coins" = $1
      WHERE "Email" = $2
      RETURNING "Coins";
    `;
    const updatedUser = await Database(UpdateUserCoinsQuery, [
      updatedCoins,
      email,
    ]);

    return NextResponse.json(
      {
        message: "Your answer was correct!",
        updatedCoins: updatedUser[0].coins,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
