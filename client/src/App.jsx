const API_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './component/Loader';
import Home from './pages/Home';
import Admin from './pages/Home/Admin';
import AdminLogin from './pages/Home/Admin/AdminLogin';
import NotFound from './pages/Home/NotFound';
import { hideLoading, ReloadData, setPortfolioData, showLoading } from './redux/rootSlice';

function App() {
  const { loading, portfolioData,reloadData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  // Fetch portfolio data
  async function getData() {
    try {
      dispatch(showLoading());
      const response = await axios.get(`${API_URL}/api/portfolio/get-portfolio-data`);
      dispatch(setPortfolioData(response.data));
      dispatch(ReloadData(false))
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    } finally {
      dispatch(hideLoading());
    }
  }

  // UseEffect to fetch data only when portfolioData is null
  useEffect(() => {
    if (portfolioData === null) {
      getData();
    }
  }, [portfolioData]);

  useEffect(() => {
    if(reloadData){
      getData();
    }
  } ,[reloadData])

  return (
    <BrowserRouter>
      {loading && <Loader />}
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/admin' element={<Admin/>}/>
      <Route path='admin-login' element={<AdminLogin/>}/>
      <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
