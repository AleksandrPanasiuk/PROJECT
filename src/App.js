import React, {useState, useEffect} from "react";
import axios from 'axios'
import './App.css';
import Posts from "./componets/Posts";
import Pagination from "./componets/Pagination";

const App = ()=>{
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const[postPerPage, setPostPerPage] = useState(10)

    useEffect(()=>{
        const fetchPosts = async () =>{
        setLoading(true);
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(res.data)
        setLoading(false)
    }
    fetchPosts()
    },[])

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const showMorePosts = () =>{
        setPostPerPage((prevValue) => prevValue + 10)
    }

    const resetNumberOfPage = () =>{
        setPostPerPage(10)
    }



  return (
      <div className='container mt-5'>
        <h1 className='text-primary mb-3'>Pagination Homework</h1>
          <Posts posts={currentPosts} loading={loading} showMore = {showMorePosts} reset={resetNumberOfPage} postsPerPage = {postPerPage}/>
          <Pagination postsPerPage = {postPerPage} totalPosts={posts.length} paginate={paginate} />
      </div>
  );
}

export default App;
