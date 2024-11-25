import { NextRequest,NextResponse } from "next/server";
import { GetDbConnection } from "@/db/db";
import sql from "mssql"
import { error } from "console";

export async function POST(req:NextRequest) {
    try {
      const body = await req.json()
      const {email,password} = body

      if(!email || !password)
      {
        return NextResponse.json({error:"Email and password is required"},{status:400})
      }

      const db = await GetDbConnection()
      
      const query = `INSERT INTO users (email, pass) VALUES(@email, @password)`
      const result = await db.request().input("email",sql.VarChar(255),email).input("password",sql.VarChar(255),password).query(query)

      return NextResponse.json({message:"user registered successfully"},{status:201})
    } catch (error) {
        console.error("Error details:", error); // Log the full error to the server console
        return NextResponse.json({ 
        message: "Error registering user", 
        error:error
    }, { status: 500 });
    }
}
