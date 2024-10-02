import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

// Layout Component for protected routes
const ProtectedLayout = ({ isAuthenticated, onLogout }) => {

  console.log("isAuthenticated", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh'}}>
      <Sidebar onLogout={onLogout}/>
      <div className='Container'>
        <Outlet /> {/* This will render child routes like AlbumList, Playlist, etc. */}
      </div>
    </div>
  );
};

export default ProtectedLayout;