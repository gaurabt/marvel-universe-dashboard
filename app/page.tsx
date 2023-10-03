'use client'

import CryptoJS from 'crypto-js'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Item from './components/Item';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [arrData,setArrData ] = useState([])

  //for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const items = 20

  const startindex = (currentPage - 1) * items
  const endIndex = startindex + items

  //variables required to call api
  const publicKey = '0e9f6b245fcc0405e8ec3441192dab46';
  const privateKey = 'ccb909f381a1ee94ef3fab6579155fb11bcfad40';
  const timestamp = new Date().getTime().toString();
  const hash = CryptoJS.MD5(timestamp + privateKey + publicKey);


  //using Tanstack-query to call api
  const { isLoading, error , data } = useQuery({
    queryKey: ['marvelData'],
    queryFn: async () => {
      const response = await axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${items}&offset=${startindex}`)
      const data = await response.data.data.results
      if(data){
        console.log(arrData)
        return data
      }
    },
    onSuccess(data) {
      setArrData(data)
    },
  })

  if(isLoading) return 'Your content is loading. Please wait!'

  if(error instanceof Error){
    return 'There was an error.' + error.message
  }
  
  return (
    <section suppressHydrationWarning>
      <h1 className='mb-5 text-4xl font-bold px-12 lg:px-[5rem] text-center'>Discover Marvel Characters</h1>
      {/*map through the array of characters and display each character */}
      <div className='grid md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-cols-1 place-items-center lg:mx-[5rem] md:mx-[3rem] mx-[3rem]'>
        {arrData.map((item: any) => {
          return <Link key={item.id} href={`/characters/${item.id}`}>
              <Item key={item.id} id={item.id} name={item.name} description={item.description} thumbnail={item.thumbnail}/>
              </Link>
        })}
      </div>
      <div className='w-full flex justify-center items-center gap-4 pb-5'>
        <button disabled={currentPage === 1} onClick={()=> setCurrentPage(currentPage-1)} className='bg-[var(--secondary-color)] px-3 py-2 mt-5 rounded-sm text-[var(--primary-color)] hover:bg-blue-500 hover:text-black transition-all'>
          Previous Page
        </button>
        <p className='py-2 px-3 bg-yellow-500 mt-5 text-black font-bold'>{currentPage}</p>
        <button disabled={currentPage > data.length} onClick={() => setCurrentPage(currentPage + 1)} className='bg-[var(--secondary-color)] px-3 py-2 mt-5 rounded-sm text-[var(--primary-color)] hover:bg-blue-500 hover:text-black transition-all'>
          Next Page
        </button>
      </div>
    </section>
  )
}


