import { useEffect, useCallback} from 'react'
import { useTabActionContext, useTabRefContext } from '../Provider/TabProvider'

export default function useInitialize({scrollable, scrollBreakpoint = 768, scrollBehavior = 'smooth'}:{ scrollable: boolean, scrollBreakpoint?: number, scrollBehavior?: ScrollBehavior}) {
   const {controllerSwitch, eachStepToTranslate, frame, tabContainer, tabs, globalContainer} = useTabRefContext();
   const actionContext = useTabActionContext();
   console.log('use initialize render');
   const handleGetSize = useCallback(()=> {
    if(controllerSwitch.current) {
      controllerSwitch.current.style.width = eachStepToTranslate.current[0].sizeToGetForControllerSwitch + 'px';
    }
    },[controllerSwitch.current, eachStepToTranslate.current]);


 const handleFillTheArray = useCallback(()=> {
   if(eachStepToTranslate.current.length > 0 ) {
       eachStepToTranslate.current = [];
   }
    if(tabContainer.current && controllerSwitch.current) {
       const { left } = tabContainer.current.getBoundingClientRect();
       const containerLeft = left;
       if(tabs.current.length > 0) {
         tabs.current.forEach((item, index) => {
          if(item !== null) {
            const {width, left} = item.getBoundingClientRect();
            const toTranslate =  left - containerLeft;
            const sizeToGetForControllerSwitch =  width;
            const newValue = {id: index, toTranslate: toTranslate, sizeToGetForControllerSwitch: sizeToGetForControllerSwitch}
            const newArray = Array.isArray(eachStepToTranslate.current) && eachStepToTranslate.current.length <= 0 ? [newValue] : [...eachStepToTranslate.current, newValue]; 
            eachStepToTranslate.current = [...newArray];
          }
         })
       }
    }
    
 },[tabContainer.current]);
  
 const handleScrollToTab = useCallback((index: number) => {
    if (!globalContainer.current || !tabs.current[index]) return;
    
    // Vérifier si on dépasse la breakpoint
    const shouldScroll = window.innerWidth <= scrollBreakpoint;
    if (!shouldScroll) return;
    const container = globalContainer.current;
    const targetTab = tabs.current[index];
      // Scroll horizontal
      const containerRect = container.getBoundingClientRect();
      const tabRect = targetTab.getBoundingClientRect();
      // Calculer la position cible pour centrer l'onglet
      const containerCenter = containerRect.width / 2;
      const tabCenter = tabRect.width / 2;
      const tabPosition = targetTab.offsetLeft;
      
      const scrollPosition = tabPosition - containerCenter + tabCenter;
      
      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: scrollBehavior
      });
  }, [tabContainer.current, tabs.current, scrollBreakpoint, scrollBehavior]);


 useEffect(()=> {
   handleFillTheArray();
   handleGetSize();
   window.addEventListener('resize', handleFillTheArray); 
   return () => {
    window.removeEventListener('resize', handleFillTheArray);
   }
 },[handleFillTheArray, handleGetSize]);
 

 const handleUpdatedStyle = useCallback((index:number )=>{
   if(eachStepToTranslate.current.length <= 0) return;
     if(frame.current) {
       cancelAnimationFrame(frame.current);
     }
     frame.current = requestAnimationFrame(()=> {
       if(controllerSwitch.current) {
        controllerSwitch.current.style.width = eachStepToTranslate.current[index].sizeToGetForControllerSwitch + 'px';
        controllerSwitch.current.style.transform =`translate3d(${eachStepToTranslate.current[index].toTranslate}px, 0px, 0px)`;
       }
     }); 
   
 },[eachStepToTranslate.current, controllerSwitch.current, frame.current]);

  const handleSwitchIndex = useCallback((index:number)=>{
        actionContext.handleNextIndex(index);

        handleUpdatedStyle(index);
      if(scrollable) {
        handleScrollToTab(index);
      }
  },[handleUpdatedStyle]);
  
  return {
    handleSwitchIndex,
    controllerSwitch, 
    tabs,
    tabContainer, 
    globalContainer
  }
}
