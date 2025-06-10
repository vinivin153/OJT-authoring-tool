import DeleteIcon from 'assets/Images/trash.svg?react';
import { Checkbox } from './Checkbox';
import useCanvasStore from 'store/useCanvasStore';

type ChoiceCardProps = {
  choiceNumber: number;
  choiceUid: string;
  choiceImage: string;
  handleDeleteClick: (uid: string) => void;
};

function ChoiceCard({
  choiceNumber,
  choiceUid,
  choiceImage,
  handleDeleteClick,
}: ChoiceCardProps) {
  const answerUid = useCanvasStore((state) => state.answerUid);
  const setAnswerUid = useCanvasStore((state) => state.setAnswerUid);
  const isChecked = answerUid.includes(choiceUid);

  const handleCheckboxChange = () => {
    if (isChecked) {
      setAnswerUid(answerUid.filter((uid) => uid !== choiceUid));
      return;
    }

    setAnswerUid([...answerUid, choiceUid]);
  };

  return (
    <div className="choice-card h-50 flex flex-col items-center relative rounded-xl bg-white p-4 shadow-md has-[[aria-checked=true]]:bg-blue-50">
      <div className="flex justify-between w-full">
        <label className="w-8 h-8 p-2 flex items-center justify-center rounded-md s text-white bg-[#87bdfa]">
          {choiceNumber}
        </label>
        <button
          type="button"
          aria-label="정답카드 삭제 버튼"
          className="aspect-square p-2 bg-white"
          onClick={() => handleDeleteClick(choiceUid)}
        >
          <DeleteIcon width={18} height={18} />
        </button>
      </div>
      <div className="flex items-center justify-center rounded-lg h-full p-1 overflow-hidden">
        <img
          src={choiceImage}
          alt="보기 이미지"
          className="w-full h-full object-fill"
        />
      </div>
      <div className="flex justify-center items-center mt-2 has-[[aria-checked=true]]:text-[#0075E2]">
        <Checkbox
          className="w-6 h-6"
          checked={isChecked}
          onCheckedChange={handleCheckboxChange}
        />
        <span className="ml-2 text-lg">정답 선택</span>
      </div>
    </div>
  );
}

export default ChoiceCard;
