"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 편집 상태를 위한 Context 타입 정의
interface EditContextType {
  isEditing: boolean;
  handleEditClick: () => void;
  handleCompleteClick: () => void;
}

// 편집 상태를 위한 Context 생성 (초기값을 null로 설정)
const EditContext = createContext<EditContextType | null>(null);

export const useEdit = () => {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error("useEdit must be used within an EditProvider");
  }
  return context;
};

export const EditProvider = ({ children }: { children: ReactNode }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing(true);
  const handleCompleteClick = () => setIsEditing(false);

  return (
    <EditContext.Provider
      value={{ isEditing, handleEditClick, handleCompleteClick }}
    >
      {children}
    </EditContext.Provider>
  );
};
