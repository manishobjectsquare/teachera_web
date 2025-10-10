// import userImg from "/user.jpg";
// import React, { useEffect } from "react";
// import { baseUrl } from "../../config/baseUrl";
// const ChatMessage = ({ message, isOwn, showAvatar, formatTime }) => {
//   const getRoleColor = (role) => {
//     switch (role?.toLowerCase()) {
//       case "instructor":
//         return "#10b981";
//       case "moderator":
//         return "#f59e0b";
//       case "admin":
//         return "#ef4444";
//       default:
//         return "#6c757d";
//     }
//   };

import { baseUrl } from "../../config/baseUrl"

//   const getRoleBadge = (role) => {
//     if (!role || role.toLowerCase() === "student") return null;

//     return (
//       <span
//         className="role-badge"
//         style={{ backgroundColor: getRoleColor(role) }}
//       >
//         {role}
//       </span>
//     );
//   };

//   return (
//     <div
//       className={`message ${isOwn ? "own-message" : ""} ${
//         showAvatar ? "with-avatar" : "no-avatar"
//       }`}
//     >
//       <div className="message-content">
//         {!isOwn && showAvatar && (
//           <div className="message-avatar">
//             <img
//               src={userImg || "/placeholder.svg"}
//               alt={message.sender.name}
//               onError={(e) => {
//                 e.target.src = "/placeholder.svg";
//               }}
//             />
//           </div>
//         )}

//         <div className="message-body">
//           {!isOwn && showAvatar && (
//             <div className="message-header">
//               <span className="username" style={{ color: "#6c757d" }}>
//                 {message.sender.name}
//               </span>
//               {/* {getRoleBadge(message.user.role)}  */}
//               <span className="timestamp">{formatTime(message.timestamp)}</span>
//             </div>
//           )}

//           <div className="message-text">
//             {message.type === "image" ? (
//               <div className="message-image">
//                 <img src={`${baseUrl}/${message.content}`} alt="Shared image" />
//               </div>
//             ) : (
//               <div
//                 className={`message-bubble ${
//                   isOwn ? "own-bubble" : "other-bubble"
//                 }`}
//               >
//                 <p>{message.content}</p>
//                 {isOwn && (
//                   <span className="own-timestamp">
//                     {formatTime(message.timestamp)}
//                   </span>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .message {
//           padding: 2px 16px;
//           margin-bottom: 1px;
//         }

//         .message.with-avatar {
//           padding: 6px 16px;
//           margin-bottom: 4px;
//         }

//         .message-content {
//           display: flex;
//           gap: 8px;
//           align-items: flex-end;
//         }

//         .own-message .message-content {
//           justify-content: flex-end;
//         }

//         .message-avatar {
//           width: 32px;
//           height: 32px;
//           border-radius: 50%;
//           overflow: hidden;
//           flex-shrink: 0;
//         }

//         .message-avatar img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         .message-body {
//           max-width: 65%;
//           min-width: 0;
//         }

//         .own-message .message-body {
//           display: flex;
//           flex-direction: column;
//           align-items: flex-end;
//         }

//         .message-header {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           margin-bottom: 2px;
//           font-size: 13px;
//         }

//         .username {
//           font-weight: 600;
//           font-size: 13px;
//         }

//         .role-badge {
//           color: white;
//           font-size: 9px;
//           font-weight: 600;
//           padding: 1px 4px;
//           border-radius: 8px;
//           text-transform: uppercase;
//           letter-spacing: 0.3px;
//         }

//         .timestamp {
//           color: #6c757d;
//           font-size: 11px;
//           margin-left: auto;
//         }

//         .message-bubble {
//           padding: 6px 12px;
//           border-radius: 16px;
//           max-width: 100%;
//           word-wrap: break-word;
//           display: inline-block;
//         }

//         .other-bubble {
//           background: #f1f3f4;
//           border-bottom-left-radius: 4px;
//         }

//         .own-bubble {
//           background: #667eea;
//           color: white;
//           border-bottom-right-radius: 4px;
//         }

//         .message-bubble p {
//           margin: 0;
//           font-size: 14px;
//           line-height: 1.4;
//         }

//         .own-timestamp {
//           font-size: 10px;
//           color: rgba(255, 255, 255, 0.7);
//           margin-top: 2px;
//           display: block;
//           text-align: right;
//         }

//         /* Consecutive messages spacing */
//         .message.no-avatar:not(.own-message) .message-content {
//           margin-left: 40px;
//         }

//         .message.no-avatar.own-message .message-content {
//           margin-right: 0;
//         }

//         .message-image img {
//           max-width: 250px;
//           max-height: 180px;
//           border-radius: 12px;
//           cursor: pointer;
//         }

//         @media (max-width: 768px) {
//           .message {
//             padding: 2px 12px;
//           }

//           .message.with-avatar {
//             padding: 4px 12px;
//           }

//           .message-avatar {
//             width: 28px;
//             height: 28px;
//           }

