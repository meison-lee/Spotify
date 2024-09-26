import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

// Layout Component for protected routes
const ProtectedLayout = ({ isAuthenticated }) => {

  console.log("isAuthenticated", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet /> {/* This will render child routes like AlbumList, Playlist, etc. */}
      </div>
    </div>
  );
};

export default ProtectedLayout;