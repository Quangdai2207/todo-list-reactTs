import { useEffect } from "react";

export const Document = () => {
  useEffect(() => {
    document.title = "todo-list-documentation";
  });
  return (
    <>
      <div>
        <h1>Hướng dẫn sử dụng</h1>
        <p></p>
      </div>
    </>
  );
};
