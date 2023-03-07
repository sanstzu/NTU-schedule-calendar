import { createTheme } from '@mui/material/styles';
import { amber } from '@mui/material/colors/'

export const mainTheme = createTheme({
    palette: {
        primary: {
            main: '#fba6cc',
        }
    },
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
});



export const drawerTheme = createTheme({
    palette: {
        primary: {
            main: '#EAD7E0',
        }
    },
    listItemText: {
        fontFamily: [
            'Lexend Deca',
            'sans-serif'
        ]
    }
});
