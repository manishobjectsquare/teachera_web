// "use client"

// const ChatMemberList = ({ users, channelMemberCount }) => {
//     const getStatusColor = (status) => {
//         switch (status) {
//             case "online":
//                 return "#10b981"
//             case "away":
//                 return "#f59e0b"
//             case "busy":
//                 return "#ef4444"
//             default:
//                 return "#6c757d"
//         }
//     }

//     const getStatusText = (status) => {
//         switch (status) {
//             case "online":
//                 return "Online"
//             case "away":
//                 return "Away"
//             case "busy":
//                 return "Busy"
//             default:
//                 return "Offline"
//         }
//     }

//     const onlineUsers = users.filter((user) => user.status === "online")
//     const awayUsers = users.filter((user) => user.status === "away")
//     const busyUsers = users.filter((user) => user.status === "busy")
//     const offlineUsers = users.filter((user) => user.status === "offline")

//     const UserGroup = ({ title, users, count }) => {
//         if (users.length === 0) return null

//         return (
//             <div className="user-group">
//                 <div className="group-header">
//                     <span className="group-title">
//                         {title} — {count}
//                     </span>
//                 </div>
//                 <div className="user-list">
//                     {users.map((user) => (
//                         <div key={user.id} className="user-item">
//                             <div className="user-avatar">
//                                 <img
//                                     src={user.avatar || "/placeholder.svg"}
//                                     alt={user.name}
//                                     onError={(e) => {
//                                         e.target.src = "/placeholder.svg"
//                                     }}
//                                 />
//                                 <div className="status-indicator" style={{ backgroundColor: getStatusColor(user.status) }}></div>
//                             </div>
//                             <div className="user-info">
//                                 <div className="user-name">{user.name}</div>
//                                 <div className="user-role">{user.role}</div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="member-list">
//             <div className="member-header">
//                 <h6>Members — {channelMemberCount}</h6>
//             </div>

//             <div className="members-container">
//                 <UserGroup title="Online" users={onlineUsers} count={onlineUsers.length} />
//                 <UserGroup title="Away" users={awayUsers} count={awayUsers.length} />
//                 <UserGroup title="Busy" users={busyUsers} count={busyUsers.length} />
//                 <UserGroup title="Offline" users={offlineUsers} count={offlineUsers.length} />
//             </div>

//             <style jsx>{`
//         .member-list {
//           width: 240px;
//           background: #f8f9fa;
//           border-left: 1px solid #e9ecef;
//           display: flex;
//           flex-direction: column;
//           display:none;
//         }

//         .member-header {
//           padding: 16px 16px;
//           border-bottom: 1px solid #e9ecef;
//           background: white;
//         }

//         .member-header h6 {
//           margin: 0;
//           font-weight: 600;
//           color: #495057;
//           text-transform: uppercase;
//           font-size: 12px;
//           letter-spacing: 0.5px;
//         }

//         .members-container {
//           flex: 1;
//           overflow-y: auto;
//           padding: 8px 0;
//         }

//         .user-group {
//           margin-bottom: 16px;
//         }

//         .group-header {
//           padding: 8px 16px;
//           margin-bottom: 4px;
//         }

//         .group-title {
//           font-size: 12px;
//           font-weight: 600;
//           color: #6c757d;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .user-list {
//           display: flex;
//           flex-direction: column;
//         }

//         .user-item {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 8px 16px;
//           cursor: pointer;
//           transition: background-color 0.2s ease;
//         }

//         .user-item:hover {
//           background: rgba(102, 126, 234, 0.1);
//         }

//         .user-avatar {
//           position: relative;
//           width: 32px;
//           height: 32px;
//           border-radius: 50%;
//           overflow: hidden;
//           flex-shrink: 0;
//         }

//         .user-avatar img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         .status-indicator {
//           position: absolute;
//           bottom: -2px;
//           right: -2px;
//           width: 12px;
//           height: 12px;
//           border-radius: 50%;
//           border: 2px solid white;
//         }

//         .user-info {
//           flex: 1;
//           min-width: 0;
//         }

//         .user-name {
//           font-weight: 500;
//           color: #495057;
//           font-size: 14px;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         .user-role {
//           font-size: 12px;
//           color: #6c757d;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         .members-container::-webkit-scrollbar {
//           width: 4px;
//         }

//         .members-container::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         .members-container::-webkit-scrollbar-thumb {
//           background: #dee2e6;
//           border-radius: 2px;
//         }



//         /* RTL styles for ChatMemberList */
// [dir="rtl"] .member-list {
//   border-left: none;
//   border-right: 1px solid #e9ecef;
// }

// [dir="rtl"] .user-item {
//   flex-direction: row-reverse;
// }

// [dir="rtl"] .status-indicator {
//   right: auto;
//   left: -2px;
// }

// [dir="rtl"] .user-info {
//   text-align: right;
// }

// [dir="rtl"] .members-container::-webkit-scrollbar {
//   direction: rtl;
// }
//       `}</style>
//         </div>
//     )
// }

// export default ChatMemberList



// No changes needed to ChatMemberList.jsx from your last working version.
// It should correctly use the props passed from the new page.
// Ensure its height is 100% to fill the allocated space in the flex container.
"use client"

