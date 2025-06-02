import type { tabs } from '../Provider/TabProvider';
import { useTabStateContext } from '../Provider/TabProvider';

export default function TabText({item, index}:{item: tabs, index: number}) {
const { currentIndex } = useTabStateContext();

  return (
    <a className={currentIndex === index ? 'single-tab__active-text' : 'single-tab__inactive-text'}>
      {item.title}
    </a>
  )
}
