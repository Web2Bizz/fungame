import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { roomAPI } from "../../entitys/Room/api/service.js";

const HomePage = () => {
  const navigate = useNavigate();
  const [createRoom, {}] = roomAPI.useCreateRoomMutation();

  const onCreateRoomClick = async () => {
    try {
      const response = await createRoom();
      if (response.error) {
        // Обработка ошибки, если она есть
        console.error("Ошибка при создании комнаты:", data.roomCode.error);
      } else {
        // Переходим на страницу лобби с roomCode, если все в порядке
        const { roomCode } = response.data;
        navigate(`/lobby/${roomCode}`);
      }
    } catch (error) {
      console.error("Ошибка при создании комнаты:", error);
    }
  };

  return (
    <div className="flex items-center flex-col gap-5">
      <h1 className="mb-20">Опасные слова</h1>

      <Button type="primary" onClick={onCreateRoomClick}>
        Создать комнату
      </Button>
      <Button type="primary">Присоединиться</Button>
      <h1>Главный разраб на этой свиноферме⚡</h1>
      <img width={300} src="/1.jpg" />
    </div>
  );
};

export default HomePage;
