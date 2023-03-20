import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

import { amber } from '@mui/material/colors'

import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';

import { Context, COURSELIST, EDITOR } from '../context/provider';

function dayString(num){
    return ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][num]
}


function week_parser(weeks){
    let res = 'Week ';
    let l = weeks[0], r = weeks[0]
    for(let i = 1; i<weeks.length; i++){
        if(weeks[i] - r == 1) r = weeks[i];
        else {
            res = `${res} ${l==r?`${l}`: `${l}-${r}`},`
            l = r = weeks[i]
        }
    }
    res = `${res} ${l===r?`${l}`: `${l}-${r}`}`
    return res;
}

const ListTableRow = (props) => {
    const [state, dispatch] = React.useContext(Context);
    const [dropdown, setDropdown] = React.useState(false)
    const toggleDropdown = () => setDropdown(!dropdown)

    return (
        <>
            <TableRow
                key={props.index} 
                sx={{
                    '&:last-child td, &:last-child th': {border:0}
                }}
                
            >
                <TableCell align="right" onClick={toggleDropdown}>
                    <IconButton aria-label="delete" size="small" onClick={() => {toggleDropdown()}}>
                        {dropdown?<ArrowDropUpIcon />:<ArrowDropDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left" component='th' scope='row' onClick={toggleDropdown}>
                    {props.element.course.code}
                </TableCell>
                <TableCell align="left" onClick={toggleDropdown}>{props.element.course.name}</TableCell>
                <TableCell align="left" onClick={toggleDropdown}>{props.element.index.index}</TableCell>
                <TableCell  >
                    <Box sx={{display:'flex', flexDirection:'row'}}>
                        <IconButton aria-label="delete" size="small" onClick={() => {
                            dispatch({ type: EDITOR.SET_INDEX, index: props.index })
                            dispatch({ type: EDITOR.OPEN_WINDOW })
                            }}>
                            {<EditIcon/>}
                        </IconButton>
                        <Checkbox
                            key={props.element.course.code}
                            onChange={(event) => {
                                if(event.target.checked){
                                    props.addSelection(props.index)
                                } else {
                                    props.popSelection(props.index)
                                }
                            }}
                        />
                    </Box>
                </TableCell>
                
            </TableRow>
            <TableRow
                sx={{
                    display: dropdown?'':'none',
                    backgroundColor: amber[50],
                }}
            >
                <TableCell sx={{pl: 5}} colSpan={5}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: 0.15 }}>Type</TableCell>
                                    <TableCell sx={{ width: 0.08 }}>Group</TableCell>
                                    <TableCell sx={{ width: 0.08 }}>Day</TableCell>
                                    <TableCell sx={{ width: 0.15 }}>Time</TableCell>
                                    <TableCell sx={{ width: 0.24 }}>Venue</TableCell>
                                    <TableCell sx={{ width: 0.3 }}>Weeks</TableCell>
                                </TableRow>
                                
                            </TableHead>
                            <TableBody>
                                {props.element.index.meetings.map((element, index) => {
                                    return(
                                        <TableRow
                                        key={index}
                                        sx={{
                                            '&:last-child td, &:last-child th': {border:0}
                                        }}
                                        >
                                            <TableCell>{element.type}</TableCell>
                                            <TableCell>{element.group}</TableCell>
                                            <TableCell>{dayString(element.day)}</TableCell>
                                            <TableCell>{element.time_start}-{element.time_end}</TableCell>
                                            <TableCell>{element.venue}</TableCell>
                                            <TableCell>{week_parser(element.weeks)}</TableCell>
                                        </TableRow>
                                    )
                                    
                                })}
                            </TableBody>
                        </Table>
                    
                </TableCell>
                
            </TableRow>
            
        </>
    )
}

export default ListTableRow