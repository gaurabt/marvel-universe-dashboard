'use client'

import CryptoJS from 'crypto-js'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Item from './components/Item';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from './components/pages/Header';

export default function Home() {
  const [arrData, setArrData] = useState([]);


  //for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_API_KEY;
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_API_KEY;
  const timestamp = new Date().getTime().toString();

  /*
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
  */
  
  const fetchMarvelData = async (timestamp: string, publicKey: any, privateKey: any, currentPage: number, items: number) => {
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey);
    const response = await axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${items}&offset=${(currentPage - 1) * items}`);
    return response.data.data.results;
  };

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const data = await fetchMarvelData(timestamp, publicKey, privateKey, currentPage, itemsPerPage);
        setArrData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAndUpdateState();
  }, [currentPage]);

  return (
    <>
      <Header></Header>
      <h1 className='gradient-text'>Discover Marvel Characters</h1>
        {/*map through the array of characters and display each character */}
      <div className='grid gap-y-8 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-cols-1 place-items-center lg:mx-[5rem] md:mx-[3rem] mx-[3rem]'>
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
        <button disabled={!arrData} onClick={() => setCurrentPage(currentPage + 1)} className='bg-[var(--secondary-color)] px-3 py-2 mt-5 rounded-sm text-[var(--primary-color)] hover:bg-blue-500 hover:text-black transition-all'>
          Next Page
        </button>
      </div> 
    </>
  );
}
