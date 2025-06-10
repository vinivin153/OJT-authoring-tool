import useSaveData from 'hooks/useSaveData';
import NormalButton from './buttons/NormalButton';
import ArrangeTool from './headerTool/ArrangeTool';
import LayerTool from './headerTool/LayerTool';
import ShapeTool from './headerTool/ShapeTool';
import TextTool from './headerTool/TextTool';
import useModalStore from 'store/useModalStore';

function Header() {
  const { saveData } = useSaveData();
  const openModal = useModalStore((state) => state.openModal);

  return (
    <header className="flex gap-10 rounded-2xl bg-[#f7f8fd] text-gray-800p-4 px-10">
      <h1 className="flex justify-center items-center text-2xl font-bold ">
        저작 도구
      </h1>
      <div className="flex flex-1 justify-between p-5 ">
        <ShapeTool />
        <ArrangeTool />
        <TextTool />
        <LayerTool />
        <div className="flex flex-col items-center gap-2">
          <NormalButton
            borderColor="border-[#667eea]"
            bgColor="white"
            textColor="text-[#667eea]"
            text="미리보기"
            size="medium"
            onClick={() => openModal('preview')}
          />
          {/* {TODO(홍빈):저장하기 클릭시 토스트 메시지 띄우기} */}
          <NormalButton text="저장하기" size="medium" onClick={saveData} />
        </div>
      </div>
    </header>
  );
}

export default Header;
