import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { TextField, Button, Box } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import DeleteIcon from '@mui/icons-material/Delete';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';

import ListTableRow from './ListTableRow';
import course_data from '../const/course_data';
import { start_date } from '../const/const';
import icsAPI from '../api/icsAPI';

const MAX_SUGGESTION = 5;

function createData(courseCode, courseName, index) {
    return {courseCode, courseName, index}    
} 

const course_data_lite = course_data.map((element, index) =>['id', 'code', 'name'].reduce((result, key) => { 
    if(key == 'id'){
        result[key] = index;
    } else {
        result[key] = element[key]; 
    }
    return result; 
}, {}))

const filter = createFilterOptions({limit: MAX_SUGGESTION});

const ListTable = (props) => {
    const [courseCode, setCourseCode] = React.useState(null);
    const [courseIndex, setCourseIndex] = React.useState(null);
    const [inputKey, setInputKey] = React.useState(true);
    const [rowSelection, setRowSelection] = React.useState([])

    const resetCourse = () => {
        setInputKey(!inputKey)
        setCourseCode(null)
    }

    const resetIndex = () => {
        setCourseIndex(null)
    }

    const addValue = () => {
        props.push({"course": courseCode, "index": courseIndex})
        resetCourse();
        resetIndex();
    }

    const addSelection = (value) => {
        rowSelection.map((element) => {
            if (element===value) return;
        })
        setRowSelection(rowSelection.concat(value))
    }

    const removeSelection = (value) => {
        setRowSelection(rowSelection.filter((element) => element !== value));
    }

    const deleteSelected = (value) => {

        props.popSelect(rowSelection)
        setRowSelection([])
    }

    const customCourseHandler = () => {
        props.edit(-1)
    }


    return(
        <>
            <TableContainer component={Paper} sx={{mb:2}}>
                <Table sx={{ 
                    minWidth: 500,
                    backgroundColor: '#fdfdfd', 
                }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 0.08 }}></TableCell>
                            <TableCell sx={{ width: 0.1 }} align="left">Course code</TableCell>
                            <TableCell align="left">Course name</TableCell>
                            <TableCell sx={{ width: 0.2 }} align="left">Index</TableCell>
                            <TableCell sx={{ width: 0.2 }} align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.courseList.map((element, index) => (
                            <ListTableRow element={element} key={index} index={index} pop={props.pop} edit={props.edit} popSelection={removeSelection} addSelection={addSelection} />
                            
                        ))}
                        <TableRow
                            sx={{

                            }}
                        >
                            <TableCell></TableCell>
                            <TableCell colSpan={2}>
                                
                                <Autocomplete
                                    freeSolo
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);
                                        const { inputValue } = params;
                                        // Suggest the creation of a new value
                                        const isExisting = options.some((option) => inputValue === `${option.code}\t\t ${option.name}`);
                                        filtered.unshift({
                                            id: -1,
                                        });
                                        return filtered;
                                    }}
                                    renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                            {
                                                (option.id===-1)?(
                                                    <>
                                                        <AddIcon sx={{mr: 2}}/>
                                                        {`Add a custom subject`}
                                                    </>
                                                    
                                                ):`${option.code}\t ${option.name}`
                                            }
                                        </Box>
                                    )}
                                    fullWidth={true}
                                    key={inputKey}
                                    options={course_data_lite}
                                    getOptionLabel={(option) => {
                                        if(option.id != -1){
                                            return `${option.code}\t ${option.name}`
                                        } else {
                                            return ''
                                        }
                                        
                                    }}
                                    onChange={(event, value)=> {
                                            resetIndex()
                                            if(value && value.id===-1) {
                                                customCourseHandler();
                                                resetCourse();
                                            }
                                            else setCourseCode(value!==null?value:null); 
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Course Code/Name"
                                        
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                        />
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                <Autocomplete
                                    fullWidth={true}
                                    options={courseCode===null?[]:course_data[courseCode.id].indexes}
                                    disabled={courseCode === null}
                                    key={courseCode === null? '': courseCode.id}
                                    getOptionLabel={(option) => option.index }
                                    onChange={(event, value)=> {
                                        setCourseIndex(value!==null?value:null); 
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Index"
                                        
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                        />
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                <Box
                                    sx={{
                                        width:1,
                                        display:'flex',
                                        flexDirection:'row-reverse'
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        fullWidth={true}
                                        disabled={courseCode===null || courseIndex===null}
                                        onClick={addValue}
                                    >
                                        Add
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{mb:10, display:'flex', flexDirection:'row', gap: 2}}>
            <Button
                    variant="outlined"
                    fullWidth={true}
                    onClick={()=>{
                        props.parseCallback(() => (res) =>{
                            if(res.isFull) props.setCourseList(res.courses);
                            props.parseDetails('');
                        })
                        props.parseDetails('Degree Audit > View Course timetable > Select all (Ctrl+A or cmd+A), copy and paste here');
                        props.openParse();
                    }}
                    startIcon={<ContentPasteIcon />}
                >
                    Paste Schedule
                </Button>
                <Button
                    
                    variant="outlined"
                    fullWidth={true}
                    disabled={rowSelection.length === 0}
                    onClick={deleteSelected}
                    startIcon={<DeleteIcon />}
                    color="error"
                >
                    Delete Selected
                </Button>
                
            </Box>
            
        </>
    )
}

export default ListTable;