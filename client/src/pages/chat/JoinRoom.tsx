import { useState } from "react";
import Modal from "../../components/Modal"
import { useNavigate } from "react-router-dom";

const JoinRoom = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
  const [roomId, setRoomId] = useState<string>("");
  const navigate = useNavigate()
  return (
    <div>
      <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <div className="flex flex-col gap-y-3">
          <input onChange={(e) => setRoomId(e.target.value)} type="text" placeholder="Enter your room id" className="px-3 py-2 outline-none border border-gray-400 rounded-md" />
          <button onClick={() => navigate(`/user/videocall/${roomId}`)} className="px-2 py-2 bg-lightgreen text-white font-semibold rounded-md">Join</button>
        </div>
      </Modal>
    </div>
  )
}

export default JoinRoom