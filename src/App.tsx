import SuspenseComponent from './Components/SuspenseComponent/SuspenseComponent';
import Tabs from './Components/RemedyTabs/RemedyTabs.tsx';
import type { tabs } from './Components/RemedyTabs/Provider/TabProvider.tsx';
import RemedyTabs from './Components/RemedyTabs/RemedyTabs.tsx';

const allTabs: tabs[] = [
  {
    id: 'Bonjour1',
    title: 'Bonjour1',
    type: 'lazy',
    lazyComponent:()=> import('./Components/ComponentTets/TestOne.tsx'),
    suspenseComponent: <SuspenseComponent/>,
  },
  {
    id: 'HelloUno',
    title: 'HelloUno',
    type: 'lazy',
    lazyComponent:()=> import('./Components/ComponentTets/TestTwo.tsx'),
    suspenseComponent: <SuspenseComponent/>
  },
  {
    id: "Hello tab3",
    title: 'Holla Tab3',
    type: 'lazy',
    lazyComponent:()=> import('./Components/ComponentTets/TestThree.tsx'),
    suspenseComponent: <SuspenseComponent/>
  },
  {
    id: 'Coucou tab4',
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
      <RemedyTabs
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