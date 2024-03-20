import { GoDotFill } from "react-icons/go"
import { FiSend } from "react-icons/fi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaPaperclip } from "react-icons/fa";
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import { SocketContext } from "../../context/SocketContext";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useSearchParams } from "react-router-dom";
import { getApplicantsDetails } from "../../redux/actions/company/CompanyActions";
import { TODO, defaultProfile, overrideforUpload } from "../../config/constants";
import NoMessage from '../../assets/images/undraw_Push_notifications_re_t84m.png'
import { updateChatUserList } from "../../redux/reducers/chat/chatSlice";
import { CiImageOn, CiMicrophoneOn } from "react-icons/ci";
import ScaleLoader from "react-spinners/ScaleLoader";
import ReactAudioPlayer from "react-audio-player";
import { IoIosMore } from "react-icons/io";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoDocumentOutline } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "../Modal";
const MessageForm = () => {
  const [message, setMessage] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [showMediaPreview, setShowMediaPreview] = useState<boolean>(false);
  const [showImagesPreview, setShowImagesPreview] = useState<string | string[]>("");
  const [showSendBtn, setShowSendBtn] = useState<boolean>(true);
  const [showVideoPreview, setShowVideoPreview] = useState<string | string[]>("");
  const [showDocumentPreview, setShowDocumentPreview] = useState<string | string[]>("");
  const { socket, currentRoom, onlineUsers, roomMessages, setRoomMessages, setReRender, reRender } = useContext(SocketContext) || {}
  const [searchParams, _] = useSearchParams()

  const audioChunk = useRef<any>([])
  const mediaRecorderRef = useRef<any>(null)
  const [recordings, setRecordings] = useState<string>("")
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [showMediaModal, setShowMediaModal] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => state.user)
  const { chatUserList } = useSelector((state: RootState) => state.chat)
  const { applicantData } = useSelector((state: RootState) => state.company)
  const messageBoxRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<AppDispatch>()
  const chatUserId = searchParams.get("userId")

  const imageRef = useRef<TODO>(null)
  const videoRef = useRef<TODO>(null)
  const documentRef = useRef<TODO>(null)

  const sendMessage = (e: FormEvent<HTMLFormElement>, messageType?: string, msg?: string | string[]) => {
    e.preventDefault();
    setShowEmoji(false);
    setReRender && setReRender(!reRender)
    socket?.emit("send-message", { roomId: currentRoom, roomCreater: user._id, senderId: user._id, message: msg, messageType: messageType, roomJoiner: user._id }); const updatedChatUserList = chatUserList?.map(chatUser => {
      if (chatUser.roomJoiner === chatUserId) {
        return { ...chatUser, lastMessage: message, lastMessageTime: new Date() };
      }
      return chatUser;
    }).sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());

    dispatch(updateChatUserList(updatedChatUserList));
    setMessage("");
  };

  useEffect(() => {
    if (chatUserId!)
      dispatch(getApplicantsDetails({ userId: chatUserId! }))
  }, [searchParams, roomMessages])



  useEffect(() => {
    socket?.off("room-messages").on("room-messages", (messages: { roomId: string }) => {
      if (messages[0].messagesByDate[0].roomId === currentRoom)
        setRoomMessages && setRoomMessages(messages)
    })
  }, [socket, message, chatUserId])

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [roomMessages, uploadLoading]);
  useEffect(() => {
    if (user && socket) {
      socket.emit("new-user", (user._id));
    }
  }, [user, socket]);

  const cloudinaryUpload = async (File: Blob | File, type?: string) => {
    setUploadLoading(true)
    const formData = new FormData();
    formData.append('file', File, type);
    formData.append('upload_preset', 'drtyu0yv');
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dvjggxcc1/raw/upload', {
        method: 'post',
        body: formData,
      })
      const urlData = await res.json()
      setUploadLoading(false)
      return urlData.url
    } catch (err) {
      setUploadLoading(false)
      console.error(err)
    } finally {
      setUploadLoading(false)
    }
  }

  const handleRecord = async (e: any) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setIsRecording(true)
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorderRef.current.ondataavailable = (e: any) => {
        if (e.data.size > 0) {
          audioChunk.current.push(e.data)
        }
      }
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunk.current, { type: 'audio/wav' });
        const messageUrl = await cloudinaryUpload(audioBlob)
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordings(audioUrl)
        setMessage(messageUrl)
        audioChunk.current = [];
        if (messageUrl)
          sendMessage(e, "audio", messageUrl)
        setRecordings("")
      }
      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error recording audio:", error);
    }
  }

  const stopRec = async () => {
    setIsRecording(false)
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop()
    }
  }
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowSendBtn(true)
    if (e.target.files && e.target.files.length > 0) {
      const imageFiles = Array.from(e.target.files)
      setImageFile(imageFiles)
      const imagesArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setShowMediaPreview(true);
      if (imagesArray.length === 1) {
        setShowMediaPreview(true);
        setShowImagesPreview(imagesArray[0]);
      } else {
        setShowMediaPreview(true);
        setShowImagesPreview(imagesArray);
      }
    }
  };
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {

  }
  const handleDocumentChange = (e: ChangeEvent<HTMLInputElement>) => {

  }

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const handleImageUplaod = async (e: TODO) => {
    setShowMediaPreview(false);
    if (Array.isArray(showImagesPreview)) {
      try {
        if (imageFile.length > 0) {
          const urls = await Promise.all(imageFile?.map(async (image) => {
            const url = await cloudinaryUpload(image, "image");
            return url;
          }));

          sendMessage(e, "image", urls)
        }

        setShowImagesPreview("");
      } catch (error) {
        console.error('Error uploading images:', error);
      }
    } else {
      const url = await cloudinaryUpload(imageFile[0], "image");
      sendMessage(e, "image", url)
      setShowImagesPreview("");
    }
  };

  return (
    <>
      {
        currentRoom && chatUserId ? (
          <>
            <div className="realtive">
              <div className='sticky h-[66px] flex items-center shadow-md bg-white z-50 -top-0 border-b-2'>
                <div className='ms-6'>
                  <div className="flex gap-x-3">
                    <img
                      className='w-10 rounded-full border-gray-600 border'
                      src={typeof applicantData?.profilePic === 'string' ? applicantData.profilePic : defaultProfile}
                      alt=""
                    />
                    <div>
                      <h1 className="text-sm font-semibold text-gray-900">{applicantData?.userName}</h1>
                      <div className="flex">
                        <h1 className="font-semibold text-gray-800 text-xs">{onlineUsers?.some(users => users.userId === applicantData?._id) ? "online" : "offline"}</h1>
                        <span className={`text ${onlineUsers?.some(users => users.userId === applicantData?._id) ? "text-green-600" : "text-red-600"}  rounded-full`}><GoDotFill /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white h-[532px] border-b-2 border-gray-200 overflow-y-scroll scrollbar" ref={messageBoxRef}>
                {
                  roomMessages && roomMessages?.sort((a, b) => new Date(a._id).getTime() - new Date(b._id).getTime()).map((message, idx) => (
                    <>
                      <div key={idx} className="flex justify-between items-center bg-white">
                        <div className='border-b-2 w-4/12 border-gray-300'>
                        </div>
                        <h1 className="text-center px-4 py-3 bg-blue-600 text-white rounded-md mt-2">{format(new Date(message._id), 'EEEE ,MMMM dd yyyy')}</h1>
                        <div className='border-b-2 w-4/12  border-gray-300'>
                        </div>
                      </div>
                      {message?.messagesByDate?.map((msg, idx) => (
                        <>
                          <div key={idx} className={`flex mt-4  ${msg.senderId === user._id ? 'justify-end me-2' : 'justify-start'}`}>
                            <div className="">
                              <img
                                className={`w-10 border border-gray-600 rounded-full ${msg.senderId === user._id ? "hidden" : "block"}  h-10 ms-3`}
                                src={msg.senderId === user._id ? "" : (applicantData?.profilePic instanceof File ? URL.createObjectURL(applicantData.profilePic) : applicantData?.profilePic || "")}
                                alt=""
                              />                              <div className={`px-3.5 py-1 max-w-xs mb-4 ${msg.senderId === user._id ? 'me-1 bg-lightgreen rounded-s-xl rounded-b-2xl' : 'ms-12 bg-gray-200 rounded-e-xl rounded-b-xl'}`}>
                                {
                                  msg.messageType === "text" ? <>
                                    <h1 className={`break-all poppins text-sm ${msg.senderId === user._id ? 'text-white' : ''}`}>{msg?.message}</h1>
                                  </> : msg.messageType === "audio" ? <>
                                    <ReactAudioPlayer
                                      src={msg?.message}
                                      controls
                                      className="mt-3"
                                    />
                                  </> : msg.messageType === "video" ? <>
                                    <video src={recordings} controls className={`break-all poppins text-sm ${msg.senderId === user._id ? 'text-white' : ''}`}></video>
                                  </> : msg.messageType === "image" ?
                                    <>
                                      {
                                        Array.isArray(msg?.message) ?
                                          <>
                                            {
                                              <div className="grid grid-cols-2 gap-2 ">
                                                {
                                                  msg.message.length <= 4 ?
                                                    msg?.message?.map((img, idx) => (
                                                      <>
                                                        <div key={idx} className="mt-2">
                                                          <img src={img} alt="" className="w-44 h-24" />
                                                        </div>
                                                      </>
                                                    )) :
                                                    <>
                                                      {
                                                        msg?.message?.slice(0, 3).map((img, idx) => (
                                                          <>
                                                            <div key={idx} className="mt-2">
                                                              <img src={img} alt="" className="w-44 h-24" />
                                                            </div>
                                                          </>
                                                        ))
                                                      }
                                                      <div onClick={() => { setShowMediaPreview(true), setShowImagesPreview(msg?.message), setShowSendBtn(false) }} className={`grid cursor-pointer place-content-center ${msg.senderId === user._id ? 'text-white' : 'text-black'}`}>
                                                        <h1 className="text-5xl"><IoIosMore /></h1>
                                                        <div className="flex gap-x-2">
                                                          <h1 className=" font-bold">{msg?.message.length - 3}</h1>
                                                          <h1 className=" font-bold">More</h1>
                                                        </div>
                                                      </div>
                                                    </>
                                                }
                                              </div>
                                            }
                                          </> :
                                          <>
                                            <img src={msg?.message} alt="" className="w-44 mt-3" />
                                          </>
                                      }
                                    </> : ''
                                }
                                <div className="flex justify-end">
                                  <div>
                                    <h1 className={`text-xs ${msg.senderId === user._id ? 'text-white' : 'text-black'}`}>{format(new Date(msg?.createdAt), "hh:mm a")}</h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </>
                  ))
                }
                {
                  uploadLoading && <>
                    <div className="flex justify-end">
                      <ScaleLoader
                        color={'#197195'}
                        loading={uploadLoading}
                        cssOverride={overrideforUpload}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                  </>
                }
              </div>
              <Modal isVisible={showMediaPreview} onClose={() => setShowMediaPreview(false)}>
                {Array.isArray(showImagesPreview) ? (
                  <Slider {...slickSettings}>
                    {showImagesPreview.map((img, idx) => (
                      <div key={idx}>
                        <img src={img} alt="" className="w-full h-72" />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <img src={showImagesPreview} alt="" className="w-full h-72" />
                )}
                {
                  showSendBtn &&
                  <>
                    <button onClick={(e) => handleImageUplaod(e)} className="bg-lightgreen font-semibold text-white px-3 py-2 rounded-md mt-6">Send</button>
                  </>
                }
              </Modal>
              <input type="file" hidden multiple onChange={handleImageChange} ref={imageRef} accept="image/*" />
              <input type="file" hidden onChange={handleVideoChange} ref={videoRef} accept="video/*" />
              <input type="file" hidden onChange={handleDocumentChange} ref={documentRef} accept=".pdf, .doc, .docx" />
              <div className="absolute ms-10 bottom-3 w-7/12">
                <EmojiPicker className=" bottom-2 ms-[460px]" height={"410px"} lazyLoadEmojis width={"350px"} open={showEmoji} reactionsDefaultOpen={false} onEmojiClick={(data) => setMessage((prev) => prev + data.emoji)} />
                <form action="" onSubmit={(e) => sendMessage(e, "text", message)}>
                  <div className="flex gap-x-3">
                    <FaPaperclip onClick={() => setShowMediaModal(!showMediaModal)} className="absolute left-2 bottom-32 text-gray-600 text-lg top-2.5 cursor-pointer" />
                    <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" name="message" className="text-sm bg-blue-50 py-2 w-full outline-none text-gray-600 px-8 border border-gray-400 rounded-xl" placeholder="Message..." />
                    <CiMicrophoneOn onMouseDown={handleRecord} onMouseUp={stopRec} onMouseLeave={stopRec} className={`text-2xl ${isRecording ? 'animate-bounce' : ''} cursor-pointer text-gray-700 absolute right-20 bottom-2`} />
                    <MdOutlineEmojiEmotions onClick={() => setShowEmoji(!showEmoji)} className="text-2xl cursor-pointer text-gray-700 absolute right-28 bottom-2" />
                    <button className={`bg-lightgreen px-3 pb-2  cursor-pointer py-2 w-min rounded-lg disabled:opacity-70 disabled:cursor-not-allowed`} disabled={message === ""}>
                      <FiSend className="  text-xl text-white me-2" />
                    </button>
                  </div>
                </form>
                <div className={`absolute duration-300 transition-all ease-in-out ${showMediaModal ? 'w-52 h-24' : 'w-0 h-0'} bottom-12 rounded-e-xl rounded-t-xl bg-lightgreen ms-6`}>
                  {
                    showMediaModal && <>
                      <div className="flex flex-wrap gap-x-5 mt-6 ms-9 text-white">
                        <div>
                          <CiImageOn className="text-3xl cursor-pointer" onClick={() => { imageRef.current.click(), setShowMediaModal(false) }} />
                          <label className="text-xs" htmlFor="">photos</label>
                        </div>
                        <div>
                          <HiOutlineVideoCamera className="text-3xl cursor-pointer" onClick={() => { videoRef.current.click(), setShowMediaModal(false) }} />
                          <label className="text-xs" htmlFor="">video</label>
                        </div>
                        <div>
                          <IoDocumentOutline className="text-3xl cursor-pointer" onClick={() => { documentRef.current.click(), setShowMediaModal(false) }} />
                          <label className="text-xs" htmlFor="">Files</label>
                        </div>
                      </div>
                    </>
                  }
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <h1 className="poppins text-2xl font-bold mt-12">Select a Chat</h1>
              <img src={NoMessage} alt="" className="w-3/4 mt-20 ms-12" />
            </div>
          </>
        )
      }

    </>
  )
}

export default MessageForm