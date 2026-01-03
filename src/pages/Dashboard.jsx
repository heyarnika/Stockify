import Dashnav from '../components/Dashnav';
import Trendcards from '../components/Trendcards';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="pagebg">
      <Dashnav />
      <div className='greeting'>
        <h2>Market Dashboard</h2>
        <p>Hi, cutiees - Track today's trending stocks and market movements</p>
      </div>
      <Trendcards />
      
    </div>
  );
}

export default Dashboard;