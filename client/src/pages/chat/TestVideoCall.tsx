import { useContext, useEffect, useRef, useState } from "react"
import Peer from "peerjs"
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import { FaVideoSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { AiFillAudio } from "react-icons/ai";
import { IoMdMicOff } from "react-icons/io";
import { IoExit } from "react-icons/io5";
import { MdOutlineIosShare } from "react-icons/md";
const TestVideoCall = () => {

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peerId, setPeerId] = useState<string>("");
  const [sharingId, setSharingId] = useState<boolean>(false);
  const [personToCall, setPersonToCall] = useState<string>("")
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [userAccepted, setUserAccepted] = useState<boolean>(false);
  const [isleaveRoom, setIsLeaveRoom] = useState<boolean>(false);
  const myVideoRef = useRef<HTMLVideoElement | null>(null)
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null)
  const peerInstance = useRef<Peer | null>(null)
  const { socket } = useContext(SocketContext) || {}
  const { roomId } = useParams()

  const navigate = useNavigate()
  useEffect(() => {
    const peer = new Peer();

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      setStream(stream);
    });

    peer.on("open", (id) => {
      setPeerId(id);
      socket && socket.emit("room-joined", ({ roomId, id }));
    });

    peerInstance.current = peer;

    return () => {
      peerInstance.current?.destroy();
    };
  }, []);

  useEffect(() => {
    socket &&
      socket.on('new-user-joined', (userId) => {
        if (userId !== peerId) {
          setPersonToCall(userId)
        }
      });
  }, [socket]);


  peerInstance.current && peerInstance.current.on("call", (call) => {
    if (stream) {
      call.answer(stream);
      call.on("stream", (remoteVideoStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteVideoStream;
        }
      });
    }
    call.on('close', () => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    });
  })

  const call = (remotePeerId: string) => {
    if (peerInstance.current && stream) {
      const call = peerInstance.current.call(remotePeerId, stream);
      call.on('stream', (remoteStream: MediaStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });
    }

  };

  const toggleVideo = () => {
    const tracks = stream?.getTracks().filter((track) => track.kind === 'video');
    tracks?.forEach((track) => (track.enabled = !videoEnabled));
    setVideoEnabled(!videoEnabled);
  };

  const toggleAudio = () => {
    const tracks = stream?.getTracks().filter((track) => track.kind === 'audio');
    tracks?.forEach((track) => (track.enabled = !audioEnabled));
    setAudioEnabled(!audioEnabled);
  };

  const leaveRoom = () => {
    setIsLeaveRoom(true)
    navigate('/user/videocall')
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const switchStream = (stream) => {
    setStream(stream)
    setSharingId(!sharingId)
    if (peerInstance.current)
      Object.values(peerInstance.current?.connections).forEach((connection: any) => {
        const videoTrack = stream?.getTracks().find((track) => track.kind === "video");
        connection[0].peerConnection.getSenders()[1].replaceTrack(videoTrack).catch((err: any) => console.log(err, "error in get tracks"))
      })
    if (myVideoRef.current) {
      myVideoRef.current.srcObject = stream
    }
  }

  const shareScreen = () => {
    if (sharingId) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((switchStream))
    } else {
      navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then((switchStream))
    }
  }

  return (
    <>
      {
        personToCall.length > 0 && personToCall !== peerId && !userAccepted &&
        <>
          <h1 className=" poppins ">Someone is requesting to join....</h1>
          <button className="px-2 py-2 rounded-md bg-lightgreen text-white font-bold" onClick={() => { call(personToCall), setUserAccepted(true) }}>Accept Join</button>
        </>
      }
      <div className={`grid place-content-start ${userAccepted ? 'md:grid-cols-2 grid-cols-1' : 'md:grid-cols-2 grid-cols-1'} `}>
        <div>
          {
            !isleaveRoom &&
            <video className={` border-4 rounded-lg${isleaveRoom ? 'hidden' : ''}`} autoPlay muted ref={remoteVideoRef}></video>
          }
        </div>
        <div>
          <video className={`w-full border-4 rounded-lg`} autoPlay ref={myVideoRef}></video>
        </div>
      </div>

      <div className="flex gap-x-4 mt-12 bg-gray-900 justify-center py-3 rounded-md  w-6/6 ">
        <button className="text-3xl bg-lightgreen px-3 py-2 text-white rounded-lg" onClick={toggleVideo}>{videoEnabled ? <FaVideo className="text-3xl" /> : <FaVideoSlash className="" />}</button>
        <button className="text-3xl bg-lightgreen text-white rounded-lg px-3 py-2" onClick={shareScreen}>{<MdOutlineIosShare className="text-3xl" />}</button>
        <button className="text-3xl bg-lightgreen text-white rounded-lg px-3 py-2" onClick={toggleAudio}>{audioEnabled ? <AiFillAudio className="text-3xl" /> : <IoMdMicOff className="text-3xl" />}</button>
        {<button className="text-3xl bg-red-600 text-white rounded-lg px-3 py-2" onClick={leaveRoom}>{<IoExit className="text-3xl" />}</button>}
      </div>
    </>
  )
}

export default TestVideoCall