import React from 'react';


function Pagination({ postsPerPage,totalPosts , paginate }) {
    const pageNumbers =[]

    for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <>
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key = {number} className="page-item">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a onClick={() =>paginate(number)} href='#' className='page-link'>{number}</a>
                        </li>
                    ))}
                </ul>
            </nav>

        </>
    );
}

export default Pagination;
