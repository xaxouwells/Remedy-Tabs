import { createContext, useRef, useState, useMemo, useContext, useCallback, type ComponentType } from "react";

export interface LazyComponentProps {
    [key:string]: unknown;
}
export type tabs =
  | {
      id: number;
      type: 'lazy';
      title?: string;
      icon?: React.ReactNode;
      lazyComponent: () => Promise<{ default: ComponentType<LazyComponentProps>; }>;
      props?: Record<string, unknown>;
      suspenseComponent: React.ReactNode;
    }
  | {
      id: number;
      type: 'normal';
      title?: string;
      icon?: React.ReactNode;
      component: React.ReactNode;
    }


export interface EachSizeToTranslate {
    id: number;
    toTranslate: number;
    sizeToGetForControllerSwitch: number;
}

interface TabRef {
   tabContainer: React.RefObject<HTMLUListElement | null>;
   controllerSwitch: React.RefObject<HTMLDivElement | null>;
   tabs: React.RefObject<(HTMLLIElement | null)[]>;
   eachStepToTranslate: React.RefObject<EachSizeToTranslate[] | []>;
   globalContainer: React.RefObject<HTMLDivElement | null>;
   frame: React.RefObject<number>;
};

interface TabAction { 
    handleNextIndex: (index: number) => void;
}

interface TabState {
   currentIndex: number;  
}



const TabRefContext = createContext<TabRef | null>(null);
const TabStateContext = createContext<TabState | null>(null);
const TabActionContext = createContext<TabAction | null>(null);

export default function TabProvider ({children}:{children:React.ReactNode}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const tabContainer = useRef<HTMLUListElement | null>(null);
    const controllerSwitch = useRef<HTMLDivElement | null>(null);
    const tabs = useRef<(HTMLLIElement | null)[]>([]);
    const eachStepToTranslate = useRef<EachSizeToTranslate[] | []>([]);
    const frame = useRef(0);
    const globalContainer = useRef<HTMLDivElement | null>(null);
    const handleNextIndex = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);
   const refValues = useMemo(():TabRef =>({
     tabContainer: tabContainer,
     controllerSwitch: controllerSwitch, 
     tabs: tabs,
     eachStepToTranslate: eachStepToTranslate,
     frame: frame,
     globalContainer: globalContainer
   }), [tabContainer, controllerSwitch, eachStepToTranslate, frame, globalContainer]);
   
   const stateValues = useMemo(():TabState =>({
     currentIndex: currentIndex
   }),[currentIndex]); 
   
   const actionValues = useMemo(():TabAction =>({
     handleNextIndex: handleNextIndex
   }),[handleNextIndex]);


   return (
    <TabRefContext.Provider value={refValues}>
     <TabActionContext.Provider value={actionValues}>
      <TabStateContext.Provider value={stateValues}>
        {children}
      </TabStateContext.Provider>
      </TabActionContext.Provider>
    </TabRefContext.Provider>
   )
}


export const useTabActionContext = () => {
    const context = useContext(TabActionContext);
    if(context=== null) {
        throw new Error('please provide TabProvider')
    }
    return context;
}
export const useTabStateContext = () => {
    const context = useContext(TabStateContext);
    if(context=== null) {
        throw new Error('please provide TabProvider')
    }
    return context;
}
export const useTabRefContext = () => {
    const context = useContext(TabRefContext);
    if(context=== null) {
        throw new Error('please provide TabProvider')
    }
    return context;
}
