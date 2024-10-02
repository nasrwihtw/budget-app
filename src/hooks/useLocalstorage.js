import  { useEffect, useState } from 'react'

const useLocalstorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const jonsValue = localStorage.getItem(key)
       
        if(jonsValue != null){
          return JSON.parse(jonsValue)
        }
        if(typeof defaultValue ==="function"){
          return defaultValue();
        }else{
          return defaultValue
        }
    })

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value))
    },[value, key])
    
  return [value, setValue]
}

export default useLocalstorage