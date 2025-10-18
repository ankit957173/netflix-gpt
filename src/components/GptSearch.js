import React from 'react'
import GptSearchForm from './GptSearchForm'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
        <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{
            backgroundImage: `url(${BG_URL})`
        }}>
         
          <GptSearchForm />
        </div>
  )
}

export default GptSearch