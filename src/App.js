import './App.css';
import Main from './pages/Main'
import Navbar from './components/Navbar'
import { mainTheme } from './const/theme'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material';
import Footer from './components/Footer'

import { Analytics } from '@vercel/analytics/react';
function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={mainTheme}>
        {/*<Navbar />*/}
        <Main />
        <Footer />
      </ThemeProvider>
      <Analytics />
    </>
    
    
  );
}

export default App;