const ChatMemberList = ({ users, channelMemberCount }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "#10b981" // Green
      case "away":
        return "#f59e0b" // Amber
      case "busy":
        return "#ef4444" // Red
      default:
        return "#6c757d" // Gray
    }
  }

  const UserGroup = ({ title, usersList, count }) => {
    // Renamed users to usersList to avoid conflict
    if (!usersList || usersList.length === 0) return null

    return (
      <div className="user-group">
        <div className="group-header">
          <span className="group-title">
            {title} — {count}
          </span>
        </div>
        <div className="user-list">
          {usersList.map((user) => (
            <div key={user.id} className="user-item">
              <div className="user-avatar">
                <img
                  src={user.avatar || "/placeholder.svg?query=default+avatar"}
                  alt={user.name}
                  onError={(e) => {
                    e.target.src = "/placeholder.svg"
                  }}
                />
                <div className="status-indicator" style={{ backgroundColor: getStatusColor(user.status) }}></div>
              </div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                {user.role && user.role.toLowerCase() !== "student" && <div className="user-role">{user.role}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const onlineUsersList = users.filter((user) => user.status === "online")
  const awayUsersList = users.filter((user) => user.status === "away")
  const busyUsersList = users.filter((user) => user.status === "busy")
  // Assuming you might want to show offline users from a larger list if available
  // const offlineUsersList = users.filter((user) => user.status !== "online" && user.status !== "away" && user.status !== "busy");

  return (
    <div className="member-list-wrapper">
      {" "}
      {/* Added a wrapper */}
      <div className="member-header">
        <h6>Members {channelMemberCount !== undefined ? `— ${channelMemberCount}` : ""}</h6>
      </div>
      <div className="members-scroll-container">
        <UserGroup title="Online" usersList={onlineUsersList} count={onlineUsersList.length} />
        <UserGroup title="Away" usersList={awayUsersList} count={awayUsersList.length} />
        <UserGroup title="Busy" usersList={busyUsersList} count={busyUsersList.length} />
        {/* <UserGroup title="Offline" usersList={offlineUsersList} count={offlineUsersList.length} /> */}
      </div>
      <style jsx>{`
                .member-list-wrapper {
                display: none !important; /* Hide by default */
                    width: 260px; /* Slightly wider */
                    background: #f1f3f5; /* Lighter background */
                    border-left: 1px solid #dee2e6; /* Softer border */
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    flex-shrink: 0; /* Prevent shrinking */
                }

                .member-header {
                    padding: 16px 16px;
                    border-bottom: 1px solid #dee2e6;
                    background: #e9ecef; /* Header background */
                    flex-shrink: 0;
                }

                .member-header h6 {
                    margin: 0;
                    font-weight: 600;
                    color: #495057;
                    text-transform: uppercase;
                    font-size: 12px;
                    letter-spacing: 0.5px;
                }

                .members-scroll-container {
                    flex-grow: 1;
                    overflow-y: auto;
                    padding: 12px 0; /* Increased padding */
                }

                .user-group {
                    margin-bottom: 16px;
                }

                .group-header {
                    padding: 8px 16px;
                    margin-bottom: 6px; /* Increased margin */
                }

                .group-title {
                    font-size: 11px; /* Smaller group title */
                    font-weight: 600;
                    color: #6c757d;
                    text-transform: uppercase;
                    letter-spacing: 0.8px; /* Wider spacing */
                }

                .user-list {
                    display: flex;
                    flex-direction: column;
                }

                .user-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 16px; /* Increased padding */
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                    border-bottom: 1px solid #e9ecef; /* Separator line */
                }
                .user-item:last-child {
                    border-bottom: none;
                }


                .user-item:hover {
                    background: #e9ecef; /* Hover effect */
                }

                .user-avatar {
                    position: relative;
                    width: 36px; /* Larger avatar */
                    height: 36px;
                    border-radius: 50%;
                    overflow: hidden;
                    flex-shrink: 0;
                    border: 1px solid #dee2e6; /* Avatar border */
                }

                .user-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .status-indicator {
                    position: absolute;
                    bottom: 0px; /* Adjusted position */
                    right: 0px;
                    width: 10px; /* Smaller indicator */
                    height: 10px;
                    border-radius: 50%;
                    border: 2px solid #f1f3f5; /* Border matching background */
                }

                .user-info {
                    flex: 1;
                    min-width: 0;
                }

                .user-name {
                    font-weight: 500;
                    color: #343a40; /* Darker name */
                    font-size: 0.9rem; /* Standardized size */
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .user-role {
                    font-size: 0.75rem; /* Smaller role */
                    color: #868e96; /* Lighter role color */
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-transform: capitalize;
                }

                .members-scroll-container::-webkit-scrollbar {
                    width: 5px;
                }

                .members-scroll-container::-webkit-scrollbar-track {
                    background: transparent;
                }

                .members-scroll-container::-webkit-scrollbar-thumb {
                    background: #ced4da;
                    border-radius: 3px;
                }

                /* RTL styles for ChatMemberList */
                [dir="rtl"] .member-list-wrapper {
                  border-left: none;
                  border-right: 1px solid #dee2e6;
                }

                [dir="rtl"] .user-item {
                  flex-direction: row-reverse;
                }

                [dir="rtl"] .status-indicator {
                  right: auto;
                  left: 0px;
                }

                [dir="rtl"] .user-info {
                  text-align: right;
                }
            `}</style>
    </div>
  )
}

export default ChatMemberList
