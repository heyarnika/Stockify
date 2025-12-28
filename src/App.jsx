import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features'; 
import HowItWorks from './components/HowItWorks';

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
}

export default Home;