import * as React from 'react'
import { Typography, Box, Autocomplete, TextField, Button } from '@mui/material';
import course_data from '../const/course_data';

const course_data_lite = course_data.map((element, index) =>['id', 'code', 'name'].reduce((result, key) => { 
    if(key == 'id'){
        result[key] = index;
    } else {
        result[key] = element[key]; 
    }
    return result; 
}, {}))



function ListInput(props){
    const [courseCode, setCourseCode] = React.useState(null);
    const [courseIndex, setCourseIndex] = React.useState(null);
    const [inputKey, setInputKey] = React.useState(true);


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


    return(
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Autocomplete
                sx={{ width: 300 }}
                key={inputKey}
                options={course_data_lite}
                getOptionLabel={(option) => `${option.code} - ${option.name}` }
                onChange={(event, value)=> {
                        resetIndex()
                        setCourseCode(value!==null?value:null); 
                }}
                renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Course Name"
                      
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                )}
            />
            <Autocomplete
                sx={{ width: 300 }}
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
                      label="Course Index"
                      
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                )}
            />
            <Button
                variant="contained"
                sx = {{
                    width: 300,
                    mt: 2,
                }}
                disabled={courseCode===null || courseIndex===null}
                onClick={addValue}
            >
                Submit
            </Button>
        </Box>
    );
}

export default ListInput;