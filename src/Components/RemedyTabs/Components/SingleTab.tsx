import React from 'react';
import { type tabs } from '../Provider/TabProvider';
import TabText from './TabText';

const SingleTab = ({ item, index, tabRef, handleSwitchIndex}: {item: tabs, index: number, tabRef:React.RefObject<HTMLLIElement>, handleSwitchIndex: (index: number)=>void}) => {
  return (
    <li
      role="tab"
      className={'single-tab'} 
      aria-controls={item.id}
      ref={tabRef} 
      onClick={()=>handleSwitchIndex(index)}
    >
     <TabText item={item} index={index}/>
    </li>
  );
};

export default SingleTab;