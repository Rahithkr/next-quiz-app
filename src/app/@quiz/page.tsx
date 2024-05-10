'use client'

import React, { useEffect, useState } from 'react';
import useQuiz from '../store';
import { cn } from '@/lib/utils';
import { Skeleton } from "@/components/ui/skeleton"
import { Player, Controls } from '@lottiefiles/react-lottie-player';


type questionT= 
  {answers:string[],category:string,correct_answer:string,incorrect_answers:string[],difficulty:string,type:string}

function Quiz() {
    const [questions,setQuestions]=useState<any>([])
    const [answer,setAnswer]=useState('')
    const [loading,setLoading]=useState(false)
    const config=useQuiz((state:any)=>state.config)
    const addScore=useQuiz((state:any)=>state.addScore)



//   useEffect(()=>{
//     async function getQuestions(){
//         const {result}=await(await fetch(`https://opentdb.com/api.php?amount=${config.numberOfQuestion}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`)).json() 
//         console.log(result);
        
//     }
//     getQuestions()
//   })

useEffect(() => {
    async function getQuestions() {
      try {
        setLoading(true)
        const response = await fetch(`https://opentdb.com/api.php?amount=${config.numberOfQuestion}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const { results } = await response.json();
        let shuffledResult=results.map((e:questionT)=>{
            let value=[...e.incorrect_answers,e.correct_answer]
            .map((value)=>({value,sort:Math.random()}))
            .sort((a,b)=>a.sort-b.sort)
            .map(({value})=>value);
            e.answers=[...value]
            return e;
        })
        console.log(shuffledResult);
        
        setQuestions([...shuffledResult])
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    }

    getQuestions();

  
    // const delay = 3000; // Set a delay of 3 seconds between requests
    // const timerId = setTimeout(() => {
    //   getQuestions();
    // }, delay);
  
    // return () => clearTimeout(timerId); // Cleanup timer when component unmounts
  }, [config.category, config.level, config.numberOfQuestion,config.type]);
  
const handleNext=()=>{

    let remainingQuestions=[...questions]
    remainingQuestions.shift();
    setQuestions([...remainingQuestions]);
    setAnswer("");
}

const checkAnswer=(answer:String)=>{
if(answer===questions[0].correct_answer){
    addScore(0)
}
setAnswer(questions[0].correct_answer)
}


  return (
    <section className='flex flex-col justify-center items-center'>
  {
    questions?.length ? (
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Question Number 
        {
            questions?.length ?
            <span className="text-blue-600 dark:text-blue-500">#{config.numberOfQuestion-questions.length +1}</span>:null
        }
      </h1>
    ):null
  }
      {
        !loading && !!questions.length && <p className='text-2xl mb-4'>Score:{config.score}</p>
      }
      <section className='shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200'>
 <h4 className="mb-4 text-center text-xl font-extrabold leading-none tracking-tight text-blue-400 md:text-2xl lg:text-2xl dark:text-white">
    {questions.length ? questions[0].question:null}
 </h4>
 {
    loading && <div className='flex flex-col'>
        <Skeleton className="w-[600px] h-[60px] my-10 rounded-sm" />
        <Skeleton className="w-[600px] h-[500px] rounded-sm" />

    </div>
 }
 {
    !questions.length && !loading && <div className='flex flex-col justify-center items-center'>
        <Player
  autoplay
  loop
  src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
  style={{ height: '350px', width: '350px' }}
>
  <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
</Player>

<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        YOUR SCORE : {config.score} </h1>

        <button onClick={()=>window.location.reload()} type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">NEXT GAME</button>
    </div>
 }
 <div className='flex justify-evenly items-center my-20 flex-wrap w-full'>
    {
        questions.length ? questions[0].answers.map(ans=>  <button key={ans} onClick={()=>checkAnswer(ans)} type="button" className={
            cn("w-[33%] py-3.5 px-5 me-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-gray-100 rounded-full border border-gray-200 hover:bg-slate-500 hover:text-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white shadow-slate-300 shadow-2xl dark:hover:bg-gray-700",
            {"bg-red-600":answer && ans!==answer,
            "bg-green-600":answer && ans===answer
            })
        }>{ans}</button>
    ):null
    }


 </div>
{
    questions.length ? <button onClick={handleNext} type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Next</button>:null

}
 </section>
    </section>
  );
}

export default Quiz;
