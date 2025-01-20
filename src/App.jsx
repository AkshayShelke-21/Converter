// src/App.jsx
import HeicToJpgConverter from './HeicToJpgConverter';
import { CssBaseline } from '@mui/material';
import './styles.css'; // Import your custom styles

const App = () => {
  return (
    <div className="app-container">
      <CssBaseline />
      <HeicToJpgConverter />
    </div>
  );
};

export default App;
