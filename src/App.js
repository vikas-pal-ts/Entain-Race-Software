import { CssBaseline } from '@mui/material';
import './App.css';
import RaceTable from './components/RaceTable';
import RaceProvider from './context/Providers/RaceProvider';

function App() {
  return (
    <RaceProvider>
      <CssBaseline />
      <RaceTable />
    </RaceProvider>
  );
}

export default App;
