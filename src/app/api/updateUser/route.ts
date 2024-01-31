import { NextResponse, type NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'
import { unstable_noStore } from 'next/cache'
import { differenceInYears } from 'date-fns'

async function updateUser (req: NextRequest): Promise<NextResponse> {
  unstable_noStore()

  // TODO VALIDATE INPUTS
  const { id, firstName, lastName, birthday } = await req.json()
  const birthDate = new Date(birthday as string)
  const age = differenceInYears(new Date(), birthDate)
  try {
    const { rows } = await sql`
      UPDATE users 
      SET first_name = ${firstName}, last_name = ${lastName}, birthday = ${birthday}, age = ${age}
      WHERE id = ${id}
      RETURNING id, first_name, last_name, birthday, age
      `
    return NextResponse.json(rows[0])
  } catch (error) {
    return NextResponse.json({ error })
  }
}

export { updateUser as PUT }
