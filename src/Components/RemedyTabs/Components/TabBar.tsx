import { useCallback } from 'react';
import useInitialize from '../Hook/useInitialize';
import { type tabs } from '../Provider/TabProvider';
import SingleTab from './SingleTab';

type TabBarProps = | {
  allTabs: tabs[];
  scrollable: boolean;
  widthType: 'fit';
  scrollBehavior?: ScrollBehavior;
  scrollFromBreakPoint?: number;
} | {
  allTabs: tabs[];
  scrollable: boolean;
  widthType: 'no-fit';
  width: number;
  scrollBehavior?: ScrollBehavior;
  scrollFromBreakPoint?: number;
}


export default function TabBar(props:TabBarProps) {
    const {allTabs, scrollBehavior, scrollable, widthType, scrollFromBreakPoint} = props;
    const {handleSwitchIndex, controllerSwitch, tabContainer, tabs, globalContainer} = useInitialize({ scrollable: scrollable, scrollBehavior: scrollBehavior, scrollBreakpoint: scrollFromBreakPoint });
    const createTabRef = useCallback((index: number) => (el: HTMLLIElement | null) => {
        tabs.current[index] = el;
      }, [tabs]);
      
        return (
            <div className={`tab-bar__global-container ${widthType === 'fit' ? 'w-fit' : `w-${props.width}`}`} ref={globalContainer}>
            <ul
              className={'tab-bar__tab-container'} 
              ref={tabContainer}
              role="tablist"
            >
              <div className={'tab-bar__controller'} ref={controllerSwitch} role='button' tabIndex={0} ></div>
                {allTabs.map((item,index)=> {
                    return (
                       <SingleTab
                         index={index} 
                         item={item} 
                         tabRef={createTabRef(index)} 
                         handleSwitchIndex={handleSwitchIndex}
                         key={item.id}
                       />
                    )
                })}
            </ul>
         </div>
        )
    }