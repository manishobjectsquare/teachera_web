// import { useState, useRef } from "react";

// const MessageInput = ({ onSendMessage }) => {
//   const [message, setMessage] = useState("");
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);

//   // const sendMessage = () => {
//   //   if (text.trim() === "") return;
//   //   socket.emit("send-message", {
//   //     chatGroupId,
//   //     senderId: userId,
//   //     content: text,
//   //     type: "text",
//   //   });
//   //   setText("");
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(message);

//     if (message.trim()) {
//       onSendMessage(message.trim());
//       setMessage("");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];


//     if (file && file.type.startsWith("image/")) {
//       setIsUploading(true);

//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setTimeout(() => {
//           onSendMessage(event.target.result, "image");
//           setIsUploading(false);
//         }, 1000);
//       };
//       reader.readAsDataURL(file);
//     }
//     if (file && file.type.startsWith("application/pdf")) {
//       setIsUploading(true);
//       console.log(file.type);
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setTimeout(() => {
//           onSendMessage(event.target.result, "application/pdf");

//           setIsUploading(false);
//         }, 1000);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="message-input-container">
//       <form onSubmit={handleSubmit} className="message-input-form">
//         <div className="input-wrapper">
//           <button
//             type="button"
//             className="attachment-btn"
//             onClick={() => fileInputRef.current?.click()}
//             disabled={isUploading}
//             title="Upload Image"
//           >
//             {isUploading ? (
//               <i className="fas fa-spinner fa-spin"></i>
//             ) : (
//               <i className="fas fa-image"></i>
//             )}
//           </button>

//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleImageUpload}
//             accept="image/* video/* audio/* application/pdf  "
//             style={{ display: "none" }}
//           />

//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Type a message..."
//             className="message-input"
//             rows="1"
//             disabled={isUploading}
//           />

//           <button
//             type="submit"
//             className="send-btn"
//             disabled={!message.trim() || isUploading}
//           >
//             <i className="fas fa-paper-plane"></i>
//           </button>
//         </div>
//       </form>

//       <style >{`
//         .message-input-container {
//           padding: 16px 20px;
//           border-top: 1px solid #e9ecef;
//           background: white;
//         }

//         .message-input-form {
//           width: 100%;
//         }

//         .input-wrapper {
//           display: flex;
//           align-items: flex-end;
//           gap: 8px;
//           background: #f8f9fa;
//           border: 1px solid #e9ecef;
//           border-radius: 24px;
//           padding: 8px 12px;
//           transition: border-color 0.2s ease;
//         }

//         .input-wrapper:focus-within {
//           border-color: #667eea;
//           box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//         }

//         .attachment-btn {
//           background: none;
//           border: none;
//           color: #6c757d;
//           padding: 8px;
//           border-radius: 50%;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 36px;
//           height: 36px;
//         }

//         .attachment-btn:hover:not(:disabled) {
//           background: rgba(102, 126, 234, 0.1);
//           color: #667eea;
//         }

//         .attachment-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .message-input {
//           flex: 1;
//           border: none;
//           background: transparent;
//           resize: none;
//           outline: none;
//           font-family: inherit;
//           font-size: 14px;
//           line-height: 1.5;
//           padding: 8px 4px;
//           max-height: 120px;
//           min-height: 20px;
//         }

//         .message-input::placeholder {
//           color: #6c757d;
//         }

//         .send-btn {
//           background: #667eea;
//           border: none;
//           color: white;
//           padding: 8px;
//           border-radius: 50%;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 36px;
//           height: 36px;
//         }

//         .send-btn:hover:not(:disabled) {
//           background: #5a67d8;
//           transform: scale(1.05);
//         }

//         .send-btn:disabled {
//           background: #dee2e6;
//           cursor: not-allowed;
//           transform: none;
//         }

//         @media (max-width: 768px) {
//           .message-input-container {
//             padding: 12px 16px;
//           }

//           /* RTL styles for MessageInput */
//           [dir="rtl"] .input-wrapper {
//             flex-direction: row-reverse;
//           }

//           [dir="rtl"] .attachment-btn {
//             order: 2;
//           }

//           [dir="rtl"] .message-input {
//             text-align: right;
//             direction: rtl;
//           }

//           [dir="rtl"] .send-btn {
//             order: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MessageInput;











// No changes needed to MessageInput.jsx from your last working version.
// It should correctly use the onSendMessage prop.
"use client"

import { useState, useRef } from "react"

const MessageInput = ({ onSendMessage, channelId }) => {
  // Added channelId for context if needed
  const [message, setMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && channelId) {
      // Ensure channel is selected
      onSendMessage(message.trim(), "text")
      setMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file || !channelId) return // Ensure channel is selected

    setIsUploading(true)
    const reader = new FileReader()

    reader.onload = (event) => {
      let fileType = "file" // Default type
      if (file.type.startsWith("image/")) {
        fileType = "image"
      } else if (file.type === "application/pdf") {
        fileType = "application/pdf"
      }
      // You might want to actually upload the file here and get a URL
      // For now, sending base64 or a placeholder
      // This is a simplified version; real upload would involve FormData and an API call
      console.log(`Simulating upload for ${fileType}: ${file.name}`)
      setTimeout(() => {
        // Simulate upload delay
        onSendMessage(event.target.result, fileType) // Sending base64 data
        setIsUploading(false)
      }, 1500)
    }

    reader.onerror = () => {
      console.error("File reading error")
      setIsUploading(false)
    }

    reader.readAsDataURL(file)
    fileInputRef.current.value = "" // Reset file input
  }

  return (
    <div className="message-input-area">
      <form onSubmit={handleSubmit} className="message-input-form">
        <div className="input-controls-wrapper">
          <button
            type="button"
            className="control-button attachment-button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || !channelId}
            title="Attach file"
          >
            {isUploading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paperclip"></i>}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,application/pdf" // Specify accepted types
            style={{ display: "none" }}
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={channelId ? "Type a message..." : "Select a channel to chat"}
            className="message-text-input"
            rows="1"
            disabled={isUploading || !channelId}
          />

          <button
            type="submit"
            className="control-button send-button"
            disabled={!message.trim() || isUploading || !channelId}
            title="Send message"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>

      <style jsx>{`
        .message-input-area {
          padding: 10px 15px; /* Reduced padding */
          border-top: 1px solid #d1d7db; /* Softer border */
          background: #f0f2f5; /* Consistent background with WhatsApp */
          flex-shrink: 0; /* Prevent shrinking */
        }

        .message-input-form {
          width: 100%;
        }

        .input-controls-wrapper {
          display: flex;
          align-items: flex-end; /* Align items to bottom for textarea growth */
          gap: 8px;
          background: #ffffff; /* White background for input field itself */
          border: 1px solid #d1d7db;
          border-radius: 22px; /* More rounded input area */
          padding: 6px 10px; /* Inner padding */
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .input-controls-wrapper:focus-within {
          border-color: #58b4f5; /* Focus color */
          box-shadow: 0 0 0 2px rgba(88, 180, 245, 0.2);
        }

        .control-button {
          background: none;
          border: none;
          color: #54656f; /* Icon color */
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px; /* Consistent button size */
          height: 38px;
          font-size: 1.1rem; /* Larger icons */
        }

        .control-button:hover:not(:disabled) {
          background: #e9edef; /* Hover effect */
          color: #128c7e; /* WhatsApp green on hover */
        }

        .control-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .message-text-input {
          flex-grow: 1;
          border: none;
          background: transparent;
          resize: none;
          outline: none;
          font-family: inherit;
          font-size: 0.95rem; /* Slightly larger text */
          line-height: 1.4;
          padding: 8px 4px; /* Vertical padding for text area */
          max-height: 100px; /* Limit growth */
          min-height: 22px; /* Initial height for single line */
          align-self: center; /* Center text vertically */
        }

        .message-text-input::placeholder {
          color: #8696a0; /* Placeholder color */
        }
        
        .send-button {
            color: #128c7e; /* WhatsApp green for send */
        }
        .send-button:hover:not(:disabled) {
            color: #075e54; /* Darker green on hover */
        }
        .send-button:disabled {
            color: #b0bec5; /* Disabled send icon color */
        }


        @media (max-width: 768px) {
          .message-input-area {
            padding: 8px 10px;
          }
          .control-button {
            width: 36px;
            height: 36px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default MessageInput
