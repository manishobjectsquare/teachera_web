// const ChatChannelList = ({
//   channels,
//   selectedChannel,
//   onChannelSelect,
//   isMobileView,
// }) => {
//   return (
//     <div className="channel-list">
//       <div className="channel-header">
//         <h6>Categories</h6>
//       </div>

//       <div className="channels">
//         {channels.map((channel) => (
//           <div
//             key={channel._id}
//             className={`channel-item ${selectedChannel === channel._id ? "active" : ""
//               }`}
//             onClick={() => onChannelSelect(channel._id)}
//           >
//             <div className="channel-info">
//               <div className="channel-name">
//                 <i className="fas fa-hashtag"></i>
//                 <span>{channel.name}</span>
//               </div>
//               <div className="channel-meta">
//                 <span className="member-count">
//                   {channel.memberCount} members
//                 </span>
//               </div>
//             </div>
//             {selectedChannel === channel._id && (
//               <div className="active-indicator"></div>
//             )}
//           </div>
//         ))}
//       </div>

//       <style jsx>{`
//         .channel-list {
//           width: ${isMobileView ? "60%" : "280px"};
//           background: #f8f9fa;
//           border-right: 1px solid #e9ecef;
//           display: flex;
//           flex-direction: column;
//           position: absolute;
//           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//           //   height: 100%;
//           height: calc(700px - 69px);
//         }

//         .channel-header {
//           padding: 16px 20px;
//           border-bottom: 1px solid #e9ecef;
//           background: white;
//         }

//         .channel-header h6 {
//           margin: 0;
//           font-weight: 600;
//           color: #495057;
//           text-transform: uppercase;
//           font-size: 12px;
//           letter-spacing: 0.5px;
//         }

//         .channels {
//           flex: 1;
//           overflow-y: auto;
//           padding: 8px 0;
//         }

//         .channel-item {
//           position: relative;
//           padding: 12px 20px;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           border-left: 3px solid transparent;
//         }

//         .channel-item:hover {
//           background: rgba(102, 126, 234, 0.1);
//         }

//         .channel-item.active {
//           background: rgba(102, 126, 234, 0.15);
//           border-left-color: #667eea;
//         }

//         .channel-name {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-weight: 500;
//           color: #495057;
//           margin-bottom: 4px;
//           font-size: 0.8rem;
//         }

//         .channel-name i {
//           color: #6c757d;
//           font-size: 14px;
//         }

//         .channel-meta {
//           font-size: 12px;
//           color: #6c757d;
//         }

//         .active-indicator {
//           position: absolute;
//           right: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           width: 8px;
//           height: 8px;
//           background: #667eea;
//           border-radius: 50%;
//         }

//         .channels::-webkit-scrollbar {
//           width: 4px;
//         }

//         .channels::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         .channels::-webkit-scrollbar-thumb {
//           background: #dee2e6;
//           border-radius: 2px;
//         }

//         /* RTL styles for ChatChannelList */
//         [dir="rtl"] .channel-list {
//           border-right: none;
//           border-left: 1px solid #e9ecef;
//         }

//         [dir="rtl"] .channel-item {
//           border-left: none;
//           border-right: 3px solid transparent;
//         }

//         [dir="rtl"] .channel-item.active {
//           border-left: none;
//           border-right-color: #667eea;
//         }

//         [dir="rtl"] .channel-name {
//           flex-direction: row-reverse;
//         }

//         [dir="rtl"] .active-indicator {
//           right: auto;
//           left: 12px;
//         }

//         [dir="rtl"] .channels::-webkit-scrollbar {
//           direction: rtl;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChatChannelList;



// No changes needed to ChatChannelList.jsx from your last working version.
// It should correctly use the isMobileView prop passed from the new page.
// The styles for width and position based on isMobileView will apply.
// Ensure its height is 100% to fill the allocated space in the flex container.
"use client"

