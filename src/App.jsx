import { useState , useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [isNum , setIsNum] = useState(false);
  const [isChar , setIsChar] = useState(false);
  const[password , setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (isNum) {
      str+= "0123456789";
    }
    if (isChar) {
      str += "~!@#$%^&*(){}[]?/><";
    }
    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(pass); 
  } , [length, isNum , isChar , setPassword]);

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  })
 
  useEffect(()=>{
    passwordGenerator();
  }, [length, isChar, isNum ,passwordGenerator]);
  return (
    <>
    <h1 className='text-4xl text-center'>Password Generator</h1>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 justify-center text-center p-4'>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text" 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly 
        ref={passwordRef}
        />
        <button onClick={copyPassword} className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="Range"
          min={5}
          max={25}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div>
          <input 
          type="checkbox" 
          id='numInput'
          checked={isNum}
          onChange={()=>{setIsNum(!isNum)}}
          className='cursor-pointer'
          />
          <label htmlFor='numInput'> Numbers</label>
        </div>
        <div>
          <input 
          type="checkbox" 
          id='charInput'
          checked={isChar}
          onChange={()=>{setIsChar(!isChar)}}
          className='cursor-pointer'
          />
          <label htmlFor='charInput'> Character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
