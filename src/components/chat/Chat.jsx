import './chat.css'

const Chat = () => {
  return (
    <div className='chat'>Chat</div>
  )
}

export default Chat
// import './chat.css'
// // import EmojiPicker from "emoji-picker-react"

// const Chat = () => {
//   return (
//     <div className="chat">
//       <div className="top">
//         <div className="user">
//           <img src="./avatar.png" alt="" />
//           <div className="texts">
//             <span>username</span>
//             <p>Lorem ipsum dolor, sit amet.</p>
//           </div>
//         </div>
//         <div className="icons">
//           <img src="./phone.png" alt="" />
//           <img src="./video.png" alt="" />
//           <img src="./info.png" alt="" />
//         </div>
//       </div>
//       <div className="center">
//           <div className="message">
//             <div className="texts">
//               <img alt="" />
//               <p>message text</p>
//               <span>message.createdAt.toDate</span>
//             </div>
//           </div>
//           <div className="message own">
//             <div className="texts">
//               <img alt="" />
//             </div>
//           </div>
//       </div>
//       <div className="bottom">
//         <div className="icons">
//           <label htmlFor="file">
//             <img src="./img.png" alt="" />
//           </label>
//           <input
//             type="file"
//             id="file"
//             style={{ display: "none" }}
//           />
//           <img src="./camera.png" alt="" />
//           <img src="./mic.png" alt="" />
//         </div>
//         <input
//           type="text"
//           placeholder="Type a message..."
//         />
//         <div className="emoji">
//           <img
//             src="./emoji.png"
//             alt=""
//             // onClick={() => setOpen((prev) => !prev)}
//           />
//           <div className="picker">
//           {/* <EmojiPicker open={open} onEmojiClick={handleEmoji} /> */}
//           </div>
//         </div>
//         <button
//           className="sendButton"
//           // onClick={handleSend}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat