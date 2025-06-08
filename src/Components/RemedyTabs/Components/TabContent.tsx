import React, { Suspense, lazy, useMemo } from 'react';
import { useTabStateContext, type tabs } from '../Provider/TabProvider';
export default function TabContent({ allTabs }: { allTabs: tabs[] }) {
  const { currentIndex } = useTabStateContext();
  
  return (
    <div className={`tab-content__container`}>
      <div
        className={'tab-content__wrapper'}
        style={{ transform: `translate3d(-${currentIndex * 100}%, 0px, 0px)` }}
      >
        {allTabs.map((item, index) => (
          <div
            key={item.id}
            className={currentIndex === index ? 'tab-content__active-content' : 'tab-content__inactive-content'}
            role="tabpanel"
            id={item.id}
            aria-selected={currentIndex === index ? true : false}
          >
            <Content tab={item} index={index} currentIndex={currentIndex} />
          </div>
        ))}
      </div>
    </div>
  );
}

export const Content = ({ tab, index, currentIndex }: { tab: tabs; index: number, currentIndex: number }) => {
  const LazyComponent = useMemo(() => {
    return tab.type === 'lazy' ? lazy(tab.lazyComponent) : null;
  }, [tab.type]);

  if (tab.type === 'lazy' && LazyComponent && currentIndex === index) {
    return (
      <Suspense fallback={tab.suspenseComponent}>
        <LazyComponent {...tab.props} />
      </Suspense>
    );
  }
  
  if (tab.type === 'normal') {
    return tab.component;
  }
  
  return null;
};