//           .message-body {
//             max-width: 75%;
//           }

//           .message.no-avatar:not(.own-message) .message-content {
//             margin-left: 36px;
//           }

//           .message-bubble {
//             padding: 5px 10px;
//           }

//           .message-bubble p {
//             font-size: 13px;
//           }

//           .own-bubble p{
//           color: #fff !important;
//         }

//         /* RTL styles */
//         [dir="rtl"] .message-content {
//           flex-direction: row-reverse;
//         }

//         [dir="rtl"] .own-message .message-content {
//           justify-content: flex-start;
//         }

//         [dir="rtl"] .message-header {
//           flex-direction: row-reverse;
//         }

//         [dir="rtl"] .timestamp {
//           margin-left: 0;
//           margin-right: auto;
//         }

//         [dir="rtl"] .own-bubble {
//           border-bottom-right-radius: 16px;
//           border-bottom-left-radius: 4px;
//         }

//         [dir="rtl"] .other-bubble {
//           border-bottom-left-radius: 16px;
//           border-bottom-right-radius: 4px;
//         }

//         [dir="rtl"] .message.no-avatar:not(.own-message) .message-content {
//           margin-left: 0;
//           margin-right: 40px;
//         }

//         [dir="rtl"] .own-timestamp {
//           text-align: left;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChatMessage;







