import { createContext } from "react";

export const AppContext=createContext()
const currency='$'
const calculateAge=(birthday)=>{
    let today=new Date()
    let birthDay=new Date(birthday)
    let age=today.getFullYear()-birthDay.getFullYear()
    return age
  }
const AppContextProvider=(props)=>{
    const value={
        calculateAge,currency

    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
    
}
export default AppContextProvider