import './App.css?inline'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';


function App() {

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            PersonalTrainer
          </Typography>
          <Typography variant="h6" style={{ marginLeft: 'auto' }}>
            <nav >
              <Link style={{ color: 'white', textDecoration: 'none', padding: 8 }} to={"/"}>Home</Link>
              <Link style={{ color: 'white', textDecoration: 'none', padding: 8 }} to={"/customers"}>Customers</Link>
              <Link style={{ color: 'white', textDecoration: 'none', padding: 8 }} to={"/trainings"}>Trainings</Link>
              <Link style={{ color: 'white', textDecoration: 'none', padding: 8 }} to={"/calendar"}>Calendar</Link>
              <Link style={{ color: 'white', textDecoration: 'none', padding: 8 }} to={"/chart"}>Chart</Link>
            </nav>
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  )
}

export default App
