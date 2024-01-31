import { type NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'
import { unstable_noStore } from 'next/cache'

async function getAllUsers (req: NextRequest): Promise<Response> {
  unstable_noStore()

  // TODO VALIDATE INPUTS
  try {
    const { rows } = await sql`SELECT * FROM users`
    return Response.json(rows)
  } catch (error) {
    return Response.json({ error })
  }
}
export { getAllUsers as GET }
