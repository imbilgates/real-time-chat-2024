import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import Chat from '../componant/Chat';

const Home = () => {
  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Real-Time Chat
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Chat />
        </div>
      </Paper>
    </Container>
  );
}

export default Home;
