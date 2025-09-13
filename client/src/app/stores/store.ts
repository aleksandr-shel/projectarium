import {createContext, useContext} from "react";
import AnalyzerStore from "./analyzerStore";

interface Store{
    analyzerStore:AnalyzerStore
}

export const store : Store = {
    analyzerStore: new AnalyzerStore()
}
export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext)
}