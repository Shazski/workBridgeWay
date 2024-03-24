import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

const VideoCall = () => {
  const [peerId, setPeerId] = useState('');
  const [receivingCall, setReceivingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const [showRemoteVideo, setShowRemoteVideo] = useState<boolean>(true)
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const currentUserVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerInstance = useRef<Peer | null>(null);
  const callRef = useRef<any>(null);

  useEffect(() => {
    const peer = new Peer();

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = stream;
        }
        setStream(stream);
      });

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      setReceivingCall(true);
      callRef.current = call;

      call.on('stream', (remoteStream: MediaStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
        setCallAccepted(true);
        setReceivingCall(false);
      });
    });

    peerInstance.current = peer;
  }, []);

  const answerCall = () => {
    if (callRef.current && stream) {
      setShowRemoteVideo(true)
      callRef.current.answer(stream);
    }
  };

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
    if (callRef.current) {
      callRef.current.close();
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    setCallAccepted(false);
  };

  return (
    <div className="App">
      <h1>Current user id is {peerId}</h1>
      <input
        type="text"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
        className="border px-4 py-4"
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div className="">
        <h1>Current User</h1>
        <video autoPlay muted={true} ref={currentUserVideoRef} />
        <div>
          <button onClick={toggleVideo}>{videoEnabled ? 'Disable Video' : 'Enable Video'}</button>
          <button onClick={toggleAudio}>{audioEnabled ? 'Mute Audio' : 'Unmute Audio'}</button>
          {callAccepted && <button onClick={leaveRoom}>Leave Room</button>}
        </div>
      </div>
      {receivingCall && !callAccepted && (
        <>
          <h1>Incoming call...</h1>
          <button onClick={answerCall} className="px-2 py-1 bg-lightgreen rounded-lg">
            Answer
          </button>
        </>
      )}
      <div className="">
        <h1>Remote User</h1>
        {
          showRemoteVideo &&
          <video muted autoPlay ref={remoteVideoRef} />
        }
      </div>
    </div>
  );
};

export default VideoCall;