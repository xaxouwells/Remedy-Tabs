import SuspenseComponent from './Components/SuspenseComponent/SuspenseComponent';
import Tabs from './Components/Tabs/Tabs.tsx';
import type { tabs } from './Components/Tabs/Provider/TabProvider.tsx';

const allTabs: tabs[] = [
  {
    id: 1,
    title: 'Bonjour je suis Tab1',
    type: 'lazy',
    lazyComponent:()=> import('./Components/ComponentTets/TestOne.tsx'),
    suspenseComponent: <SuspenseComponent/>,
  },
  {
    id: 2,
    title: 'Hello Im Tab2',
    type: 'lazy',
    lazyComponent:()=> import('./Components/ComponentTets/TestTwo.tsx'),
    suspenseComponent: <SuspenseComponent/>
  },
  {
    id: 3,
    title: 'Holla Tab3',
    type: 'lazy',
    lazyComponent:()=> import('./Components/ComponentTets/TestThree.tsx'),
    suspenseComponent: <SuspenseComponent/>
  },
  {
    id: 4,
    title: 'Coucou Tab4',
    type: 'lazy', // Explicitly specify the type
    lazyComponent:()=> import('./Components/ComponentTets/TestFourth.tsx'),
    suspenseComponent: <SuspenseComponent/>
  },
];

export default function App() {
  return (
    <div
      style={{
        width: '100dvw',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Tabs
        tabBarWidthType='no-fit'
        tabBarWidth={100}
        allTabs={allTabs}
        scrollable={true}
        scrollBehavior={'smooth'}
        scrollFromBreakPoint={850}
      />
    </div>
  );
}