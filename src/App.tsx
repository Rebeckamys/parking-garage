import './App.css';
import Garage from './pages/Garage';
import Paper from '@mui/material/Paper';

function App() {
  return (
    <Paper elevation={3} className="wrapper">
      <Garage />
    </Paper>
  );
}

export default App;
