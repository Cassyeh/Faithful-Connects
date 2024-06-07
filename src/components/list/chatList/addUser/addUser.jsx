import './addUser.css';
import { db } from "../../../../lib/firebase";
import {arrayUnion, collection, doc, getDoc, getDocs,
    query, serverTimestamp, setDoc, updateDoc,where,} 
    from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUserStore } from "../../../../lib/userStore";

const AddUser = () => {

  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();
  
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
        if (!username || username.trim().length == 0) { //.trim() removes left white spaces until it reaches a char
            return toast.warn("Please enter username to search!");
        }
        const userRef = collection(db, "users");
  
        const q = query(userRef, where("username", "==", username));
  
        const querySnapShot = await getDocs(q);
  
        if (!querySnapShot.empty) {
          setUser(querySnapShot.docs[0].data());
        }
        else toast.error("No user found");
      } catch (err) {
        console.log(err);
      }
    };

    const handleAdd = async () => {
        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");
    
        try {
          const newChatRef = doc(chatRef);
    
          await setDoc(newChatRef, {
            createdAt: serverTimestamp(),
            messages: [],
          });
        //   console.log(newChatRef.id);
    
          await updateDoc(doc(userChatsRef, user.id), {
            chats: arrayUnion({
              chatId: newChatRef.id,
              lastMessage: "",
              receiverId: currentUser.id,
              updatedAt: Date.now(),
            }),
          });
    
          await updateDoc(doc(userChatsRef, currentUser.id), {
            chats: arrayUnion({
              chatId: newChatRef.id,
              lastMessage: "",
              receiverId: user.id,
              updatedAt: Date.now(),
            }),
          });
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div className='addUser'>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
      <div className="user">
          <div className="detail">
            <img src={user.avatar || "./user.png"} alt="" />
            <span>
            {/*If username searched for is your own, it'll show it plus (YOU) */}
            {user.username == currentUser.username ? user.username + ' (YOU)': user.username}
            </span>
          </div>
          <button onClick={handleAdd}>Add User</button>
      </div>
      )}
    </div>
  );
};

export default AddUser
// import "./addUser.css";
// import { db } from "../../../../lib/firebase";
// import {
//   arrayUnion,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   serverTimestamp,
//   setDoc,
//   updateDoc,
//   where,
// } from "firebase/firestore";
// import { useState } from "react";
// import { useUserStore } from "../../../../lib/userStore";

// const AddUser = () => {
//   const [user, setUser] = useState(null);

//   const { currentUser } = useUserStore();

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const username = formData.get("username");

//     try {
//       const userRef = collection(db, "users");

//       const q = query(userRef, where("username", "==", username));

//       const querySnapShot = await getDocs(q);

//       if (!querySnapShot.empty) {
//         setUser(querySnapShot.docs[0].data());
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleAdd = async () => {
//     const chatRef = collection(db, "chats");
//     const userChatsRef = collection(db, "userchats");

//     try {
//       const newChatRef = doc(chatRef);

//       await setDoc(newChatRef, {
//         createdAt: serverTimestamp(),
//         messages: [],
//       });

//       await updateDoc(doc(userChatsRef, user.id), {
//         chats: arrayUnion({
//           chatId: newChatRef.id,
//           lastMessage: "",
//           receiverId: currentUser.id,
//           updatedAt: Date.now(),
//         }),
//       });

//       await updateDoc(doc(userChatsRef, currentUser.id), {
//         chats: arrayUnion({
//           chatId: newChatRef.id,
//           lastMessage: "",
//           receiverId: user.id,
//           updatedAt: Date.now(),
//         }),
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="addUser">
//       <form onSubmit={handleSearch}>
//         <input type="text" placeholder="Username" name="username" />
//         <button>Search</button>
//       </form>
//       {user && (
//         <div className="user">
//           <div className="detail">
//             <img src={user.avatar || "./avatar.png"} alt="" />
//             <span>{user.username}</span>
//           </div>
//           <button onClick={handleAdd}>Add User</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddUser;