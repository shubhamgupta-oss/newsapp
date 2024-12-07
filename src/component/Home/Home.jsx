import React, { useContext, useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import './Home.css';
import Card from '../Card/Card';
import { MyContext } from '../../context/mycontext';

const Home = () => {
  const { data, fetchData: fetchFromContext } = useContext(MyContext);
  const [fetchVal, setFetchVal] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(15); 

  const API = "7e67665fa67e4888ab202533ec6262eb";
  
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=today&from=2024-11-06&sortBy=publishedAt&apiKey=${API}`
        );
        const allData = await response.json();
        setFetchVal(allData.articles || []);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    }
    fetchInitialData();
  }, []);

  const handleButton = (topic) => {
    setSelectedTopic(topic);
    fetchFromContext(topic);
  };

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data && data.length > 0
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : fetchVal.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 
  const totalItems = data && data.length > 0 ? data.length : fetchVal.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="Main-Home">
      <NavBar />
      <div className="headingPage">
        <h1 className="headingNews">Breaking News and Updates . . .</h1>

        <div className="tags-section">
          {["Technology", "Sports", "Politics", "Entertainment", "Health", "Business"].map((topic) => (
            <button
              key={topic}
              className={`tag ${selectedTopic === topic ? 'active' : ''}`}
              onClick={() => handleButton(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="news-cards">
        {currentItems.length > 0
          ? currentItems.map((val, index) => <Card val={val} key={index} />)
          : <div>Data not available. Please search for what you are looking for.</div>
        }
      </div>

    
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
