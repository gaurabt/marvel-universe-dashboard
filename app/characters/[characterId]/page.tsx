'use client'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js'
import { easeIn, motion } from 'framer-motion';

const Page = ({params} : {params: any}) => {
  const router = useRouter()
  const {characterId} = params

  //variables required to call api
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_API_KEY || '0e9f6b245fcc0405e8ec3441192dab46';
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_API_KEY || 'ccb909f381a1ee94ef3fab6579155fb11bcfad40';
  const timestamp = new Date().getTime().toString();
  const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

  //using Tanstack-query to call an based on the id
  const { isLoading, error , data } = useQuery({
    queryKey: ['marvelData'],
    queryFn: async () => {
      const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`)
      const data = await response.data.data.results
      if(data){
        console.log(data)
        return data
      }
    }
  })


  //handle loading
  if(isLoading) return <h1 className='flex justify-center items-center w-full h-[80vh] text-center'>Loading...</h1>

  //handle error
  if(error instanceof Error){
    return 'There was an error' + error.message
  }

  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: {
      opacity: 0,
      y: 30,
      x: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        ease: [0.79, 0.18, 0.27, 0.42],
        duration: 0.8
      },
    },
  }

  if(data){
    return (
      <div className='grid place-items-center'>
        <h1 className='text-3xl mb-7 mt-10'>{data[0].name}</h1>
        <motion.div 
          className='card'
          variants={container}
          initial='hidden'
          animate='show'>
          <motion.img 
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {duration: 2.4,ease: easeIn}}}
            src={`${data[0].thumbnail.path}.jpg`} alt={data[0].name} 
            className='w-[250px] h-[250px] object-cover object-center'/> 
          <div className='flex flex-col justify-between basis-5/6 pr-4'>
            <motion.p variants={item} className='text-2xl text-[var(--primary-color)] font-bold basis-1/5 mt-2'>{data[0].name}</motion.p>
            <motion.p variants={item} className='text-[var(--accent-color)] basis-auto h-full'>{data[0].description ? (data[0].description) : ('Description Not Found.')}</motion.p>
            <div className='flex justify-between basis-1/5'>
              <motion.div variants={item}>
                <span>Comics appeared in: </span>
                <span className='text-purple-400'>{data[0].comics.available}</span>
              </motion.div>
              <motion.div variants={item}>
                <span>Series appeared in: </span>
                <span className='text-purple-400'>{data[0].series.available}</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }
  }

export default Page