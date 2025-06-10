import useModalStore from 'store/useModalStore';
import createModalPortal from './createModalPortal';
import ImageList from 'components/ImageList';
import Preview from 'components/Preview';

function Modal() {
  const { isOpen, modalType, closeModal } = useModalStore((state) => state);

  if (!isOpen) return null;

  return createModalPortal(
    <div className="modal">
      <div
        className="modal-overlay fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className="modal-content fixed w-[70%] h-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
        <div className="modal-header w-full flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl!">이미지 리스트</h2>
          <button
            type="button"
            className="close-button w-10 h-10 text-2xl! cursor-pointer"
            aria-label="팝업 창 닫기"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
        <div className="modal-body w-full h-[80%] overflow-y-auto">
          {modalType === 'image' && <ImageList />}
          {modalType === 'preview' && <Preview />}
        </div>
      </div>
    </div>
  );
}
export default Modal;
