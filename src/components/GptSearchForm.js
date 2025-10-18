import React from 'react'
import langConstants from '../utils/langConstants'
import { useSelector } from 'react-redux'
const GptSearchForm = () => {
  const language = useSelector((store) => store.config.language);
  return (
      <div className='pt-[10%] flex justify-center'>
          <form className='w-1/2 bg-black grid grid-cols-12'>

              <input type="text"
                  className='p-4 m-4 col-span-9'
                  placeholder={langConstants[language].searchPlaceholder} />
                  <button className='col-span-3 p-4 m-4 bg-red-700 text-white rounded-lg'>{langConstants[language].search}</button>
              </form>
        
    </div>
  )
}

export default GptSearchForm