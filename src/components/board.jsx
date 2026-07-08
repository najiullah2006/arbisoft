// import React, { useState } from 'react';
// import { useCurrentBoard } from '../context/CurrentBoardContext'; //uses the file currentBoardContext to get the current board. 
// import { useTheme } from '../context/ThemeContext'; // import the theme hook
// import List from './list';


// // The Board component is the main container for the board view. It displays the board's name, allows users to change the background color, 
// // and renders all lists and cards within the board.
// const Board = () => {
//   const { board, createList } = useCurrentBoard();
//   const { currentBg, setCurrentBg, colors } = useTheme(); // Destructure theme states and the themes that i added
//   const [newListTitle, setNewListTitle] = useState(''); // temp  area to store the new list title 

//   const handleListSubmit = (e) => {
//     e.preventDefault();
//     if (!newListTitle.trim()) return; //no empty spaces
//     createList(newListTitle); //create 
//     setNewListTitle(''); // set title 
//   };

//   return (
//     <div style={{ 
//       padding: '20px', 
//       height: '100vh', 
//       boxSizing: 'border-box',
//       background: currentBg, // THE COLOR IS NOW DYNAMIC 
//       color: '#fff',
//       transition: 'background 0.3s ease' // Makes color switches smooth 
//     }}>
      
//       {/* Header Toolbar //Displays the name of the board at the top of the page.*/}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '15px' }}>
//         <h1 style={{ margin: 0, fontSize: '24px' }}>{board.name}</h1>  

//         {/* 🎨 Color Scheme Picker Buttons added complexity just to see the changes */}
//         <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
//           <span style={{ fontSize: '13px', fontWeight: '500' }}>Change Background:</span>
//           {Object.entries(colors).map(([key, value]) => (
//             <button
//               key={key}
//               onClick={() => setCurrentBg(value)}
//               style={{
//                 width: '24px',
//                 height: '24px',
//                 borderRadius: '50%',
//                 background: value,
//                 border: currentBg === value ? '2px solid #fff' : '1px solid rgba(0,0,0,0.2)',
//                 cursor: 'pointer',
//                 transform: currentBg === value ? 'scale(1.1)' : 'scale(1)',
//                 transition: 'transform 0.1s'
//               }}
//               title={key}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Main Grid View of Columns */}
//       <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', overflowX: 'auto', paddingBottom: '15px' }}>
//         {board.lists.map(list => (
//           <List key={list.id} list={list} />
//           // Renders each list in the board using the List component. Each list contains its own cards and functionalities.
//         ))}

//         {/* Add list form wrapper end wala box */}
//         <div style={{ background: 'rgba(255,255,255,0.2)', width: '272px', padding: '12px', borderRadius: '12px' }}>
//           <form onSubmit={handleListSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//             <input 
//               type="text" 
//               placeholder="+ Add another list..." 
//               value={newListTitle}
//               onChange={(e) => setNewListTitle(e.target.value)}
//               style={{ padding: '8px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.9)', color: '#000' }}
//             />
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Board;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useCurrentBoard } from '../context/CurrentBoardContext';
import List from './list';

const Board = () => {
  const { boardId } = useParams();
  const { boards } = useCurrentBoard();
  
  const currentBoard = boards?.find(b => b.id === boardId);

  if (!currentBoard) {
    return <div className="p-8 text-white text-center">Board not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#1a1b23] p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between pb-2 border-b border-solid border-gray-800">
        <h2 className="text-xl font-bold text-white">{currentBoard.name}</h2>
      </div>

      <div className="flex items-start gap-4 overflow-x-auto pb-4">
        {currentBoard.lists?.map(list => (
          <List key={list.id} list={list} />
        ))}
        
        <button className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium text-left p-3 rounded-xl w-68 shrink-0 transition-colors cursor-pointer">
          + Add another list
        </button>
      </div>
    </div>
  );
};

export default Board;