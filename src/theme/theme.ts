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
  interface ButtonPropsVariantOverrides {
    chip: true;
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
      main: '#900782',
      contrastText: '#FFF',
    },
    guide: {
      main: '#0C3B82',
      contrastText: '#FFF',
    },
  },
  components: {
    MuiBadge: {
      styleOverrides: {
        dot: {
          minWidth: '0.25rem',
          height: '0.25rem',
          top: '0.25rem',
          right: '-0.1125rem',
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'chip' },
          style: {
            backgroundColor: '#111',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            borderRadius: '1000000px',
            fontSize: '0.9375rem',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#222',
            },
          },
        },
      ],
      styleOverrides: {
        sizeLarge: {
          height: '3.5rem',
          maxWidth: '19.6875rem',
        },
        outlined: {
          borderColor: '#444',
          fontWeight: 600,
        },
      },
    },
  },
});
