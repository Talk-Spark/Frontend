type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void; // 나가기 버튼의 동작
  title: string;
  description: string;
  buttonText?: string; // 오른쪽 버튼 텍스트
  actionText?: string; // 왼쪽 버튼 텍스트
};

const Modal = ({
  isOpen,
  onClose,
  onAction,
  title,
  description,
  buttonText = "이어서 ?하기",
  actionText = "나가기",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-70">
      <div className="h-auto w-[33.5rem] rounded-[12px] bg-white px-[1.6rem] pb-[2.4rem] pt-[4rem] text-center shadow">
        <h2 className="mb-[1.2rem] text-headline-3">{title}</h2>
        <p className="mb-[2.8rem] text-body-1-med">{description}</p>
        <div className="flex justify-between">
          <button
            onClick={onAction}
            className="h-[4.8rem] w-[14.5rem] rounded-[12px] bg-gray-3 text-body-1-bold text-gray-8"
          >
            {actionText}
          </button>
          <button
            onClick={onClose}
            className="h-[4.8rem] w-[14.5rem] rounded-[12px] bg-main-pink text-body-1-bold text-white"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
