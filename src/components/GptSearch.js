import React from 'react'
import GptSearchForm from './GptSearchForm'
import { BG_URL } from '../utils/constants'
import GptMovieSuggestion from './GptMovieSuggestion'

const GptSearch = () => {
  return (
    <><div className='fixed inset-0 -z-10'>
      <img src={BG_URL} alt="background" className='h-screen w-screen object-cover'/>
      <div className='absolute inset-0 bg-black bg-opacity-50'></div>
      </div>
     <div className="pt-[5%]  px-4 md:px-0" >
      <GptSearchForm />
      <GptMovieSuggestion />
        </div>
    </>
   
  )
}

export default GptSearch