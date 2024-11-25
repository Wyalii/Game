import { NextRequest,NextResponse } from "next/server";
import { GetDbConnection } from "@/db/db";
import sql from "mssql"


export async function POST(req:NextRequest){
    try {
      const body = await req.json()
      const {email,password} = body;

      if(!email || !password)
      {
        return NextResponse.json({error:"Email and Password is required"},{status:400})
      }

      const db = await GetDbConnection()
      
      const query = `SELECT * FROM users WHERE email = @email AND pass = @password`;
      const result = await db.request().input("email",sql.VarChar(255),email).input("password",sql.VarChar(255),password).query(query)

      if(result.recordset.length === 0)
      {
        return NextResponse.json({error:"User with Provided Email Doesnt Exists"},{status:404})
      }

      return NextResponse.json({message:"User Authenitcated Successfully."},{status:200})
       
    } catch (error) {
      console.error(error)
      return NextResponse.json({error:"Error Checking User Credentials"},{status:500})
    }
}