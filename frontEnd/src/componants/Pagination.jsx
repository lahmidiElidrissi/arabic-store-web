const Pagination = ({ currentPage, lastPage, onPageChange }) => {
    const getPaginationNumbers = () => {
        const pages = [];
        const delta = 5; // Number of pages to show before and after the current page

        for (let i = Math.max(1, currentPage - delta); i <= Math.min(lastPage, currentPage + delta); i++) {
            pages.push(i);
        }

        return pages;
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < lastPage) onPageChange(currentPage + 1);
    };

    return (
        <nav>
            <ul className="flex justify-center">

                {/* Previous Page Button */}
                <li>
                    <button 
                        className={`m-2 px-3 py-1 border rounded ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
                        onClick={handlePreviousPage} 
                        disabled={currentPage === 1}
                    >
                        &lsaquo;
                    </button>
                </li>

                {/* Page Numbers */}
                {getPaginationNumbers().map(page => (
                    <li key={page}>
                        <button 
                            className={`m-2 px-3 py-1 border rounded ${page === currentPage ? 'bg-yellow-500 text-slate-600' : 'bg-white text-slate-600'}`} 
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* Next Page Button */}
                <li>
                    <button 
                        className={`m-2 px-3 py-1 border rounded ${currentPage === lastPage ? 'opacity-40 cursor-not-allowed' : ''}`} 
                        onClick={handleNextPage} 
                        disabled={currentPage === lastPage}
                    >
                        &rsaquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
};



export default Pagination;