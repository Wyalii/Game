import Database from "@/db/db";
import { NextResponse, NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;
    const unansweredQuestionsQuery = `
    SELECT q.*
    FROM public."Questions" q
    WHERE q.id NOT IN (
      SELECT aq.answered_question_id
      FROM public."AnsweredQuestions" aq
      WHERE aq.user_email = $1
    )
  `;
    const result = await Database(unansweredQuestionsQuery, [email]);
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
