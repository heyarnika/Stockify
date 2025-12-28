import Navbar from '../components/Navbar';
import Hero from '../components/Hero'; // Add this line

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <Hero /> {/* Replace the <main> block with this */}
    </div>
  );
}

export default Home;