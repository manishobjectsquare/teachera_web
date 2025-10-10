// import { useState, useEffect } from "react";


// import axios from "axios";

// import ChatChannelList from "../Components/ChatModal/ChatChannelList";
// import ChatMessageArea from "../Components/ChatModal/ChatMessageArea";
// import ChatMemberList from "../Components/ChatModal/ChatMemberList";
// import { baseUrl } from "../config/baseUrl";
// import { socket } from "../config/socket";
// const ChatPage = ({ onClose }) => {
//     const { profileData } = JSON.parse(localStorage.getItem("profileData")) || {};
//     let currentUser = {
//         name: profileData?.userName,
//         avatar: profileData?.userImage,
//     }
//     const [selectedChannel, setSelectedChannel] = useState(null); // Changed from "general" to null
//     const [messages, setMessages] = useState({});
//     const [onlineUsers, setOnlineUsers] = useState([]);
//     const [isMobileView, setIsMobileView] = useState(false);
//     const [showMemberList, setShowMemberList] = useState(false);
//     const [modalRef, setModalRef] = useState(null);
//     const [showChannels, setShowChannels] = useState(false);
//     const [channels, setChannels] = useState([]);

//     const userId = localStorage.getItem("userId");
//     useEffect(() => {
//         const fetchChatGroups = async () => {
//             try {
//                 const response = await axios.get(
//                     `${baseUrl}/api/v1/web/chat/group-chat/${userId}`
//                 );
//                 console.log(response.data.chatGroups);

//                 if (response.data.status) {
//                     setChannels(response.data.chatGroups);
//                 } else {
//                 }
//             } catch (err) {
//                 console.error("Error fetching chat groups:", err);
//                 setError("An error occurred while fetching chat groups");
//             }
//         };

//         if (userId) {
//             fetchChatGroups();
//         }
//     }, [userId]);

//     // Mock online users
//     useEffect(() => {
//         setOnlineUsers([
//             {
//                 id: 1,
//                 name: "Sarah Johnson",
//                 avatar: "/placeholder.svg",
//                 status: "online",
//                 role: "Student",
//             },
//             {
//                 id: 2,
//                 name: "Mike Chen",
//                 avatar: "/placeholder.svg",
//                 status: "online",
//                 role: "Instructor",
//             },
//             {
//                 id: 3,
//                 name: "Emily Davis",
//                 avatar: "/placeholder.svg",
//                 status: "away",
//                 role: "Student",
//             },
//             {
//                 id: 4,
//                 name: "Alex Rodriguez",
//                 avatar: "/placeholder.svg",
//                 status: "online",
//                 role: "Student",
//             },
//             {
//                 id: 5,
//                 name: "Lisa Wang",
//                 avatar: "/placeholder.svg",
//                 status: "busy",
//                 role: "Moderator",
//             },
//         ]);
//     }, []);

//     // Initialize messages for channels


//     // Handle responsive behavior
//     useEffect(() => {
//         const handleResize = () => {
//             const mobile = window.innerWidth < 768;
//             setIsMobileView(mobile);
//             setShowChannels(!mobile); // Show channels by default on desktop, hide on mobile
//         };

