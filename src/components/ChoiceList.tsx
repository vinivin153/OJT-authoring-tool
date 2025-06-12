import useCanvasStore from 'store/useCanvasStore';
import ChoiceCard from './ChoiceCard';
import NormalButton from './buttons/NormalButton';

function ChoiceList() {
  const canvas = useCanvasStore((state) => state.canvas);
  const choiceList = useCanvasStore((state) => state.choiceList);
  const setChoiceList = useCanvasStore((state) => state.setChoiceList);
  const hasSelection = useCanvasStore((state) => state.hasSelection);

  const handleAddChoiceClick = () => {
    if (!canvas) return;

    const objects = canvas.getActiveObjects();
    if (!objects) return;

    const newChoiceList = [...choiceList];
    objects.forEach((object) => {
      const objectUid = object.get('uid');
      if (newChoiceList.some((choice) => choice.uid === objectUid)) return;

      const objectImageUrl = object.toDataURL();
      newChoiceList.push({
        imageUrl: objectImageUrl,
        uid: objectUid,
      });
    });

    setChoiceList(newChoiceList);
  };

  const handleDeleteChoiceClick = (uid: string) => {
    const deletedChoiceList = choiceList.filter((choice) => choice.uid !== uid);
    setChoiceList(deletedChoiceList);
  };

  return (
    <div className="choice-list h-full flex flex-col gap-2 p-4 rounded-2xl relative pb-14">
      <h2 className="text-xl font-bold flex-shrink-0">선택지 목록</h2>
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 p-4">
            {choiceList.map((choice, index) => (
              <ChoiceCard
                key={choice.uid}
                choiceNumber={index + 1}
                choiceUid={choice.uid}
                choiceImage={choice.imageUrl}
                handleDeleteClick={handleDeleteChoiceClick}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute left-0 bottom-4 w-full px-8">
        <NormalButton
          text="선택지 추가"
          size="large"
          disabled={!hasSelection}
          onClick={handleAddChoiceClick}
        />
      </div>
    </div>
  );
}

export default ChoiceList;
