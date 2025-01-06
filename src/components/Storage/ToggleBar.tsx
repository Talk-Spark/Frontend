interface ToggleBarProps {
  activeView: "mine" | "others";
  handleToggle: (view: "mine" | "others") => void;
}

const ToggleBar: React.FC<ToggleBarProps> = ({ activeView, handleToggle }) => {
  return (
    <div className="flex w-full flex-col bg-white">
      <div className="relative mx-[2rem] mb-[0.8rem] flex w-[calc(100%-4rem)] flex-1 justify-between text-subhead-bold">
        <button
          onClick={() => handleToggle("mine")}
          className={`flex flex-1 justify-center ${
            activeView === "mine" ? "text-black" : "text-gray-5"
          }`}
        >
          내 명함
        </button>
        <button
          onClick={() => handleToggle("others")}
          className={`flex flex-1 justify-center ${
            activeView === "others" ? "text-black" : "text-gray-5"
          }`}
        >
          보관함
        </button>
      </div>
      {/* 하단 강조 바 */}
      <div className="w-[calc(100% - 4rem)] relative mx-[2rem] mb-[2rem] h-[0.3rem] rounded-[0.4rem] bg-gray-300">
        <div
          className="absolute h-full w-[50%] rounded-[0.4rem] bg-main-pink transition-transform duration-300"
          style={{
            transform:
              activeView === "mine" ? "translateX(0)" : "translateX(100%)",
          }}
        ></div>
      </div>
    </div>
  );
};
export default ToggleBar;
