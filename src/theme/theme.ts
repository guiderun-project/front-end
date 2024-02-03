import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    vi: Palette['primary'];
    guide: Palette['primary'];
  }

  interface PaletteOptions {
    vi?: PaletteOptions['primary'];
    guide?: PaletteOptions['primary'];
  }
}

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    vi: true;
    guide: true;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'pretendard',
  },
  palette: {
    primary: {
      main: '#333',
    },
    vi: {
      main: '#8D345F',
      contrastText: '#FFF',
    },
    guide: {
      main: '#34788D',
      contrastText: '#FFF',
    },
  },
});
