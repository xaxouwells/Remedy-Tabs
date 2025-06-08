import TabBar from './Components/TabBar';
import type { tabs } from './Provider/TabProvider';
import TabContent from './Components/TabContent';
import TabProvider from './Provider/TabProvider';
import './asset/Tabs.scss';

type TabsProps = | {
   allTabs: tabs[];
   tabBarWidthType: 'fit';
   scrollable: boolean;
   scrollBehavior?: ScrollBehavior;
   scrollFromBreakPoint?: number;
} | {
  allTabs: tabs[];
  tabBarWidthType: 'no-fit';
  tabBarWidth: number;
  scrollable: boolean;
  scrollBehavior?: ScrollBehavior;
  scrollFromBreakPoint?: number;
} 

export default function RemedyTabs(props: TabsProps) {
  const {allTabs, scrollable, tabBarWidthType, scrollBehavior, scrollFromBreakPoint } = props;

  console.log('tabs render');
  return (
    <TabProvider>
      <div className={'tabs-container'}>
        <TabBar  allTabs={allTabs} scrollable={scrollable} scrollBehavior={scrollBehavior} scrollFromBreakPoint={scrollFromBreakPoint} widthType={tabBarWidthType} width={tabBarWidthType === 'no-fit' ? props.tabBarWidth : 0}/>
        <TabContent allTabs={allTabs}/>
      </div>
    </TabProvider>
  )
}
