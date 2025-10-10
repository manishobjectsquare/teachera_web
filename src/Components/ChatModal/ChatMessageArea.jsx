import { useRef, useEffect, useState } from "react";
import ChatMessage from "./ChatMessage"; // Ensure path is correct
import MessageInput from "./MessageInput"; // Ensure path is correct
import axios from "axios";

import { socket } from "../../config/socket"; // Ensure path is correct
import { baseUrl } from "../../config/baseUrl"; // Ensure path is correct

const ChatMessageArea = ({
  channel,
  onSendMessage, // This comes from the parent page
  currentUser,
  isMobileView,
}) => {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [messages, setMessages] = useState([]); // Internal state for messages

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    const fetchChannelMessages = async () => {
      // Renamed for clarity
      if (!channel?._id) {
        setMessages([]); // Clear messages if no channel
        return;
      }
      try {
        // console.log(`ChatMessageArea: Fetching for ${channel._id}`);
        const response = await axios.get(
          `${baseUrl}/api/v1/web/mesage/message-list/${channel._id}`
        );

        if (response.data.status) {
          setMessages(response.data.data || []);
        } else {
          setMessages([]); // Clear on API error status
        }
      } catch (err) {
        console.error("ChatMessageArea: Error fetching messages:", err);
        setMessages([]); // Clear on catch
      }
    };

    fetchChannelMessages();
  }, [channel?._id]); // Depend only on channel._id

  useEffect(() => {
    if (!channel?._id) {
      return; // Don't attach listener if no channel
    }

    // console.log(`ChatMessageArea: Setting up socket listener for 'new-message' on channel ${channel._id}`);

    const handleNewMessage = (msg) => {
      // console.log("ChatMessageArea: 'new-message' received via socket:", msg);
      // IMPORTANT: Your backend should ensure 'msg' contains 'chatGroupId' or similar
      // to allow filtering for the current channel if needed.
      // If your backend only sends messages to clients in the correct room,
      // this direct update might be fine.
      if (msg && msg.chatGroupId === channel._id) {
        // Add this check if backend broadcasts widely
        setMessages((prev) => [...prev, msg]);
      } else if (!msg.chatGroupId && msg) {
        // If backend doesn't send chatGroupId but you are sure it's for this room
        // console.warn("ChatMessageArea: Received message without chatGroupId. Assuming it's for current room.");
        setMessages((prev) => [...prev, msg]);
      }
    };

    // Ensure socket is connected before emitting join-room
    const joinAndListen = () => {
      socket.emit("join-room", channel._id);
      socket.on("new-message", handleNewMessage);
    };

    if (socket.connected) {
      joinAndListen();
    } else {
      socket.once("connect", joinAndListen);
    }

    return () => {
      // console.log(`ChatMessageArea: Cleaning up 'new-message' listener for channel ${channel._id}`);
      socket.off("new-message", handleNewMessage);
      // if (socket.connected && channel?._id) { // Optional: leave room
      //   socket.emit("leave-room", channel._id);
      // }
    };
  }, [channel?._id]); // Re-run when channel ID changes

  const formatTime = (dateString) => {
    // Renamed param for clarity
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const formatDate = (dateString) => {
    // Renamed param for clarity
    if (!dateString) return "";
    const today = new Date();
    const messageDate = new Date(dateString);

    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return messageDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Group messages by date
  const groupedMessages = (messages || []).reduce((groups, message) => {
    const dateStr = message.createdAt || message.timestamp; // Prefer createdAt
    if (!dateStr) return groups; // Skip if no valid timestamp

    const date = formatDate(dateStr);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  if (!channel) {
    // Welcome screen JSX (same as your provided code)
    return (
      <div className="message-area-container-empty">
        {" "}
        {/* Added a wrapper class */}
        <div className="welcome-screen">
          <div className="welcome-content">
            <div className="welcome-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3>Welcome to Basementex Community!</h3>
            <p>
              Connect with fellow students, ask questions, and share your
              learning journey.
            </p>
            <div className="welcome-features">
              <div className="feature-item">
                <i className="fas fa-users"></i>
                <span>Join study groups and discussions</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-question-circle"></i>
                <span>Get help from instructors and peers</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-share-alt"></i>
                <span>Share your projects and achievements</span>
              </div>
            </div>
            <p className="welcome-cta">
              Select a channel from the menu to start chatting!
            </p>
          </div>
        </div>
        <style jsx>{`
          .message-area-container-empty {
            /* Style for the empty state wrapper */
            flex: 1;
            display: flex;
            flex-direction: column;
            background: white; /* Or your preferred background */
          }
          .welcome-screen {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 40px 20px;
          }
          .welcome-content {
            text-align: center;
            max-width: 400px;
          }
          .welcome-icon {
            font-size: 4rem;
            color: #667eea;
            margin-bottom: 1.5rem;
          }
          .welcome-content h3 {
            color: #495057;
            margin-bottom: 1rem;
            font-weight: 600;
          }
          .welcome-content > p {
            color: #6c757d;
            margin-bottom: 2rem;
            line-height: 1.6;
          }
          .welcome-features {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 2rem;
          }
          .feature-item {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #495057;
            font-size: 0.9rem;
          }
          .feature-item i {
            color: #667eea;
            width: 20px;
          }
          .welcome-cta {
            color: #667eea !important;
            font-weight: 600;
            font-size: 0.9rem;
          }
          @media (max-width: 768px) {
            .welcome-screen {
              padding: 20px;
            }
            .welcome-icon {
              font-size: 3rem;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="message-area">
      {" "}
      {/* This class is from your original styles */}
      <div className="message-header">
        {" "}
        {/* This class is from your original styles */}
        <div className="channel-info">
          <h5>
            <i className="fas fa-hashtag me-2"></i>
            {channel?.name}
          </h5>
          <p>{channel?.description}</p>
        </div>
        <div className="channel-stats">
          <span className="member-count">
            <i className="fas fa-users me-1"></i>
            {channel?.memberCount}
          </span>
        </div>
      </div>
      <div className="messages-container" ref={messagesContainerRef}>
        {" "}
        {/* This class is from your original styles */}
        {Object.keys(groupedMessages).length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#888",
              padding: "30px",
              fontSize: "0.9em",
            }}
          >
            No messages in this channel yet. Start the conversation!
          </div>
        )}
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="date-separator">
              {" "}
              {/* This class is from your original styles */}
              <span>{date}</span>
            </div>
            {dateMessages.map((message, index) => (
              <ChatMessage
                key={message._id || message.id} // Use _id from backend if available
                message={message}
                // Ensure currentUser and message.sender structure allows for this comparison
                isOwn={
                  message.sender?.name === currentUser?.name ||
                  message.sender?._id === currentUser?.userId
                }
                showAvatar={
                  index === 0 ||
                  (dateMessages[index - 1].sender?.name !==
                    message.sender?.name &&
                    dateMessages[index - 1].sender?._id !== message.sender?._id)
                }
                formatTime={formatTime}
              />
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={onSendMessage} channelId={channel?._id} />{" "}
      {/* Pass channelId */}
      {/* Styles from your provided ChatMessageArea.jsx */}
      <style jsx>{`
        .message-area {
          flex: 1; /* Crucial for ChatMessageArea to fill space in flex layout */
          display: flex;
          flex-direction: column;
          background: white; /* Or your theme's background for this area */
          overflow: hidden; /* Prevent this component from causing page scroll */
        }
        .message-header {
          padding: 16px 20px;
          border-bottom: 1px solid #e9ecef;
          background: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0; /* Prevent shrinking */
        }
        .channel-info h5 {
          margin: 0 0 4px 0;
          color: #495057;
          font-weight: 600;
          display: flex;
          align-items: center;
        }
        .channel-info p {
          margin: 0;
          color: #6c757d;
          font-size: 14px;
        }
        .channel-stats {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .member-count {
          color: #6c757d;
          font-size: 14px;
          display: flex;
          align-items: center;
        }
        .messages-container {
          /* This is the scrollable part */
          flex: 1; /* Takes up available vertical space */
          overflow-y: auto;
          padding: 16px 0;
          background: #fafbfc; /* Or your theme's message background */
        }
        .date-separator {
          display: flex;
          align-items: center;
          margin: 20px 20px 16px;
          position: relative;
        }
        .date-separator::before {
          content: "";
          flex: 1;
          height: 1px;
          background: #e9ecef;
          margin-right: 16px;
        }
        .date-separator::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #e9ecef;
          margin-left: 16px;
        }
        .date-separator span {
          color: #6c757d;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          background: #fafbfc;
          padding: 0 8px;
        }
        .messages-container::-webkit-scrollbar {
          width: 6px;
        }
        .messages-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .messages-container::-webkit-scrollbar-thumb {
          background: #dee2e6;
          border-radius: 3px;
        }
        @media (max-width: 768px) {
          .message-header {
            padding: 12px 16px;
          }
          .channel-info h5 {
            font-size: 16px;
          }
          .channel-info p {
            font-size: 13px;
          }
        }
        .messages-container {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ChatMessageArea;
