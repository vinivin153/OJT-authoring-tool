import ArrangeTool from './headerTool/ArrangeTool';
import LayerTool from './headerTool/LayerTool';
import ShapeTool from './headerTool/ShapeTool';
import TextTool from './headerTool/TextTool';

function Header() {
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
      </div>
    </header>
  );
}

export default Header;