const ChatMessage = ({ message, isOwn, showAvatar, formatTime }) => {
  const sender = message.sender || message.user || { name: "Unknown User", avatar: "/placeholder.svg", role: "Student" }
  const senderName = sender.name || sender.fullName || "Unknown User"
  const senderAvatar = sender.avatar || sender.profilePicture || "/placeholder.svg"
  const senderRole = sender.role || "Student"

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "instructor":
        return "#28a745"
      case "moderator":
        return "#ffc107"
      case "admin":
        return "#dc3545"
      default:
        return "#6c757d"
    }
  }

  const getRoleBadge = (role) => {
    if (!role || role.toLowerCase() === "student") return null

    return (
      <span className="role-badge" style={{ backgroundColor: getRoleColor(role), color: "#fff" }}>
        {role}
      </span>
    )
  }

  const messageTimestamp = message.createdAt || message.timestamp

  return (
    <div
      className={`message-wrapper ${isOwn ? "own-message-wrapper" : ""} ${showAvatar ? "with-avatar-wrapper" : "no-avatar-wrapper"}`}
    >
      <div className="message-content-flex">
        {!isOwn && showAvatar && (
          <div className="message-avatar">
            <img
              src={senderAvatar || "/user.jpg"}
              alt={senderName}
              onError={(e) => {
                e.target.src = "/user.jpg"
              }}
            />
          </div>
        )}

        <div className={`message-body-container ${isOwn ? "own-body-container" : ""}`}>
          {!isOwn && showAvatar && (
            <div className="message-header">
              <span className="username" style={{ color: getRoleColor(senderRole) }}>
                {senderName}
              </span>
              {getRoleBadge(senderRole)}

            </div>
          )}

          <div className={`message-bubble ${isOwn ? "own-bubble" : "other-bubble"}`}>
            {message.type === "image" ? (
              <div className="message-image">
                <img src={`${baseUrl}/${message.content}`} alt="Shared content" />
                {messageTimestamp && (
                  <span className={`bubble-timestamp ${isOwn ? "own-bubble-timestamp" : "other-bubble-timestamp"}`}>
                    {formatTime(messageTimestamp)}
                  </span>
                )}
              </div>
            ) : message.type === "application/pdf" ? (
              <div className="message-file">
                <i className="fas fa-file-pdf"></i>
                <a href={`${baseUrl}/${message.content}`} target="_blank" rel="noopener noreferrer">
                  {message.content.split("/").pop().substring(0, 20) || "Attachment.pdf"}
                </a>
                {messageTimestamp && (
                  <span className={`bubble-timestamp ${isOwn ? "own-bubble-timestamp" : "other-bubble-timestamp"}`}>
                    {formatTime(messageTimestamp)}
                  </span>
                )}
              </div>
            ) : (
              <>
                <p>{message.content}</p>
                {messageTimestamp && (
                  <span className={`bubble-timestamp ${isOwn ? "own-bubble-timestamp" : "other-bubble-timestamp"}`}>
                    {formatTime(messageTimestamp)}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        {/* {isOwn &&
          showAvatar && (
            <div className="message-avatar own-avatar">
              <img
                src={senderAvatar || "/placeholder.svg"}
                alt={senderName}
                onError={(e) => {
                  e.target.src = "/placeholder.svg"
                }}
              />
            </div>
          )} */}
      </div>

      <style jsx>{`
        .message-wrapper {
          padding: 1px 16px; /* Reduced vertical padding for tighter packing */
          margin-bottom: ${showAvatar ? "8px" : "2px"}; /* More space if avatar shown */
        }
        
        .message-content-flex {
          display: flex;
          gap: 10px; /* Consistent gap */
          align-items: flex-end; /* Align items to the bottom */
        }

        .own-message-wrapper .message-content-flex {
          justify-content: flex-end;
        }
        
        .no-avatar-wrapper:not(.own-message-wrapper) .message-body-container {
            margin-left: ${showAvatar ? "0" : "46px"}; /* Indent if no avatar but not own */
        }


        .message-avatar {
          width: 36px; /* Slightly larger avatar */
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          align-self: flex-end; /* Align avatar to bottom of its container */
          border: 1px solid #eee;
        }
        .own-avatar {
            order: 1; /* Ensure own avatar is to the right of the bubble */
        }


        .message-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .message-body-container {
          max-width: 70%; /* Max width for message body */
          min-width: 0; /* Allow shrinking */
          display: flex;
          flex-direction: column;
        }
        
        .own-body-container {
            align-items: flex-end;
        }


        .message-header {
          display: flex;
          align-items: center;
          gap: 8px; /* Gap between name and badge */
          margin-bottom: 4px; /* Space below header */
          font-size: 0.8rem; /* Smaller header text */
        }

        .username {
          font-weight: 600;
        }

        .role-badge {
          font-size: 0.65rem; /* Smaller badge */
          font-weight: 600;
          padding: 2px 5px;
          border-radius: 4px; /* Less rounded badge */
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .message-bubble {
          padding: 8px 12px; /* Comfortable padding */
          border-radius: 18px; /* More rounded bubbles */
          max-width: 100%; /* Bubble takes full width of its container */
          word-wrap: break-word;
          display: inline-block; /* Important for bubble to wrap content */
          position: relative; /* For timestamp positioning */
          box-shadow: 0 1px 2px rgba(0,0,0,0.08);
        }

        .other-bubble {
          background: #ffffff; /* White for other users */
          color: #333;
          border-bottom-left-radius: 5px; /* "Tail" effect */
        }

        .own-bubble {
          background: #667eea;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message-bubble p {
          margin: 0;
          font-size: 0.9rem; /* Standard message text size */
          line-height: 1.45;
          white-space: pre-wrap; /* Preserve line breaks */
        }
        
        .bubble-timestamp {
            font-size: 0.7rem; /* Smaller timestamp */
            color: #888;
            margin-top: 5px;
            display: block;
            clear: both; /* Ensure it's below content if float is used */
        }
        .own-bubble .bubble-timestamp {
            text-align: right;
            color: #fff; /* Timestamp color for own bubble */
        }
         .other-bubble .bubble-timestamp {
            text-align: right; /* Or left, depending on preference */
             color: #aaa;
        }


        .message-image img, .message-file {
          max-width: 280px; /* Max width for images/files */
          max-height: 200px;
          border-radius: 10px; /* Rounded corners for media */
          display: block; /* Ensure it takes block space */
          margin-bottom: 5px; /* Space before timestamp */
        }
        .message-file {
            background-color: #f0f0f0;
            padding: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
            border: 1px solid #ddd;
        }
        .message-file i {
            font-size: 1.5rem;
            color: #dc3545; /* PDF icon color */
        }
        .message-file a {
            color: #007bff;
            text-decoration: none;
            font-size: 0.85rem;
        }
         .message-file a:hover {
            text-decoration: underline;
        }


        @media (max-width: 768px) {
          .message-wrapper {
            padding: 1px 10px;
          }
          .message-body-container {
            max-width: 80%;
          }
           .no-avatar-wrapper:not(.own-message-wrapper) .message-body-container {
            margin-left: ${showAvatar ? "0" : "40px"}; 
          }
        }

        /* RTL styles */
        [dir="rtl"] .message-content-flex {
          flex-direction: row-reverse;
        }
        [dir="rtl"] .own-message-wrapper .message-content-flex {
          /* No change needed, already flex-end by default for own, then reversed */
        }
         [dir="rtl"] .no-avatar-wrapper:not(.own-message-wrapper) .message-body-container {
            margin-left: 0;
            margin-right: ${showAvatar ? "0" : "46px"};
        }
        [dir="rtl"] .own-avatar {
            order: -1; /* Ensure own avatar is to the left of the bubble in RTL */
        }
        [dir="rtl"] .message-header {
          /* Text alignment within header items will be handled by their own direction */
        }
        [dir="rtl"] .own-bubble {
          border-bottom-right-radius: 18px; /* Default radius */
          border-bottom-left-radius: 5px;  /* Tail on left for RTL */
        }
        [dir="rtl"] .other-bubble {
          border-bottom-left-radius: 18px; /* Default radius */
          border-bottom-right-radius: 5px; /* Tail on right for RTL */
        }
         [dir="rtl"] .own-bubble .bubble-timestamp,
         [dir="rtl"] .other-bubble .bubble-timestamp {
            text-align: left; /* Timestamps align left in RTL */
        }
      `}</style>
    </div>
  )
}

export default ChatMessage
