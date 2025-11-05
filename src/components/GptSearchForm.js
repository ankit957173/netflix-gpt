import React, { useRef } from 'react'
import langConstants from '../utils/langConstants'
import { useSelector } from 'react-redux'
import useGptForm from '../hooks/useGptForm';
const GptSearchForm = () => {
      const language = useSelector((store) => store.config.language);
  const searchInputRef = useRef(null);  
  const { handleSearchClick } = useGptForm(searchInputRef);
  
  return (
      <div className=' flex justify-center'>
          <form className='w-full md:w-1/2 bg-black bg-opacity-80 grid grid-cols-12 rounded-lg overflow-hidden' onSubmit={(e)=>e.preventDefault()}>

        <input type="text"
            ref={searchInputRef}
                  className='p-3 md:p-4 m-2 md:m-4 col-span-9 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400'
                  placeholder={langConstants[language].searchPlaceholder} />
        <button className='col-span-3 p-3 md:p-4 m-2 md:m-4 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold transition-colors duration-200'
        onClick={handleSearchClick}>{langConstants[language].search}</button>
              </form>
        
    </div>
  )
}

export default GptSearchForm