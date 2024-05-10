'use client'
import Button from "@/components/Button";
import DropOption from "@/components/DropDownOption";
import useQuiz from "./store";

export default function Home() {

  const quizConfig=useQuiz((state:any)=>state.config)
  const addNumberOfQuestions=useQuiz((state:any)=>state.addNumberOfQuestions)
  console.log(quizConfig);
  
  return (
   <section className="flex flex-col justify-center items-center my-18 ">
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Let's Start Game</h1>
  <section className="p-10 my-10 rounded-lg shadow-xl w-[70%]">
  <div>
            <label htmlFor="first_name" className="block mb-2  text-sm font-medium text-gray-900 dark:text-white">No.of Questions</label>
            <input type="number" onChange={(e)=>addNumberOfQuestions(e.target.value)} defaultValue={10} min={0} max={50} id="first_name" className=" bg-slate-300 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
      <DropOption/>
<div className="flex flex-col justify-center items-center">
      <Button/>
      </div>
        
  </section>
   </section>
  );
}
