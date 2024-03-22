import { GoDotFill } from "react-icons/go"
import { FiSend } from "react-icons/fi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaPaperclip } from "react-icons/fa";
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import { CiMicrophoneOn } from "react-icons/ci";
import ReactAudioPlayer from 'react-audio-player';
import { SocketContext } from "../../context/SocketContext";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useSearchParams } from "react-router-dom";
import { TODO, defaultProfile, overrideforTyping, overrideforUpload } from "../../config/constants";
import { getCompanyById } from "../../redux/actions/user/userActions";
import NoMessage from '../../assets/images/undraw_Push_notifications_re_t84m.png'
import { updateChatCompanyList } from "../../redux/reducers/chat/chatSlice";
import { CiImageOn } from "react-icons/ci";
import { IoDocumentOutline } from "react-icons/io5";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoIosMore } from "react-icons/io";
import ScaleLoader from "react-spinners/ScaleLoader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "../Modal";
import BeatLoader from "react-spinners/BeatLoader";
import { IoMdCheckmark } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
const UserMessageForm = () => {
  const [message, setMessage] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [showSendBtn, setShowSendBtn] = useState<boolean>(true);
  const { socket, currentRoom, onlineUsers, roomMessages, setRoomMessages, setReRender, reRender } = useContext(SocketContext) || {}
  const [searchParams, _] = useSearchParams()

  const audioChunk = useRef<any>([])
  const mediaRecorderRef = useRef<any>(null)
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [showMediaModal, setShowMediaModal] = useState<boolean>(false);

  const [showImagesPreview, setShowImagesPreview] = useState<string | string[]>("");
  const [showVideoPreview, setShowVideoPreview] = useState<string>("");
  const [showDocumentPreview, setShowDocumentPreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const [showMediaPreview, setShowMediaPreview] = useState<boolean>(false);
  const [showVideoPreviewModal, setShowVideoPreviewModal] = useState<boolean>(false);
  const [showDocumentPreviewModal, setShowDocumentPreviewModal] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => state.user)
  const { companyDetails, chatCompanyList } = useSelector((state: RootState) => state.chat)
  const messageBoxRef = useRef<HTMLDivElement | null>(null);

  const [typingUserId, setTypingUserId] = useState<string>("");
  const [typingRoom, setTypingRoom] = useState<string>("");

  const imageRef = useRef<TODO>(null)
  const videoRef = useRef<TODO>(null)
  const documentRef = useRef<TODO>(null)

  const chatCompanyId = searchParams.get("companyId")
  const dispatch = useDispatch<AppDispatch>()

  const updateCompanyList = (roomId, message) => {
    const updatedChatCompanyList = chatCompanyList.map(chatUser => {
      if (chatUser.roomCreater === roomId) {
        return { ...chatUser, lastMessage: message, lastMessageTime: new Date() };
      }
      return chatUser;
    }).sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());

    dispatch(updateChatCompanyList(updatedChatCompanyList));

  };

  const sendMessage = (e: FormEvent<HTMLFormElement>, messageType?: string, msg?: string | string[]) => {
    e.preventDefault();
    setShowEmoji(false);
    setReRender && setReRender(!reRender)
    socket?.emit("send-message", { roomId: currentRoom, roomCreater: chatCompanyId, senderId: user._id, message: msg, messageType: messageType, roomJoiner: user._id });

    updateCompanyList(currentRoom, message);

    setMessage("");
  };
  useEffect(() => {
    if (user && socket) {
      socket.emit("new-user", (user._id));
    }
  }, [user, socket]);

  useEffect(() => {
    if (chatCompanyId)
      dispatch(getCompanyById(chatCompanyId!))
  }, [searchParams])

  useEffect(() => {
    socket?.off("room-messages").on("room-messages", (messages) => {
      if (messages[0].messagesByDate[0].roomId === currentRoom)
        setRoomMessages && setRoomMessages(messages)
    })
  }, [socket, message, currentRoom, reRender])

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [roomMessages, uploadLoading, typingUserId]);


  const cloudinaryUpload = async (File: Blob | File, uploadType: string, type?: string) => {
    setUploadLoading(true)
    const formData = new FormData();
    formData.append('file', File, type);
    formData.append('upload_preset', 'drtyu0yv');
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dvjggxcc1/${uploadType}/upload`, {
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
        const messageUrl = await cloudinaryUpload(audioBlob, "raw", "audio.wav")
        setMessage(messageUrl)
        audioChunk.current = [];
        if (messageUrl)
          sendMessage(e, "audio", messageUrl)
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
        setShowImagesPreview(imagesArray[0]);
        imageRef.current.value = null
      } else {
        setShowImagesPreview(imagesArray);
        imageRef.current.value = null
      }
    }
  };
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFile(e.target.files[0])
      const videoPreview = URL.createObjectURL(e.target.files[0])
      setShowVideoPreviewModal(true);
      setShowVideoPreview(videoPreview)
      videoRef.current.value = null;
    }
  }
  const handleDocumentChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocumentFile(e.target.files[0])
      const videoPreview = URL.createObjectURL(e.target.files[0])
      setShowDocumentPreviewModal(true);
      setShowDocumentPreview(videoPreview)
      documentRef.current.value = null;
    }
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
            const url = await cloudinaryUpload(image, "image", "image");
            return url;
          }));

          sendMessage(e, "image", urls)
        }

        setShowImagesPreview("");
      } catch (error) {
        console.error('Error uploading images:', error);
      }
    } else {
      const url = await cloudinaryUpload(imageFile[0], "image", "image");
      sendMessage(e, "image", url)
      setShowImagesPreview("");
    }
  };

  const handleVideoUpload = async (e: TODO) => {
    setShowVideoPreviewModal(false)

    const videoUrl = await cloudinaryUpload(videoFile!, "video", "video");

    sendMessage(e, "video", videoUrl)
    setShowVideoPreview("")
  }
  const handleDocumentUpload = async (e: TODO) => {
    setShowDocumentPreviewModal(false)

    const documentUrl = await cloudinaryUpload(documentFile!, "image", "file");

    sendMessage(e, "file", documentUrl)
    setShowVideoPreview("")
  }

  const handleTyping = (e: ChangeEvent<HTMLInputElement>, senderId: string) => {
    setMessage(e.target.value)
    socket?.emit("typing", senderId, currentRoom)
    setTimeout(() => {
      socket?.emit("typingStoped", senderId, currentRoom)
    }, 2000)
  }
  useEffect(() => {
    socket?.on("typing", (senderId: string, roomId: string) => {
      if (senderId === companyDetails?._id) {
        setTypingUserId(senderId)
        setTypingRoom(roomId)
      }
    })
  }, [socket])

  useEffect(() => {
    socket?.on("typingStoped", (senderId: string) => {
      if (senderId === companyDetails?._id) {
        setTypingUserId("")
        setTypingRoom("")
      }
    })
  }, [socket])

  return (
    <>
      {
        chatCompanyId && currentRoom ? (
          <div className="realtive">
            <div className='sticky h-[66px] flex items-center shadow-md bg-white z-50 top-16 border-b-2'>
              <div className='ms-6'>
                <div className="flex gap-x-3">
                  <img
                    className='w-10 rounded-full border-gray-600 border'
                    src={typeof companyDetails?.companyLogo === 'string' ? companyDetails?.companyLogo : defaultProfile}
                    alt=""
                  />
                  <div>
                    <h1 className="text-sm font-semibold text-gray-900">{companyDetails?.name}</h1>
                    <div className="flex">
                      <h1 className="font-semibold text-gray-800 text-xs">{typingUserId.length > 0 && typingUserId === companyDetails?._id && typingRoom === currentRoom ? 'Typing...' : onlineUsers?.some(users => users.userId === companyDetails?._id) ? "online" : "offline"}</h1>
                      <span className={`text ${onlineUsers?.some(users => users.userId === companyDetails?._id) ? "text-green-600" : "text-red-600"}  rounded-full`}><GoDotFill /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white h-[532px] border-b-2 border-gray-200 overflow-y-scroll scrollbar" ref={messageBoxRef}>
              {
                currentRoom && roomMessages && roomMessages?.sort((a, b) => new Date(a._id).getTime() - new Date(b._id).getTime()).map((message, idx) => (
                  <>
                    <div key={idx} className="flex justify-between items-center bg-white">
                      <div className='border-b-2 w-4/12 border-gray-300'>
                      </div>
                      <h1 className="text-center px-4 py-3 bg-blue-gray-300 text-white rounded-full mt-2">{format(new Date(message._id), 'EEEE ,MMMM dd yyyy')}</h1>
                      <div className='border-b-2 w-4/12  border-gray-300'>
                      </div>
                    </div>
                    {message?.messagesByDate?.map((msg, idx) => (
                      <>
                        <div key={idx} className={`flex mt-4  ${msg.senderId === user._id ? 'justify-end me-2' : 'justify-start'}`}>
                          {idx === 0 || msg.senderId !== message.messagesByDate[idx - 1].senderId ? (
                            <div className="">
                              <img className={`w-10 border border-gray-600 rounded-full ${msg.senderId === user._id ? "hidden" : "block"}  h-10 ms-3`} src={msg.senderId === user._id ? "" : companyDetails?.companyLogo || ""} alt="" />
                            </div>
                          ) : (
                            <div className="" />
                          )}
                          <div className="">
                            <div className={`px-3.5 py-1.5 max-w-xs mb-4 ${msg.senderId === user._id ? 'me-1 bg-lightgreen rounded-s-xl -mt-5 rounded-b-2xl' : `bg-gray-200 rounded-e-xl rounded-b-xl ${idx === 0 || msg.senderId !== message.messagesByDate[idx - 1].senderId ? 'ms-2 mt-8' : 'ms-16 -mt-5'}`}`}>
                              {
                                msg.messageType === "text" ? <>
                                  <h1 className={`break-all poppins text-sm ${msg.senderId === user._id ? 'text-white' : ''}`}>{msg?.message}</h1>
                                </> : msg.messageType === "audio" ? <>
                                  <ReactAudioPlayer
                                    src={msg?.message}
                                    controls
                                    className="mt-3"
                                  />
                                </> :
                                  msg.messageType === "file" ? <>
                                    <a href={msg.message} download={`document${idx}`} className={`flex gap-x-3 ${msg.senderId === user._id ? 'text-white' : 'text-black'} `}>
                                      <div className={`border  mt-2 rounded-full ${msg.senderId === user._id ? 'border-white' : 'border-black'}`}>
                                        <IoDocumentOutline className="text-xl mx-2 my-2" />
                                      </div>
                                      <h1 className="mt-3">Document</h1>
                                    </a>
                                  </> :
                                    msg.messageType === "video" ?
                                      <>
                                        <video src={msg?.message} controls className={`break-all mt-3 poppins text-sm ${msg.senderId === user._id ? 'text-white' : ''}`}></video>
                                      </>
                                      :
                                      msg.messageType === "image" ?
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
                                                          <div onClick={() => { setShowMediaPreview(true), setShowImagesPreview(msg?.message), setShowSendBtn(false) }} className={`grid cursor-pointer place-content-center relative ${msg.senderId === user._id ? 'text-white' : 'text-black'}`}>
                                                            <img src={msg.message[3]} alt="" className="w-44 h-24 blur-md" />
                                                            <div className="absolute ms-12 mt-2">
                                                              <h1 className="text-5xl"><IoIosMore /></h1>
                                                              <div className="flex gap-x-2">
                                                                <h1 className=" font-bold">{msg?.message.length - 3}</h1>
                                                                <h1 className=" font-bold">More</h1>
                                                              </div>
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
                                <div className="flex text-white">
                                  <h1 className={`text-xs ${msg.senderId === user._id ? 'text-white' : 'text-black'}`}>{format(new Date(msg?.createdAt), "hh:mm a")}</h1>
                                  {
                                    msg.senderId === user._id ? <>
                                      {

                                        msg?.recieverSeen === true ?
                                          <>
                                            <IoCheckmarkDoneSharp />
                                          </> : <>
                                            <IoMdCheckmark />
                                          </>
                                      }
                                    </> : ""
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                    {
                      typingUserId.length > 0 && typingUserId === companyDetails?._id && typingRoom === currentRoom &&
                      <div className=" w-min rounded-md ms-16 mb-3">
                        <BeatLoader
                          color={'#808080'}
                          loading={true}
                          cssOverride={overrideforTyping}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                          size={10}
                        />
                      </div>
                    }
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
                      <img src={img} alt="" className="w-full h-72 object-contain" />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img src={showImagesPreview} alt="" className="w-full h-72" />
              )}
              <h1 className="mb-4">
              </h1>
              {
                showSendBtn &&
                <>
                  <button onClick={(e) => handleImageUplaod(e)} className="bg-lightgreen font-semibold text-white px-3 py-2 rounded-md mt-6">Send</button>
                </>
              }
            </Modal>
            <Modal isVisible={showVideoPreviewModal} onClose={() => setShowVideoPreviewModal(false)}>
              <video controls src={showVideoPreview}></video>
              <button onClick={(e) => handleVideoUpload(e)} className="bg-lightgreen font-semibold text-white px-3 py-2 rounded-md mt-6">Send</button>
            </Modal>
            <Modal isVisible={showDocumentPreviewModal} onClose={() => setShowVideoPreviewModal(false)}>
              <div className="flex flex-col items-center">
                <iframe width={"300px"} height={"400px"} src={showDocumentPreview}></iframe>
                <button onClick={(e) => handleDocumentUpload(e)} className="bg-lightgreen font-semibold text-white px-3 py-2 rounded-md mt-6">Send</button>
              </div>
            </Modal>
            <input type="file" hidden multiple onChange={handleImageChange} ref={imageRef} accept="image/*" />
            <input type="file" hidden onChange={handleVideoChange} ref={videoRef} accept="video/*" />
            <input type="file" hidden onChange={handleDocumentChange} ref={documentRef} accept=".pdf, .doc, .docx" />
            <div className="absolute ms-5 bottom-2 w-7/12">
              <EmojiPicker className=" bottom-2 ms-[460px]" height={"410px"} lazyLoadEmojis width={"350px"} open={showEmoji} reactionsDefaultOpen={false} onEmojiClick={(data) => setMessage((prev) => prev + data.emoji)} />
              <form action="" onSubmit={(e) => sendMessage(e, "text", message)}>
                <div className="flex gap-x-3">
                  <FaPaperclip onClick={() => setShowMediaModal(!showMediaModal)} className="absolute left-2 bottom-32 text-gray-600 text-lg top-2.5 cursor-pointer" />
                  <input value={message} onChange={(e) => handleTyping(e, user._id)} type="text" name="message" className="text-sm bg-blue-50 py-2 w-full outline-none text-gray-600 px-8 border border-gray-400 rounded-xl" placeholder="Message..." />
                  <MdOutlineEmojiEmotions onClick={() => setShowEmoji(!showEmoji)} className="text-2xl cursor-pointer text-gray-700 absolute right-28 bottom-2" />
                  <CiMicrophoneOn onMouseDown={handleRecord} onMouseLeave={stopRec} onMouseUp={stopRec} className={`text-2xl ${isRecording ? 'animate-bounce' : ''} cursor-pointer text-gray-700 absolute right-20 bottom-2`} />
                  <button className={`bg-lightgreen px-3 pb-2  cursor-pointer py-2 w-min rounded-lg disabled:opacity-70 disabled:cursor-not-allowed`} disabled={message === ""}>
                    <FiSend className="  text-xl text-white me-2" />
                  </button>
                </div>
              </form>
              <div className={`absolute duration-300 transition-all ease-in-out ${showMediaModal ? 'w-52 h-24' : 'w-0 h-0'} bottom-12 rounded-e-xl rounded-t-xl bg-lightgreen ms-6`}>
                {
                  showMediaModal && <>
                    <div className="flex flex-wrap absolute gap-x-5 mt-6 ms-9 text-white">
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

export default UserMessageForm