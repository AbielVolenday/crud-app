'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { formatDate } from '@/lib/helpers'
import { unstable_noStore } from 'next/cache'
export default function Page (): React.ReactElement {
  unstable_noStore()
  const { id } = useParams()
  const [formData, setFormData] = useState({ firstName: '', lastName: '', birthday: '' })
  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ['updateUser'],
    queryFn: async () => {
      const res = await fetch('/api/updateUser', { method: 'PUT', body: JSON.stringify({ ...formData, id: String(id) }) })
      const data = await res.json()
      return data
    },
    enabled: false

  })

  async function handleUpdateUser (e: React.FormEvent): Promise<void> {
    e.preventDefault()
    await refetch()
  }
  return (
    <>
      <form
        onSubmit={handleUpdateUser}
        className="[&>div>input]:border flex flex-col gap-2 max-w-sm  mx-auto ">
        <h1 className='text-3xl text-center font-bold mt-10'>Update User </h1>
        <div className="flex flex-col mt-10">
          <label htmlFor="">First Name</label>
          <input
            className="px-4 py-2 rounded"
            type="text"
            value={formData.firstName}
            onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }) }}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Last Name</label>
          <input
            className="px-4 py-2 rounded"
            type="text"
            value={formData.lastName}
            onChange={(e) => { setFormData({ ...formData, lastName: e.target.value }) }}
            required
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">BirthDay</label>
          <input
            className="px-4 py-2 rounded"
            type="date"
            value={formData.birthday}
            onChange={(e) => { setFormData({ ...formData, birthday: e.target.value }) }}
            required
          />
        </div>
        <button
          disabled={isLoading || isFetching}
          className="disabled:bg-red-400 bg-violet-700 px-4 mt-5 hover:bg-violet-500 py-2 text-white font-bold rounded self-start">
          {isLoading || isFetching ? 'Updating ...' : 'Update User' }
        </button>
      </form>
        <div className='max-w-sm  mx-auto mt-10'>
          { data &&
          <div className='flex flex-col gap-2'>
              <h1 className='font-bold  text-xl'>Updated User : </h1>
              <span>First Name : {data.first_name}</span>
              <span>Last Name : {data.last_name}</span>
              <span>Birthday : {formatDate(data.birthday as string)}</span>
              <span>Age : {data.age}</span>
          </div> }
        </div>

    </>
  )
}
