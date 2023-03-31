import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { grey } from '@mui/material/colors';

import InfoIcon from '@mui/icons-material/Info';

import TextField from '@mui/material/TextField';
import ScheduleParser from '../utils/ScheduleParser';

import { Context, PARSE } from '../context/provider';

const TextParser = (props) => {
    const [isRendered, setIsRendered] = React.useState(0);
    const [text, setText] = React.useState(0);
    const [state, dispatch] = React.useContext(Context);
    
    React.useEffect(() => {
        setIsRendered(0);
        setIsRendered(1);
    }, []);
    return(
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Box sx={{mb:2, display: 'flex', flexDirection: 'row', alignItems:'center' }}>
                    <Box sx={{mr: 2, width: 1}} key={isRendered}>
                        <TextField 
                            
                            label="Text Parse" 
                            onChange={(event)=>{
                                setText(event.target.value);
                            }} 
                            maxRows={3}
                            fullWidth
                            multiline
                        />
                    </Box>
                    <Button 
                            variant="contained"
                            sx={{
                                width: '150px',
                                height:'50px',
                                justifySelf:'center'
                            }} 
                            onClick={() => {

                                let res = ScheduleParser(text);
                                dispatch({type: PARSE.CLOSE_WINDOW })
                                state.parse.callback(res);
                            }}
                        >
                            Parse Text
                    </Button>
                </Box>
                <Box sx={{ display:'flex', flexDirection: 'row', alignItems:'center', justifyContent:'start' }}>
                    <InfoIcon sx={{mr:0.5, position: 'relative', top: '1px'}} fontSize='small' color='action' />
                    <Typography sx={{color: grey[600], fontSize:14}}>
                        {state.parse.text}
                    </Typography>
                </Box>
        </Box>
    )
}

export default TextParser;