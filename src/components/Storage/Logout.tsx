const boxStyles =
  "py-[1rem] pl-[1.6rem] cursor-pointer transition-colors duration-300 ";

const Logout = ({
  setModalAction,
  modalAction,
}: {
  setModalAction: React.Dispatch<
    React.SetStateAction<"logout" | "delete" | null>
  >;
  modalAction: "logout" | "delete" | null;
}) => {
  const handleClick = (action: "logout" | "delete") => {
    setModalAction(action);
  };

  return (
    <div className="absolute right-[1.2rem] z-10 flex w-[14.2rem] flex-col justify-center rounded-[1.2rem] border-[0.1rem] border-gray-5 bg-white py-[0.4rem] text-body-2-med text-gray-5">
      <div
        className={`${boxStyles} ${modalAction === "logout" ? "text-gray-9" : "hover:text-gray-9"} `}
        onClick={() => handleClick("logout")}
      >
        로그아웃
      </div>
      <div className="mx-[0.8rem] h-[0.1rem] bg-gray-3"></div>
      <div
        className={`${boxStyles} ${modalAction === "delete" ? "text-gray-9" : "hover:text-gray-9"} `}
        onClick={() => handleClick("delete")}
      >
        회원탈퇴
      </div>
    </div>
  );
};

export default Logout;
