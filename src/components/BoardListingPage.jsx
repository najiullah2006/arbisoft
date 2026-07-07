// This file has been commented out because the BoardListingPage component is not currently in use.
// It was intended to provide a listing of all boards for the user, 
// but it has been disabled for now. The code remains here for future reference or potential reactivation.


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCurrentBoard } from '../context/CurrentBoardContext';
// import { useUser } from '../context/UserContext';

// //all the dependencies are imported here. 

// const BoardListingPage = () => {
//   const { boards, createBoard } = useCurrentBoard();
//   const { user } = useUser();
//   const navigate = useNavigate();

//   const handleCreate = (e) => {
//     e.preventDefault(); //stops any default browser action from triggering. 
//     const title = prompt('Enter board name:');
//     if (title) createBoard(title); // If a title is provided, create a new board with that title
//   };

//           // username heading or basic user. 
//           //the circle with the initials of the user or a default U.

//   return (
//     <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: '#333' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
//         <h2>Welcome back, {user?.name || 'User'}!</h2> 
//         <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: user?.avatarColor || '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
//           {user?.initials || 'U'}    
//         </div>
//       </div>


//     //Display the list of boards in a grid layout

//       <h3 style={{ marginBottom: '20px', color: '#555' }}>Your Boards</h3>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
//         //iterates over all the boards and displays them in a grid layout. Each board is clickable and navigates to its respective page.
//         {boards.map(b => (
//           <div 
//             key={b.id} 
//             onClick={() => navigate(`/boards/${b.id}`)}
//             style={{ background: '#0079bf', color: '#fff', padding: '24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
//           >
//             {b.name}
//           </div>
//         ))}
//         // new board creation button is displayed at the end of the grid. When clicked, it prompts the user to enter a name for the new board and creates it.
//         <div 
//           onClick={handleCreate}
//           style={{ background: '#f1f2f4', color: '#172b4d', padding: '24px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//         >
//           + Create new board
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BoardListingPage;