import * as React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { TextField, Box, Grid, IconButton } from '@mui/material';

const CourseEditorRow = (props) => {
    let type, group, day, time_start, time_end, venue, weeks;
    ({type, group, day, time_start, time_end, venue, weeks} = props);

    const updateIndexList = props.update;

    const update = (component) => (event) => {
        if(component==='weeks'){
            let tmp = [];
            let raw = event.target.value.split(',')
            for(let i = 0; i<raw.length; i++){
                let x = parseInt(raw[i]);
                if(x < 0 || x > 13) continue;
                tmp.push(x);
            }
            console.log(tmp);
            updateIndexList(props.index,component,event.target.value===''?[]:tmp);
        } else {
            updateIndexList(props.index,component,event.target.value===''?null:event.target.value);
        }
        
    }

    return (
        <Box sx={{display:'flex', flexDirection:'row'}}>
            <Grid sx={{'&:last-child, &:last-child ': {border:0}, py:1}} container spacing={0.1}>
                <Grid sx={{px: 2}} item xs={6} md={2}>
                    {/*Combo box with add custom feature*/}
                    <TextField variant='standard' label="Type" onChange={update('type')} defaultValue={type} fullWidth/>
                </Grid>
                <Grid sx={{px: 2}} item xs={6} md={2}>
                    <TextField variant='standard' label="Group" onChange={update('group')} defaultValue={group} fullWidth/>
                </Grid>
                <Grid sx={{px: 2}} item xs={6} md={1}>
                    {/*List*/}
                    <TextField variant='standard' label="Day" onChange={update('day')} defaultValue={day} fullWidth/>
                </Grid>
                <Grid sx={{px: 2}} item xs={6} md={1}>
                    {/*List*/}
                    <TextField variant='standard' label="Start" onChange={update('time_start')} defaultValue={time_start} fullWidth/>
                </Grid>
                <Grid sx={{px: 2}} item xs={6} md={1}>
                    {/*List*/}
                    <TextField variant='standard' label="End" onChange={update('time_end')} defaultValue={time_end} fullWidth/>
                </Grid>
                <Grid sx={{px: 2}} item xs={6} md={2}>
                    <TextField variant='standard' label="Venue" onChange={update('venue')}defaultValue={venue} fullWidth/>
                </Grid>
                <Grid sx={{px: 2}} item xs={6} md={2}>
                    <TextField variant='standard' label="Weeks" onChange={update('weeks')}defaultValue={weeks} fullWidth/>
                </Grid>
            </Grid>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <IconButton sx={{height:1}} aria-label="delete" onClick={()=>props.delete(props.index)}>
                    <DeleteIcon />
                </IconButton>
            </Box>
            
        </Box>
        
    );
}

export default CourseEditorRow;