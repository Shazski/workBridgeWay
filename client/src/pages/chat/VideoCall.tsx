import { useContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { SocketContext } from "../../context/SocketContext";
import { TODO } from "../../config/constants";

const VideoCall = () => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState<TODO>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const { socket } = useContext(SocketContext) || {};

  const myVideo = useRef<TODO>("");
  const userVideo = useRef<TODO>("");
  const connectionRef = useRef<TODO>("");

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
      setStream(stream)
      myVideo.current.srcObject = stream;
    });

    socket && socket.on('me', (id) => {
      setMe(id);
    });

    socket && socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      console.log(data.signal,"data.signal")
      setCallerSignal(data.signal);
    });

  }, [socket]);

  const callUser = (id) => {
    const peer = new Peer({
      initiator:true,
      trickle:false,
      stream: stream
    })
    console.log("🚀 ~ file: VideoCall.tsx:51 ~ callUser ~ peer:", peer)
    peer.on("signal", (data) => {
      console.log("🚀 ~ file: VideoCall.tsx:51 ~ peer.on ~ data:", data)
      socket && socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name
      })
    })

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream

    })
    socket && socket.on("callAccepted", (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    });

    peer.on("signal", (data) => {
      socket && socket?.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
		<>
			<h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
		<div className="container">
			<div className="video-container">
				<div className="video">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
					null}
				</div>
			</div>
			<div className="myId">
				<input
					id="filled-basic"
					value={name}
					onChange={(e) => setName(e.target.value)}
          placeholder="name"
					style={{ marginBottom: "20px" }}
				/>

						{me}


				<input
					id="filled-basic"
					value={idToCall}
          placeholder="id to cal"
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<button  onClick={leaveCall}>
							End Call
						</button>
					) : (
						<button   onClick={() => callUser(idToCall)}>
							callUser
						</button>
					)}
					{idToCall}
				</div>
			</div>
			<div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >{name} is calling...</h1>
						<button onClick={answerCall}>
							Answer
						</button>
					</div>
				) : null}
			</div>
		</div>
		</>
	)
};

export default VideoCall;
