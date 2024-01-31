'use client'
import Link from 'next/link'

export function NavLinks (): React.ReactElement {
  return (
        <ul className="  flex  justify-center gap-4  [&>a]:underline-offset-4 ">
            <Link prefetch={false} className="text-white font-bold hover:underline hover:font-bold" href="/">Users</Link>
            <div className='h-6 w-px bg-gray-500'></div>
            <a className="text-white font-bold hover:underline hover:font-bold" href="/createUser">Create User</a>
        </ul>
  )
}
