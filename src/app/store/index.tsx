import { create } from 'zustand'

export type configType={
    numberOfQuestion:number,
    category:{id:number,name:String},
    level:String,
    type:String,
    status:String,
    score:number,
    config?:any
}
const defaultConfig={
    numberOfQuestion:10,
    category:{
        id:0,
        name:''
    },
    type:'',
    status:'',
    score:0
}
const useQuiz = create((set) => ({
  config: {...defaultConfig},
  addLevel: (level:String) => set((state:configType) => ({ config: {...state.config,level:level}})),
  addNumberOfQuestions: (count:number) => set((state:configType) => ({ config: {...state.config,numberOfQuestion:count}})),
  addCategory: (id:number,name:String) => set((state:configType) => ({ config: {...state.config,category:{id:id,name:name}}})),
  addStatus: (status:String) => set((state:configType) => ({ config: {...state.config,status:status}})),
  addScore: () => set((state:configType) => ({ config: {...state.config,score:state.config.score +1}})),
  addType: (type:String) => set((state:configType) => ({ config: {...state.config,type:type}})),


}))

export default useQuiz;