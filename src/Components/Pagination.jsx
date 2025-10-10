// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useState } from 'react';
// const Pagination = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const pages = [];

//     for (let i = 1; i <= totalPages; i++) {
//         pages.push(
//             <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
//                 <span
//                     className="page-link"
//                     onClick={() => setCurrentPage(i)}
//                 >
//                     {i}
//                 </span>
//             </li>
//         );
//     }

//     return (
//         <ul className="pagination">
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                 <span
//                     className="page-link"
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                 >
//                     <FontAwesomeIcon icon={faChevronLeft} />
//                 </span>
//             </li>
//             {pages}
//             <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                 <span
//                     className="page-link"
//                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                 >
//                     <FontAwesomeIcon icon={faChevronRight} />
//                 </span>
//             </li>
//         </ul>
//     );
// };

// export default Pagination