import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../component/Header';
import About from './About';
import Contact from './Contact';
import Courses from './Courses';
import Experiences from './Experiences';
import Intro from './Intro';
import LeftSider from './LeftSider';
import Projects from './Projects';

function Home() {
  const{loading, portfolioData}=useSelector(state=>state.root)
  return (
    <>
    <div>
    <Header/>
   {portfolioData && (<div className='bg-primary px-20 sm:px-4'>
     <Intro/>
     <About/>
     <Experiences/>
     <Projects/>
     <Courses/>
     <Contact/>
     <LeftSider/>
     </div>
  ) }
    </div>
    </>
    
    
  )
}

export default Home;

