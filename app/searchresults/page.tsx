'use client'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import CryptoJS from 'crypto-js'
import Item from "../components/Item"
import { useState } from 'react'
import Link from "next/link"

const Page = () => {
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('query')

  //variables required to call api
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_API_KEY || '0e9f6b245fcc0405e8ec3441192dab46';
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_API_KEY || 'ccb909f381a1ee94ef3fab6579155fb11bcfad40';
  const timestamp = new Date().getTime().toString();
  const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
  
  //using Tanstack-query to call a character based on the id
  const { isLoading, error , data } = useQuery({
    queryKey: ['marvelData'],
    queryFn: async () => {
      const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${searchQuery}`)
      const data = await response.data.data.results
      if(data){
        return data
      }
    }
  })

  if(error instanceof Error){
    return <div>Error: {error.message}</div>
  }
  
  if(isLoading){
    return <div>Loading...</div>
  }

  if(data){
    return (
      <div>
        <span className="text-3xl text-purple-500">You searched for:</span><span className="text-3xl">&nbsp;{searchQuery}</span>
        <div className="flex flex-wrap gap-x-10 gap-y-8 justify-center items-center mt-10 pb-[6rem]">
          {data ? (data.map((item: any)=>{
            return(
              <Link className="hover:scale-[1.05] transition-all" key={item.id} href={`/characters/${item.id}`}>
                <Item
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    thumbnail={item.thumbnail}
                  />
              </Link>
            )
          })) : 
          (<div className="h-[50vh] flex justify-center items-center text-blue-500 text-xl">Found 0 results</div>)
          }
        </div>
      </div>
    )
  }
}

export default Page