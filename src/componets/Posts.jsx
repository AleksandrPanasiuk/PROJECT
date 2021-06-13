import React from 'react';

function Posts({posts, loading,showMore, reset, postsPerPage}) {

    let isDisabled = true



    if (postsPerPage!==posts.length){
        isDisabled = false
    }


    if (loading){
        return <h2>Loading...</h2>
    }


    return (
        <>
            <div className='container mb-2'>
            <button type="button"  disabled={!isDisabled} className="btn btn-info" onClick = {() =>{showMore(postsPerPage)}}>ShowMore</button>
            <button type="button" disabled={isDisabled} className="btn btn-danger" onClick = {() =>{reset(postsPerPage)}}>Reset</button>
            </div>
            <ul className="list-group mb-4">
                {
                    posts.map(post => {
                        return (<div className="card" key={post.id}>
                            <div className="card-body">
                                <h4 className="card-title">Title: {post.title}</h4>
                                <h5 className="card-title">User: {post.userId}</h5>
                                <p className="card-text">
                                    {post.body}
                                </p>

                            </div>
                        </div>)}

                    )
                }
            </ul>
        </>

    )
}

export default Posts;
