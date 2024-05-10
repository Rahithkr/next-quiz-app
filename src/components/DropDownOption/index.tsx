import useQuiz from "@/app/store"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
  
 type categoryType ={
    id:number,
    name:String
 }

  const Type=['boolean','multiple']
  const Level=['easy','medium','hard']
function DropOption() {

    const[categories,setCategories]=useState<categoryType[]>([])
    const addCategory=useQuiz((state:any)=>state.addCategory)
    const addType=useQuiz((state:any)=>state.addType)
    const addLevel=useQuiz((state:any)=>state.addLevel)
    const config=useQuiz((state:any)=>state.config)


    useEffect(()=>{
        async function fetchCategory(){
            const {trivia_categories}= await (await fetch('https://opentdb.com/api_category.php')).json()
            setCategories([...trivia_categories])

        }
        fetchCategory();
    })
  return (
   <section className="flex justify-evenly items-center py-5">
    <div className="flex justify-evenly items-center py-5">
      <DropdownMenu>
  <DropdownMenuTrigger className='flex outine-none justify-between w-full p-5 shadow-md bg-slate-100 rounded-lg hover:bg-slate-600 hover:text-gray-200'>{config.category.name?config.category.name:'Select Category'}</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Select Category</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {
        categories.map(category=>  <DropdownMenuItem key={category.id} onClick={()=>addCategory(category.id,category.name)}>{category.name}</DropdownMenuItem>
    )
    }
   
  
  </DropdownMenuContent>
</DropdownMenu>
</div>

<div className="flex justify-evenly items-center py-5">
      <DropdownMenu>
  <DropdownMenuTrigger className='flex outine-none justify-between w-full p-5 shadow-lg bg-slate-100 rounded-lg hover:bg-slate-600 hover:text-gray-200'>{config.level?config.level:'Select Level'}</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Select Level</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {
        Level.map(e=> <DropdownMenuItem onClick={()=>addLevel(e)} key={e}>{e}</DropdownMenuItem>
    )
    }
    
    
  </DropdownMenuContent>
</DropdownMenu>
</div>
<div className="flex justify-evenly items-center py-5">
      <DropdownMenu>
  <DropdownMenuTrigger className='flex outine-none justify-between w-full p-5 shadow-lg bg-slate-100 rounded-lg hover:bg-slate-600 hover:text-gray-200'>{config.type?config.type:'Select Type'}</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Select Type</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {
        Type.map(e=> <DropdownMenuItem onClick={()=>addType(e)} key={e}>{e}</DropdownMenuItem>
    )
    }
   
   
  </DropdownMenuContent>
</DropdownMenu>
</div>
   </section>
  )
}

export default DropOption