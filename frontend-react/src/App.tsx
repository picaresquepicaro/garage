import './App.css'
import Login from './components/Login';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { CssBaseline } from '@mui/material';
import { Typography } from '@mui/material';
import TestStream from './components/TestStream';
import HlsPlayer from './components/HlsPlayer';

function App() {


  return (
      <Container maxWidth="xl">
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant='h5'>
              Garage Streamer
            </Typography>
          </Toolbar>
        </AppBar>
        {/* <TestStream /> */} 
        <Login />
      </Container>
  )
}

export default App