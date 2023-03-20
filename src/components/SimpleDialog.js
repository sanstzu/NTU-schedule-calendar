import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

function SimpleDialog(props) {
    const { onClose, open, children } = props;
    
    return (
        <Dialog onClose={onClose} open={open} maxWidth='xl'>
            <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
                <IconButton size='large' onClick={onClose}><CloseIcon /></IconButton>
            </Box>
            {children}
        </Dialog>
    )
}

export default SimpleDialog