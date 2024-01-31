import Link from 'next/link'

export function NavLinks (): React.ReactElement {
  return (
        <ul className="  flex  justify-center gap-4  [&>a]:underline-offset-4 ">
            <Link className="text-white font-bold hover:underline hover:font-bold" href="/">Users</Link>
            <div className='h-6 w-px bg-gray-500'></div>
            <Link className="text-white font-bold hover:underline hover:font-bold" href="/createUser">Create User</Link>
        </ul>
  )
}
