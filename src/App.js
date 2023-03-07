import './App.css';
import Main from './pages/Main'
import Navbar from './components/Navbar'
import { mainTheme } from './const/theme'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material';
import Footer from './components/Footer'
function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={mainTheme}>
        {/*<Navbar />*/}
        <Main />
        <Footer />
      </ThemeProvider>
    </>
    
    
  );
}

export default App;
