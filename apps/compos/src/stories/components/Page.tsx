import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { paperClasses, PaperClasses } from '@mui/material/Paper'


// import { Header } from './Header';
import './page.css';
import { AppBar, Box, Drawer } from '@mui/material';
import { Button } from './Button';
import { StocksTable } from './StocksTable';

const StocksAritcle = styled('article')({
  backgroundColor: "lightblue",
  padding: 2,
})
const drawerWidth = 240;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  // padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

export function Page(): JSX.Element {
  const theme = useTheme()
  const [open, setOpen] = useState('')

  function openFieldsDrawer() {
    console.log('fields');
    (open) ? setOpen('') : setOpen('fields')
  }
  function openSectorsDrawer() {
    console.log('sectors');
    (open) ? setOpen('') : setOpen('sectors')
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <AppBar style={{ position: 'fixed', top: 0, display: 'flex', flexDirection: 'row'}}>
        <Button label='Fields' backgroundColor='red' onClick={openFieldsDrawer} primary={true}/>
        <Button label='Sectors' onClick={openSectorsDrawer}/>
      </AppBar>
      <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: 5}}>
        <Drawer sx={{
          width: drawerWidth,
          flexShrink: 0,
          // paddingTop: 15,
          overflow: '',
          [`& .${paperClasses.root}`]: {
            position: 'static',
          }
          }}
          variant='persistent'
          anchor='left'
          open={Boolean(open)}
          
        >
          faxom

        </Drawer>
        <Main open={Boolean(open)}>
          <StocksTable></StocksTable>
        </Main>

      </Box>
    </Box>
  );
};
