'use client'
import { useQuery } from '@tanstack/react-query'
import { Edit3Icon, LucideDelete, User } from 'lucide-react'
import { formatDate } from '@/lib/helpers'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

const skeletons = new Array(6).fill(null)
export default function Home (): React.ReactElement {
  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: async () => {
      const res = await fetch('/api/getAllUsers')
      const data = await res.json()
      return data
    },
    refetchOnMount: true

  })

  async function handleDeleteUser (id: string): Promise<void> {
    try {
      await fetch('/api/deleteUser', { method: 'DELETE', body: JSON.stringify({ id }) })
    } catch (err) {
      console.log(err)
    } finally {
      await refetch()
    }
  }

  return (
    <main className="flex flex-col  mx-auto  items-center justify-center ">
      <div className="mt-10"></div>
      <h1 className='text-3xl font-bold '>Users</h1>
      <Table className='max-w-3xl mx-auto mt-10' >
        <TableHeader>
           <TableRow className=''>
              <TableHead>Profile Picture</TableHead>
              <TableHead>Id</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Birthday</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Actions</TableHead>
           </TableRow>
        </TableHeader>
        { isFetching || isLoading
          // LOADING STATE
          ? <TableBody>
            {skeletons.map((_, index) => (
            <TableRow key={index}>
                <TableCell className='text-center'><Skeleton className='bg-slate-300 w-10 h-10 rounded-full'></Skeleton></TableCell>
                <TableCell className='text-center'><Skeleton className='bg-slate-300 w-full h-4 rounded'></Skeleton></TableCell>
                <TableCell className='text-center'><Skeleton className='bg-slate-300 w-full h-4 rounded'></Skeleton></TableCell>
                <TableCell className='text-center'><Skeleton className='bg-slate-300 w-full h-4 rounded'></Skeleton></TableCell>
                <TableCell className='text-center'><Skeleton className='bg-slate-300 w-full h-4 rounded'></Skeleton></TableCell>
                <TableCell className='text-center'><Skeleton className='bg-slate-300 w-full h-4 rounded'></Skeleton></TableCell>
                <TableCell className='flex   items-end gap-2 '>
                  <Skeleton className='bg-slate-300 w-6 h-6 rounded mt-2'></Skeleton>
                  <Skeleton className='bg-slate-300 w-6 h-6 rounded mt-2'></Skeleton>
                </TableCell>
            </TableRow>

            ))}
          </TableBody>
          : <TableBody>

        {data?.length > 0 && data?.map((user: any) => {
          return (
            <TableRow key={user.id} >
              <TableCell><User className='border-2 rounded-full '></User></TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{formatDate(user.birthday as string)}</TableCell>
              <TableCell>{user.age ?? 100}</TableCell>
              <TableCell className=' flex gap-2'>
                <a href={`/updateUser/${user.id}`}>
                  <Edit3Icon className='hover:text-blue-700 cursor-pointer active:scale-95'></Edit3Icon>
                </a>
                <LucideDelete
                  className='hover:text-red-500 cursor-pointer active:scale-95'
                  onClick={() => { handleDeleteUser(user.id as string).catch(err => { console.log(err) }) }}></LucideDelete>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>}

      </Table>
    </main>
  )
}
