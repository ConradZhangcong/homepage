import { useNavigate } from "react-router-dom";

const ToolRoomPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        返回首页
      </button>
      工具箱页面
    </div>
  );
};

export default ToolRoomPage;
