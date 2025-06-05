import Canvas from 'components/Canvas';
import Header from 'components/Header';
import Modal from 'components/modal/Modal';
import { COLORS } from 'constant/constant';

function App() {
  return (
    <div className="min-h-screen flex flex-col gap-5 p-5">
      <Header />
      <div className="flex flex-1 gap-4">
        <Canvas />
        <aside
          className="w-[30%] rounded-2xl"
          style={{ backgroundColor: COLORS.CARD_BACKGROUND }}
        ></aside>
      </div>
      <Modal />
    </div>
  );
}

export default App;