const ChatChannelList = ({ channels, selectedChannel, onChannelSelect, isMobileView }) => {
  return (
    <div className="channel-list-wrapper">
      {" "}
      {/* Added a wrapper for better height control */}
      <div className="channel-header">
        <h6>Categories</h6>
      </div>
      <div className="channels-scroll-container">
        {channels &&
          channels.map((channel) => (
            <div
              key={channel._id}
              className={`channel-item ${selectedChannel === channel._id ? "active" : ""}`}
              onClick={() => onChannelSelect(channel._id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === "Enter" && onChannelSelect(channel._id)}
            >
              <div className="channel-info">
                <div className="channel-name">
                  <i className="fas fa-hashtag"></i>
                  <span>{channel.name}</span>
                </div>
                {channel.memberCount !== undefined && (
                  <div className="channel-meta">
                    <span className="member-count">{channel.memberCount} members</span>
                  </div>
                )}
              </div>
              {selectedChannel === channel._id && <div className="active-indicator"></div>}
            </div>
          ))}
        {(!channels || channels.length === 0) && <div className="no-channels-message">No channels available.</div>}
      </div>
      <style jsx>{`
        .channel-list-wrapper {
          width: ${isMobileView ? "80%" : "280px"}; /* Wider on mobile for better touch */
          max-width: ${isMobileView ? "300px" : "280px"};
          background: #f8f9fa;
          border-right: 1px solid #e9ecef;
          display: flex;
          flex-direction: column;
          position: ${isMobileView ? "absolute" : "relative"};
          ${isMobileView ? "z-index: 100;" : ""} /* Ensure it's above message area on mobile */
          ${isMobileView ? "box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);" : ""}
          height: 100%; 
          flex-shrink: 0; /* Prevent shrinking */
        }

        .channel-header {
          padding: 16px 20px;
          border-bottom: 1px solid #e9ecef;
          background: white;
          flex-shrink: 0;
        }

        .channel-header h6 {
          margin: 0;
          font-weight: 600;
          color: #495057;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.5px;
        }

        .channels-scroll-container { /* Renamed for clarity */
          flex-grow: 1; /* Takes available space */
          overflow-y: auto;
          padding: 8px 0;
        }

        .channel-item {
          position: relative;
          padding: 12px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
        }

        .channel-item:hover {
          background: rgba(102, 126, 234, 0.1);
        }

        .channel-item.active {
          background: rgba(102, 126, 234, 0.15);
          border-left-color: #667eea;
        }
        .channel-item.active .channel-name span,
        .channel-item.active .channel-name i {
            color: #667eea;
            font-weight: 500;
        }


        .channel-name {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          color: #495057;
          margin-bottom: 4px;
          font-size: 0.9rem; /* Slightly larger */
        }

        .channel-name i {
          color: #6c757d;
          font-size: 14px;
        }

        .channel-meta {
          font-size: 12px;
          color: #6c757d;
        }
        
        .no-channels-message {
            padding: 20px;
            text-align: center;
            color: #6c757d;
            font-size: 0.9rem;
        }

        .active-indicator {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: #667eea;
          border-radius: 50%;
        }

        .channels-scroll-container::-webkit-scrollbar {
          width: 5px; /* Slightly thicker scrollbar */
        }

        .channels-scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .channels-scroll-container::-webkit-scrollbar-thumb {
          background: #ced4da; /* More visible scrollbar thumb */
          border-radius: 3px;
        }

        /* RTL styles for ChatChannelList */
        [dir="rtl"] .channel-list-wrapper {
          border-right: none;
          border-left: 1px solid #e9ecef;
          ${isMobileView ? "box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);" : ""}
        }

        [dir="rtl"] .channel-item {
          border-left: none;
          border-right: 3px solid transparent;
        }

        [dir="rtl"] .channel-item.active {
          border-left: none;
          border-right-color: #667eea;
        }

        [dir="rtl"] .channel-name {
          flex-direction: row-reverse;
        }

        [dir="rtl"] .active-indicator {
          right: auto;
          left: 12px;
        }
      `}</style>
    </div>
  )
}

export default ChatChannelList
