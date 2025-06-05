/** modal-root에 포탈을 연결하는 기능 */
import { createPortal } from 'react-dom';

const createModalPortal = (children: React.ReactNode) => {
  const modalRootEl = document.getElementById('modal-root');

  if (!modalRootEl) return null;

  return createPortal(children, modalRootEl);
};

export default createModalPortal;
