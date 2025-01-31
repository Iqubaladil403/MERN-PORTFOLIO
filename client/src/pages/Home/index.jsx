// import React from 'react';
// import { useSelector } from 'react-redux';
// import Header from '../../component/Header';
// import About from './About';
// import Contact from './Contact';
// import Courses from './Courses';
// import Experiences from './Experiences';
// import Intro from './Intro';
// import LeftSider from './LeftSider';
// import Projects from './Projects';

// function Home() {
//   const{loading, portfolioData}=useSelector(state=>state.root)
//   return (
//     <>
//     <div>
//     <Header/>
//    {portfolioData && (<div className='bg-primary px-20 sm:px-4'>
//      <Intro/>
//      <About/>
//      <Experiences/>
//      <Projects/>
//      <Courses/>
//      <Contact/>
//      <LeftSider/>
//      </div>
//   ) }
//     </div>
//     </>
    
    
//   )
// }

// export default Home;


import { motion } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer'; // Import hook
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
  const { loading, portfolioData } = useSelector(state => state.root);

  return (
    <>
      <div>
        <Header />
        {portfolioData && (
          <div className='bg-primary px-20 sm:px-4'>
            {/* Intro Section */}
            <SectionAnimation>
              <Intro />
            </SectionAnimation>

            {/* About Section */}
            <SectionAnimation>
              <About />
            </SectionAnimation>

            {/* Experiences Section */}
            <SectionAnimation>
              <Experiences />
            </SectionAnimation>

            {/* Projects Section */}
            <SectionAnimation>
              <Projects />
            </SectionAnimation>

            {/* Courses Section */}
            <SectionAnimation>
              <Courses />
            </SectionAnimation>

            {/* Contact Section */}
            <SectionAnimation>
              <Contact />
            </SectionAnimation>

            {/* Left Sider Section */}
            <SectionAnimation>
              <LeftSider />
            </SectionAnimation>
          </div>
        )}
      </div>
    </>
  );
}

const SectionAnimation = ({ children }) => {
  // Use the Intersection Observer hook to detect when the section enters the viewport
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation will trigger only once
    threshold: 0.3, // Trigger when 30% of the element is in view
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default Home;


// /mern-project
//   ├── /backend  (Node.js + Express)
//   ├── /client (React + Vite/CRA)
//   ├── package.json
//   ├── server.js (ya index.js)
//   ├── .gitignore



