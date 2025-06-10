import useCanvasStore from 'store/useCanvasStore';

const useSaveData = () => {
  const canvas = useCanvasStore((state) => state.canvas);
  const choiceList = useCanvasStore((state) => state.choiceList);
  const answerUid = useCanvasStore((state) => state.answerUid);

  /** 캔버스에 들어있는 데이터는 세션스토리지의 elements에 저장,
   * choiceList는 세션스토리지의 interaction에 choiceList에 저장,
   * answerUid는 세션스토리지의 interaction에 answerUid에 저장
   */
  const saveData = () => {
    if (!canvas) return;

    sessionStorage.setItem('elements', JSON.stringify(canvas.toJSON()));
    sessionStorage.setItem(
      'interaction',
      JSON.stringify({ choiceList, answerUid })
    );
  };

  return { saveData };
};

export default useSaveData;