//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // Handle click outside to close
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (modalRef && modalRef.contains(event.target)) {
//                 return;
//             }
//             onClose();
//         };



//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//             document.body.style.overflow = "unset";
//         };
//     }, [onClose, modalRef]);

//     const handleSendMessage = (content, type = "text") => {
//         const newMessage = {
//             id: Date.now(),
//             user: currentUser,
//             content,
//             timestamp: new Date(),
//             type,
//         };

//         socket.emit("send-message", {
//             chatGroupId: selectedChannel,
//             senderId: userId,
//             content: content,
//             type: type,
//         });

//         // setMessages((prev) => ({
//         //   ...prev,
//         //   [selectedChannel]: [...(prev[selectedChannel] || []), newMessage],
//         // }));
//     };

//     const handleChannelSelect = (channelId) => {
//         setSelectedChannel(channelId);
//         setShowChannels(false); // Auto-close channels after selection
//     };



//     return (
//         <div className="chat-modal-overlay">
//             <div className="chat-modal" ref={setModalRef}>
//                 <div className="chat-header">
//                     <div className="chat-title">
//                         <i className="fas fa-comments me-2"></i>
//                         <span>Teachera Community</span>
//                     </div>
//                     <div className="chat-controls">
//                         <button
//                             className="channel-toggle-btn"
//                             onClick={() => setShowChannels(!showChannels)}
//                             title="Toggle Channels"
//                         >
//                             Categories
//                         </button>
//                         {!isMobileView && (
//                             <button
//                                 className="member-toggle-btn"
//                                 onClick={() => setShowMemberList(!showMemberList)}
//                                 title="Toggle Member List"
//                             >
//                                 <i className="fas fa-users"></i>
//                             </button>
//                         )}
//                         <button className="close-btn" onClick={onClose}>
//                             <i className="fas fa-times"></i>
//                         </button>
//                     </div>
//                 </div>

//                 <div className="chat-body">
//                     {showChannels && (
//                         <ChatChannelList
//                             channels={channels}
//                             selectedChannel={selectedChannel}
//                             onChannelSelect={handleChannelSelect}
//                             isMobileView={isMobileView}
//                         />
//                     )}

//                     <ChatMessageArea
//                         channel={channels?.find((c) => c._id === selectedChannel)}
//                         messages={messages[selectedChannel] || []}
//                         onSendMessage={handleSendMessage}
//                         currentUser={currentUser}
//                         isMobileView={isMobileView}
//                     />

//                     {!isMobileView && showMemberList && (
//                         <ChatMemberList
//                             users={onlineUsers}
//                             channelMemberCount={
//                                 channels?.find((c) => c.id === selectedChannel)?.memberCount
//                             }
//                         />
//                     )}
//                 </div>
//             </div>

//             <style jsx>{`
//         // .chat-modal-overlay {
//         //   position: fixed;
//         //   top: 0;
//         //   left: 0;
//         //   right: 0;
//         //   bottom: 0;
//         //   background: rgba(0, 0, 0, 0.5);
//         //   display: flex;
//         //   align-items: center;
//         //   justify-content: flex-end; /* Changed from center to flex-end */
//         //   z-index: 9999;
//         //   padding: 20px;
//         // }

//         .chat-modal {
//           background: white;
//           border-radius: 12px;
//           width: 100%;
//           max-width: 1200px;
//           height: 80vh;
//           max-height: 700px;
//           display: flex;
//           flex-direction: column;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
//           overflow: hidden;
//         }

//         .chat-header {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           padding: 16px 20px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//         }

//         .chat-title {
//           display: flex;
//           align-items: center;
//           font-weight: 600;
//           font-size: 18px;
//         }

//         .chat-controls {
//           display: flex;
//           gap: 8px;
//         }

//         .member-toggle-btn,
//         .close-btn {
//           background: rgba(255, 255, 255, 0.1);
//           border: none;
//           color: white;
//           width: 36px;
//           height: 36px;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .channel-toggle-btn {
//           background: rgba(255, 255, 255, 0.1);
//           border: none;
//           color: white;

//           height: 36px;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .channel-toggle-btn:hover,
//         .member-toggle-btn:hover,
//         .close-btn:hover {
//           background: rgba(255, 255, 255, 0.2);
//         }

//         .chat-body {
//           display: flex;
//           flex: 1;
//           overflow: hidden;
//         }

//         @media (max-width: 768px) {
//           .chat-modal {
//             height: 90vh;
//             max-height: none;
//             margin: 0;
//             border-radius: 12px 12px 0 0;
//           }

//           .chat-modal-overlay {
//             padding: 0;
//             align-items: flex-end;
//           }
//         }
//       `}</style>
//         </div>
//     );
// };

// export default ChatPage;




"use client"

import { useState, useEffect } from "react"
import { useUser } from "../Context/UserContext"
import axios from "axios"
import { baseUrl } from "../config/baseUrl"
import { socket } from "../config/socket"
import ChatChannelList from "../Components/ChatModal/ChatChannelList"
import ChatMessageArea from "../Components/ChatModal/ChatMessageArea"
import ChatMemberList from "../Components/ChatModal/ChatMemberList"


export default function CommunityChatPage() {
    const { user } = useUser()

    const currentUser = user
        ? {
            name: user.fullName || user.username,
            avatar: user.profilePicture || "/placeholder.svg",
            userId: user.userId,
            role: user.role,
        }
        : { name: "Guest", avatar: "/placeholder.svg", userId: null, role: "Student" }

    const [selectedChannel, setSelectedChannel] = useState(null)
    const [channelMessages, setChannelMessages] = useState({}) // Stores messages per channelId { channelId: [msg1, msg2] }
    const [onlineUsers, setOnlineUsers] = useState([])
    const [isMobileView, setIsMobileView] = useState(false)
    const [showMemberList, setShowMemberList] = useState(false) // Default to false, true on desktop
    const [showChannels, setShowChannels] = useState(true) // Default to true, false on mobile
    const [channels, setChannels] = useState([])

    // Fetch chat groups (channels)
    useEffect(() => {
        const fetchChatGroups = async () => {
            if (!currentUser?.userId) {
                // console.log("User not available for fetching chat groups");
                // setChannels([]); // Or handle as appropriate
                return
            }
            try {
                const response = await axios.get(`${baseUrl}/api/v1/web/chat/group-chat/${currentUser.userId}`)
                if (response.data.status) {
                    setChannels(response.data.chatGroups)
                } else {
                    setChannels([])
                }
            } catch (err) {
                console.error("Error fetching chat groups:", err)
                setChannels([])
            }
        }

        fetchChatGroups()
    }, [currentUser?.userId])


    useEffect(() => {
        setOnlineUsers([
            { id: "1", name: "Sarah Johnson", avatar: "/placeholder.svg", status: "online", role: "Student" },
            { id: "2", name: "Mike Chen", avatar: "/placeholder.svg", status: "online", role: "Instructor" },
            { id: "3", name: "Emily Davis", avatar: "/placeholder.svg", status: "away", role: "Student" },
        ])
    }, [])

    // Handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768
            setIsMobileView(mobile)
            if (mobile) {
                setShowChannels(false)
                setShowMemberList(false)
            } else {
                setShowChannels(true)
                setShowMemberList(true)
            }
        }

        handleResize() // Initial check
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const handleSendMessage = (content, type = "text") => {
        if (!selectedChannel || !currentUser?.userId) {
            console.error("Cannot send message: channel or user not selected/available.")
            return
        }
        socket.emit("send-message", {
            chatGroupId: selectedChannel,
            senderId: currentUser.userId,
            content: content,
            type: type,
        })
    }

    const handleChannelSelect = (channelId) => {
        setSelectedChannel(channelId)
        if (isMobileView) {
            setShowChannels(false)
        }
    }

    const currentChannelDetails = channels.find((c) => c._id === selectedChannel)

    return (
        <div className="chat-page-container ">
            <div className="chat-page-header">
                <div className="chat-page-title">
                    <i className="fas fa-comments me-2"></i>
                    <span>Teachera Community</span>
                </div>
                <div className="chat-page-controls">
                    <button
                        className="control-btn channel-toggle-btn"
                        onClick={() => setShowChannels(!showChannels)}
                        title="Toggle Categories"
                    >
                        <i className={`fas ${isMobileView ? "fa-bars" : "fa-list-alt"} me-1`}></i>
                        {isMobileView ? "" : "Categories"}
                    </button>
                    {/* {!isMobileView && (
                        <button
                            className="control-btn member-toggle-btn"
                            onClick={() => setShowMemberList(!showMemberList)}
                            title="Toggle Member List"
                        >
                            <i className="fas fa-users"></i>
                        </button>
                    )} */}
                </div>
            </div>

            <div className="chat-page-body">
                {showChannels && (
                    <ChatChannelList
                        channels={channels}
                        selectedChannel={selectedChannel}
                        onChannelSelect={handleChannelSelect}
                        isMobileView={isMobileView}
                    />
                )}

                <ChatMessageArea
                    key={selectedChannel}
                    channel={currentChannelDetails}
                    onSendMessage={handleSendMessage}
                    currentUser={currentUser}
                    isMobileView={isMobileView}
                />

                {!isMobileView && showMemberList && currentChannelDetails && (
                    <ChatMemberList
                        users={onlineUsers}
                        channelMemberCount={currentChannelDetails?.memberCount || 0}
                    />
                )}
            </div>

            <style jsx>{`
        .chat-page-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh); /* Adjusted for header height */
          width: 100%;
          background: #ffffff;
          overflow: hidden; /* Prevent scrollbars on the main container */
        }

        .chat-page-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 20px; /* Reduced padding slightly */
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0; /* Prevent header from shrinking */
          position: sticky; /* Make header sticky */
          top: 0;
          z-index: 1000; /* Ensure header is above other content */
        }

        .chat-page-title {
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 1.1rem; /* Slightly larger title */
        }

        .chat-page-controls {
          display: flex;
          gap: 10px; /* Increased gap */
        }

        .control-btn {
          background: rgba(255, 255, 255, 0.15); /* Slightly more visible */
          border: none;
          color: white;
          height: 38px; /* Slightly taller buttons */
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 12px;
          font-size: 0.9rem;
        }
        
        .member-toggle-btn {
            width: 38px; /* Keep icon-only button square */
            padding: 0;
        }

        .control-btn:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .chat-page-body {
          display: flex;
          flex-grow: 1; /* Allow body to take remaining space */
          overflow: hidden; /* Crucial for internal scrolling of children */
          position: relative; /* For absolute positioning of mobile channel list */
        }
        
        /* Ensure ChatChannelList, ChatMessageArea, ChatMemberList handle their own scrolling */
        /* Their internal containers with 'overflow-y: auto' will work within this flex layout */

        @media (max-width: 768px) {
          .chat-page-header {
            padding: 10px 15px;
          }
          .chat-page-title {
            font-size: 1rem;
          }
          .control-btn {
            height: 36px;
            padding: 0 10px;
            font-size: 0.85rem;
          }
          .channel-toggle-btn i {
            font-size: 1.1rem; /* Make hamburger icon more prominent */
          }
        }
      `}</style>
        </div>
    )
}
