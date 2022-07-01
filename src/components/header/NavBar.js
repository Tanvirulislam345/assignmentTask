import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../../context/ContextProvider';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ TotalAmount }) {
    const navigation = useNavigate();
    const { user, setUser, loading } = useAuth();
    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigation('/login');
    };
    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <AppBar position='static' sx={{ background: 'gray', py: 1, px: 3 }}>
            <Toolbar variant='dense'>
                <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }}>
                    <Typography variant='h4' color='inherit' component='div'>
                        Logo
                    </Typography>
                </IconButton>
                {user?.accessToken && (
                    <>
                        <Typography
                            variant='h6'
                            color='inherit'
                            component='div'
                            sx={{ ml: 'auto', mr: 3 }}>
                            Total Amount : {TotalAmount}
                        </Typography>
                        <Button variant='contained' onClick={handleLogout}>
                            Log Out
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
