import * as React from 'react';

import { Button, Collapse, Box, TextField, Typography, Paper, List, ListItem, Card } from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import InfoIcon from '@mui/icons-material/Info';

import icsAPI from "../api/icsAPI";
import { stringFormat } from '../api/icsAPI';
import {start_date} from "../const/const"

import { blue, grey } from '@mui/material/colors';

import  example  from '../const/example.json';

import { default_format } from '../const/const';


const Export = (props) => {
    const [format, setFormat] = React.useState(default_format)
    const [expanded, setExpanded] = React.useState(false);

    const toggleOption = () => {
        setExpanded(!expanded);
    }
    
    return (
        <Box component={Paper} 
        sx={{
            display:'flex', 
            flexDirection:'column', 
            p:3,
            backgroundColor: '#fdfdfd' 
        }}>
            <Box sx={{display: 'flex'}}>
                <Box sx={{display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent:'start'}}   onClick={toggleOption}>
                    <Box sx={{position:'relative', top:'5px', mr: 1}}>
                        {expanded?<ArrowDropUpIcon />:<ArrowDropDownIcon />}
                    </Box>
                    <Typography sx={{color: blue[500]}}>Export format</Typography>
                </Box>
                
                
            </Box>
            <Collapse in={expanded} sx={{mb:2, px:3}}>
                <Card sx={{p:2}}>
                    <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                        Variable List
                    </Typography>
                    <List>
                        <ListItem>
                            <Typography variant="body2">Course Name = <Typography component='span' sx={{fontFamily: `'Courier', serif`}}>{`!{course_name}`}</Typography></Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="body2">Course Code = <Typography component='span' sx={{fontFamily: `'Courier', serif`}}>{`!{course_code}`}</Typography></Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="body2">Course Index = <Typography component='span' sx={{fontFamily: `'Courier', serif`}}>{`!{course_index}`}</Typography></Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="body2">Meeting Type = <Typography component='span' sx={{fontFamily: `'Courier', serif`}}>{`!{meeting_type}`}</Typography></Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="body2">Meeting Group = <Typography component='span' sx={{fontFamily: `'Courier', serif`}}>{`!{meeting_group}`}</Typography></Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="body2">Meeting Venue = <Typography component='span' sx={{fontFamily: `'Courier', serif`}}>{`!{meeting_venue}`}</Typography></Typography>
                        </ListItem>
                    </List>
                </Card>
                
                <TextField 
                    variant='standard'   
                    label={`Text Format`}
                    sx={{my:1}} 
                    onChange={(event)=>{
                        
                        if(event.target.value===''){
                            setFormat(default_format);
                        } else {
                            setFormat(event.target.value);
                        }
                    }} 
                    fullWidth
                />
                <Typography>Preview: {stringFormat(format, example, example.index.meetings[0])}</Typography>
                <Box sx={{ display:'flex', flexDirection: 'row', alignItems:'center', justifyContent:'start' }}>
                    <InfoIcon sx={{mr:0.5, position: 'relative', top: '1px'}} fontSize='small' color='action' />
                    <Typography sx={{color: grey[600], fontSize:14}}>
                        {`The default format is `}
                        <Typography component="span" sx={{fontFamily:'Courier'}}>{default_format}</Typography>
                    </Typography>
                </Box>
            </Collapse>
            <Button
                sx={{mb:1}}
                variant="outlined"
                disabled={props.courseList.length===0}
                fullWidth={true}
                onClick={()=>{
                    icsAPI(props.courseList, new Date(start_date), format);
                }}
                startIcon={<DownloadIcon />}
            >
                Download Calendar File
            </Button>
        </Box >
    
    );
    
}

export default Export;