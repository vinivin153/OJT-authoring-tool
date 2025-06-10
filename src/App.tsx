import ChoiceList from 'components/ChoiceList';
import Canvas from 'components/Canvas';
import Header from 'components/Header';
import Modal from 'components/modal/Modal';
import { COLORS } from 'constant/constant';

function App() {
  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col gap-5 p-5">
      <Header />
      <div className="flex flex-1 min-h-0 gap-4">
        <Canvas />
        <aside
          className="relative w-[30%] rounded-2xl"
          style={{ backgroundColor: COLORS.CARD_BACKGROUND }}
        >
          <ChoiceList />
        </aside>
      </div>
      <Modal />
    </div>
  );
}

export default App;
