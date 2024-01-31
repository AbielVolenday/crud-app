import { NextResponse, type NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'
import { unstable_noStore } from 'next/cache'
import { differenceInYears } from 'date-fns'

async function createUser (req: NextRequest): Promise<NextResponse> {
  unstable_noStore()

  // TODO VALIDATE INPUTS

  const { firstName, lastName, birthday } = await req.json()

  // Calculate age from birthday
  const birthDate = new Date(birthday as string)
  const age = differenceInYears(new Date(), birthDate)

  try {
    const { rows } = await sql`
    INSERT INTO users (first_name, last_name, birthday , age) 
    VALUES (${firstName}, ${lastName}, ${birthday} , ${age}) 
    RETURNING id, first_name, last_name, birthday, age`
    return NextResponse.json(rows[0])
  } catch (error) {
    return NextResponse.json({ error })
  }
}

export { createUser as POST }
