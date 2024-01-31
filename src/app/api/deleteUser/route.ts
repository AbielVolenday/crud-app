import { NextResponse, type NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'

async function deleteUser (req: NextRequest): Promise<NextResponse> {
  const { id } = await req.json()

  // TODO VALIDATE INPUTS
  try {
    await sql`DELETE FROM users WHERE id = ${id}`
    return NextResponse.json({ message: 'USER DELETE' })
  } catch (error) {
    return NextResponse.json({ error })
  }
}

export { deleteUser as DELETE }
