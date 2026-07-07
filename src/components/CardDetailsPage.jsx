//This file has been commented out because the CardDetailsPage component is not currently in use. 
// It was intended to provide a modal view for detailed information about a specific card within a board, 
// but it has been disabled for now. but the code remains here for future reference or potential reactivation.


// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useCurrentBoard } from '../context/CurrentBoardContext';

// // The CardDetailsPage component is a modal that displays detailed information about a specific card. 

// const CardDetailsPage = () => {
//   const { boardId, cardId } = useParams();
//   const navigate = useNavigate();
//   const { board } = useCurrentBoard();
//   // It retrieves the current board and the specific card based on the URL parameters. 
//   // If the card is not found, it returns null. 
//   // Otherwise, it displays the card's title and ID in a modal overlay, with a close button to navigate back to the board view.

//   const currentCard = board.lists
//     .flatMap(l => l.cards)
//     .find(c => c.id === cardId);
//     //flatmap collapses everything into a single array and then find the card with the matching id.

//   if (!currentCard) return null;

//   return (
//     <div style={{
//       position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
//       background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
//     }}>
//       <div style={{ background: '#fff', color: '#000', padding: '24px', borderRadius: '15px', width: '450px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
//           <h2 style={{ margin: 0 }}>📋 {currentCard.title}</h2>
//           <button onClick={() => navigate(`/boards/${boardId}`)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
//         </div>
//         <p style={{ color: '#666', fontSize: '14px' }}>Card ID: <code>{cardId}</code></p>
//         <p style={{ marginTop: '20px', color: '#444' }}>This is your dedicated modal space for card details.</p>
//       </div>
//     </div>
//   );
// };

// export default CardDetailsPage;