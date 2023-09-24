import { Link } from 'react-router-dom';

function TopBar() {
  return (
    <div style={{
      backgroundColor: '#1A1A1A',
      padding: '10px',
      textAlign: 'left',
      color: '#FFF',
      fontSize: '24px',
      fontWeight: 'bold',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '40px',
      zIndex: 1000, // set a higher z-index
    }}>
       <Link to='/' style={{ color: '#FFF', textDecoration: 'none' }}>
      Picsera
      </Link>
    </div>
  );
}

export default TopBar;
