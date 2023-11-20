import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Assuming you have a suitable icon

function TopBar() {
  return (
    <div
      style={{
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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link to='/home' style={{ color: '#FFF', textDecoration: 'none' }}>
        PixEra
      </Link>

      <Link
        to='/user_profile'
        style={{ color: '#FFF', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
      >
        <AccountCircleIcon style={{ marginRight: '5px' }} />
        Profile
      </Link>
    </div>
  );
}

export default TopBar;
