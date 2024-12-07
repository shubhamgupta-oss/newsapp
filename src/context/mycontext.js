import React, { createContext, useState } from 'react';

const MyContext = createContext();

const API = "7e67665fa67e4888ab202533ec6262eb";

const MyContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  async function fetchData(intrestWord) {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${intrestWord}&apiKey=${API}`);
      const allData = await response.json();
      setData(allData.articles || []);   
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  }

  return (
    <MyContext.Provider value={{ data, fetchData }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
