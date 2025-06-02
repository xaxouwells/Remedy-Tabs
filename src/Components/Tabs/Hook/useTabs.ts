import React, { useEffect, useRef, useCallback } from 'react'

interface EachSizeToTranslate {
    type: 'x' | 'y';
    id: number;
    toTranslate: number;
    sizeToGetForControllerSwitch: number;
}

export type tabs = | 
{
   id: number;
   title: string;
   icon: React.ReactNode;
} | {
   id: number;
   icon: React.ReactNode;
   title?:string;
} | {
   id: number; 
   title: string;
   icon?: React.ReactNode
}


export default function useTabs({ translateTo}:{ translateTo: 'x' | 'y'}) {
  const tabContainer = useRef<HTMLDivElement | null>(null);
  const controllerSwitch = useRef<HTMLDivElement | null>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);
  const eachStepToTranslate = useRef<EachSizeToTranslate[] | []>([]);
  const frame = useRef(0);
  

  const handleGetSize = useCallback(()=> {
     if(controllerSwitch.current) {
       controllerSwitch.current.style[translateTo === 'x' ? 'width' : 'height'] = eachStepToTranslate.current[0].sizeToGetForControllerSwitch + 'px';
     }
  },[controllerSwitch.current, eachStepToTranslate.current]);
  const handleFillTheArray = useCallback(()=> {
    let newArray = [];
    if(eachStepToTranslate.current.length > 0 ) {
        eachStepToTranslate.current = [];
    }
     if(tabContainer.current && controllerSwitch.current) {
        const { left, top} = tabContainer.current.getBoundingClientRect();
        const containerLeft = left;
        const containerTop = top;
        if(items.current.length > 0) {
          items.current.forEach((item, index) => {
           if(item !== null) {
             const {width, height, top, left} = item.getBoundingClientRect();
             const toTranslate = translateTo === 'x' ? left - containerLeft : top - containerTop;
             const sizeToGetForControllerSwitch = translateTo === 'x' ? width : height; 
             const newValue = {type: translateTo, id: index, toTranslate: toTranslate, sizeToGetForControllerSwitch: sizeToGetForControllerSwitch}
             newArray = Array.isArray(eachStepToTranslate.current) && eachStepToTranslate.current.length <= 0 ? [newValue] : [...eachStepToTranslate.current, newValue]; 
             eachStepToTranslate.current = [...newArray];
           }
          })
        }
     }
     
  },[translateTo, tabContainer.current]);
   
  
  useEffect(()=> {
    handleFillTheArray();
    handleGetSize();
  },[handleFillTheArray, handleGetSize]);
  

  const handleUpdatedStyle = useCallback((index:number )=>{
    if(eachStepToTranslate.current.length <= 0) return;
      if(frame.current) {
        cancelAnimationFrame(frame.current);
      }
      frame.current = requestAnimationFrame(()=> {
        if(controllerSwitch.current) {
          if(translateTo === 'x') {
            controllerSwitch.current.style.transform = `translate3d(${eachStepToTranslate.current[index].toTranslate}px, 0px, 0px)`;
            controllerSwitch.current.style.width = eachStepToTranslate.current[index].sizeToGetForControllerSwitch + 'px';
          } else {
            controllerSwitch.current.style.transform = `translate3d(0px,${eachStepToTranslate.current[index].toTranslate}px, 0px)`;
            controllerSwitch.current.style.height = eachStepToTranslate.current[index].sizeToGetForControllerSwitch + 'px';
          }
        }
      }); 
    
  },[eachStepToTranslate.current, controllerSwitch.current, frame.current]);
  

  const handleSwitchIndex = useCallback((index:number)=>{
     handleUpdatedStyle(index);
  },[handleUpdatedStyle]);

  return {
    tabContainer,
    controllerSwitch,
    items,
    handleSwitchIndex
  }
}
