import { useState, useEffect } from "react";
import ChatChannelList from "./ChatChannelList";
import ChatMessageArea from "./ChatMessageArea";
import ChatMemberList from "./ChatMemberList";
import { useUser } from "../../Context/UserContext";
import axios from "axios";
import { socket } from "../../config/socket";
import { baseUrl } from "../../config/baseUrl";
const ChatModal = ({ isOpen, onClose, currentUser }) => {
  let { user } = useUser();
  const [selectedChannel, setSelectedChannel] = useState(null); // Changed from "general" to null
  const [messages, setMessages] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showMemberList, setShowMemberList] = useState(false);
  const [modalRef, setModalRef] = useState(null);
  const [showChannels, setShowChannels] = useState(false);
  const [channels, setChannels] = useState(false);



  useEffect(() => {
    const fetchChatGroups = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/v1/web/chat/group-chat/${user?.userId}`
        );
        console.log(response.data.chatGroups);

        if (response.data.status) {
          setChannels(response.data.chatGroups);
        } else {
        }
      } catch (err) {
        console.error("Error fetching chat groups:", err);
        setError("An error occurred while fetching chat groups");
      }
    };

    if (user?.userId) {
      fetchChatGroups();
    }
  }, [user?.userId]);

  // Mock online users
  useEffect(() => {
    setOnlineUsers([
      {
        id: 1,
        name: "Sarah Johnson",
        avatar: "/placeholder.svg",
        status: "online",
        role: "Student",
      },
      {
        id: 2,
        name: "Mike Chen",
        avatar: "/placeholder.svg",
        status: "online",
        role: "Instructor",
      },
      {
        id: 3,
        name: "Emily Davis",
        avatar: "/placeholder.svg",
        status: "away",
        role: "Student",
      },
      {
        id: 4,
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg",
        status: "online",
        role: "Student",
      },
      {
        id: 5,
        name: "Lisa Wang",
        avatar: "/placeholder.svg",
        status: "busy",
        role: "Moderator",
      },
    ]);
  }, []);

  // Initialize messages for channels
  useEffect(() => {
    const initialMessages = {
      general: [
        {
          id: 1,
          user: {
            name: "Sarah Johnson",
            avatar: "/placeholder.svg",
            role: "Student",
          },
          content:
            "Hey everyone! Just finished the React course. Amazing content! 🚀",
          timestamp: new Date(Date.now() - 300000),
          type: "text",
        },
        {
          id: 2,
          user: {
            name: "Mike Chen",
            avatar: "/placeholder.svg",
            role: "Instructor",
          },
          content:
            "That's great to hear Sarah! How are you finding the practical exercises?",
          timestamp: new Date(Date.now() - 240000),
          type: "text",
        },
        {
          id: 3,
          user: {
            name: "Emily Davis",
            avatar: "/placeholder.svg",
            role: "Student",
          },
          content: "I'm struggling with the Redux part. Any tips?",
          timestamp: new Date(Date.now() - 180000),
          type: "text",
        },
      ],
      "web-development": [
        {
          id: 1,
          user: {
            name: "Alex Rodriguez",
            avatar: "/placeholder.svg",
            role: "Student",
          },
          content: "Check out this cool CSS animation I made!",
          timestamp: new Date(Date.now() - 120000),
          type: "text",
        },
      ],
    };
    setMessages(initialMessages);
  }, []);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      setShowChannels(!mobile); // Show channels by default on desktop, hide on mobile
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef && modalRef.contains(event.target)) {
        return;
      }
      onClose();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, modalRef]);

  const handleSendMessage = (content, type = "text") => {
    const newMessage = {
      id: Date.now(),
      user: currentUser,
      content,
      timestamp: new Date(),
      type,
    };

    socket.emit("send-message", {
      chatGroupId: selectedChannel,
      senderId: user?.userId,
      content: content,
      type: type,
    });

    // setMessages((prev) => ({
    //   ...prev,
    //   [selectedChannel]: [...(prev[selectedChannel] || []), newMessage],
    // }));
  };

  const handleChannelSelect = (channelId) => {
    setSelectedChannel(channelId);
    setShowChannels(false); // Auto-close channels after selection
  };
  console.log(currentUser, "currentUser");

  if (!isOpen) return null;

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal" ref={setModalRef}>
        <div className="chat-header">
          <div className="chat-title">
            <i className="fas fa-comments me-2"></i>
            <span>Teachera Community</span>
          </div>
          <div className="chat-controls">
            <button
              className="channel-toggle-btn"
              onClick={() => setShowChannels(!showChannels)}
              title="Toggle Channels"
            >
              Categories
            </button>
            {!isMobileView && (
              <button
                className="member-toggle-btn"
                onClick={() => setShowMemberList(!showMemberList)}
                title="Toggle Member List"
              >
                <i className="fas fa-users"></i>
              </button>
            )}
            <button className="close-btn" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="chat-body">
          {showChannels && (
            <ChatChannelList
              channels={channels}
              selectedChannel={selectedChannel}
              onChannelSelect={handleChannelSelect}
              isMobileView={isMobileView}
            />
          )}

          {currentUser && <ChatMessageArea
            channel={channels.find((c) => c._id === selectedChannel)}
            messages={messages[selectedChannel] || []}
            onSendMessage={handleSendMessage}
            currentUser={currentUser}
            isMobileView={isMobileView}
          />}

          {!isMobileView && showMemberList && (
            <ChatMemberList
              users={onlineUsers}
              channelMemberCount={
                channels.find((c) => c.id === selectedChannel)?.memberCount
              }
            />
          )}
        </div>
      </div>

      <style jsx>{`
        .chat-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: flex-end; /* Changed from center to flex-end */
          z-index: 9999;
          padding: 20px;
        }

        .chat-modal {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 1200px;
          height: 80vh;
          max-height: 700px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }

        .chat-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chat-title {
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 18px;
        }

        .chat-controls {
          display: flex;
          gap: 8px;
        }

        .member-toggle-btn,
        .close-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .channel-toggle-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;

          height: 36px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .channel-toggle-btn:hover,
        .member-toggle-btn:hover,
        .close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .chat-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .chat-modal {
            height: 90vh;
            max-height: none;
            margin: 0;
            border-radius: 12px 12px 0 0;
          }

          .chat-modal-overlay {
            padding: 0;
            align-items: flex-end;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatModal;
