import * as React from 'react'
import { TextField, Box, Divider, Grid, Button, Paper, Typography } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save';

import CourseEditorRow from './CourseEditorRow';


const CourseEditor = (props) => {
    const [course, setCourse] = React.useState({'name':'test','code':null})
    const [indexNum, setIndexNum] = React.useState(null)
    const [indexList, setIndexList] = React.useState([]);
    const [isUpdate, setIsUpdate] = React.useState(0);
    const [isRendered, setIsRendered] = React.useState(0);
    const [updated, setUpdated] = React.useState(0);
    

    React.useEffect(() => {
        let code, name, index, meetings;

        if(props.selectedIndex === undefined || props.selectedIndex === -1){
            code = name = index = meetings = null;
        } else {
            ({code, name} = props.courseList[props.selectedIndex].course);
            ({index, meetings} = props.courseList[props.selectedIndex].index);
            setIndexList(meetings);
            setIsUpdate(1);
        }
        setCourse({'code': code, 'name': name});
        setIndexNum(index);
        setIsRendered(1);
    }, [props.courseList,props.selectedIndex])

    

    const addEmptyIndex = () => {
        setIndexList([...indexList,{'type':null, 'group':null, 'day':null, 'time_start':null, 'time_end':null, 'venue':null, 'weeks':null}])
    }

    const updateIndexList = (index, member, value) => {
        let pre = indexList.slice(0,index);
        let post = indexList.slice(index+1);
        let cur = indexList[index];
        cur[member] = value;
        setIndexList([...pre,cur,...post]);
    }

    const deleteIndexList = (index) => {
        setIndexList([...(indexList.slice(0,index)), ...(indexList.slice(index+1))])
    }


    if (!isRendered) return null;

    return (
        <>  
            <Box sx={{p:5, mb:5}} key={isRendered && updated} component={Paper}>
                <Box sx={{display:'flex', flexDirection:'row', gap: 2, }}>
                    <Typography variant="h4">Course Details</Typography>
                    <Button 
                        variant="outlined"
                        onClick={()=>{
                            props.parseCallback(() => (res) => {
                                setUpdated(0);
                                setCourse(res.courses[0].course);
                                setIndexList(res.courses[0].index.meetings);
                                setIndexNum(res.courses[0].index.index);
                                props.parseDetails('');
                                setUpdated(1);
                            })
                            props.parseDetails('Degree Audit > View Course timetable > Select all rows of a subject, copy and paste here');
                            props.openParse();    
                        }}
                    >
                        Import Rows From Degree Audit
                    </Button>
                </Box>
                <Grid sx={{mt:0.5, mb:2}} container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <TextField 
                            label="Course Code" 
                            onChange={(event)=>{
                                let tmp = course;
                                tmp.code = event.target.value===''?null:event.target.value;
                                setCourse(tmp);
                            }} 
                            defaultValue={course.code} 
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            label="Course Name"
                            onChange={(event)=>{
                                let tmp = course;
                                tmp.name = event.target.value===''?null:event.target.value;
                                setCourse(tmp);
                            }}  
                            defaultValue={course.name}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField 
                            label="Index" 
                            onChange={(event)=>{
                                setIndexNum(event.target.value===''?null:event.target.value)
                            }}
                            defaultValue={indexNum} 
                            fullWidth
                        />
                    </Grid>
                </Grid>
                
            </Box>
            

            <Box sx={{p:5, mb:5}} component={Paper}>
                <Box sx={{display:'flex', flexDirection:'row', gap: 2}}>
                    <Typography variant="h4">Index Details</Typography>
                    
                </Box>
                <Box sx={{mt:2, p:1}}>
                            {indexList.map((element, key) => {
                                return(<Box key={key}>
                                    <Divider light />
                                    <CourseEditorRow key={key} index={key} {...element} update={updateIndexList} delete={deleteIndexList}/>
  
                                </Box>
                                
                            )})}
                            <Divider light />
                </Box>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={addEmptyIndex}>Add new meeting</Button>
            </Box>
            <Box sx={{display:'flex', flexDirection:'row-reverse'}}>
                
                <Button 
                    variant="contained"
                    startIcon={isUpdate?<SaveIcon />:<SendIcon />}
                    sx={{
                        justifySelf:'center'
                    }} 
                    onClick={() => {
                        let new_var = {'course': null, 'index': null}
                        new_var.course = {'id': -1, 'code': course.code, 'name': course.name}
                        new_var.index = {'index': indexNum, 'meetings': indexList}
                        if(isUpdate){
                            props.update(props.selectedIndex,new_var)
                        } else {
                            props.push(new_var);
                            
                        }
                        props.close();
                    }}
                >
                    {isUpdate?'Update':'Create'}
                </Button>
                {/*
                <Button 
                    variant="contained"
                    startIcon={<SendIcon />}
                    sx={{
                        justifySelf:'center'
                    }} 
                    onClick={() => {
                        setUpdated(0);
                        let res = ScheduleParser(test_value);
                        setCourse(res.courses[0].course);
                        setIndexList(res.courses[0].index.meetings);
                        setIndexNum(res.courses[0].index.index);
                        setUpdated(1);
                    }}
                >
                    {isUpdate?'Update':'Create'}
                </Button>
                <Box key={updated}>
                    <TextField 
                        
                        label="Course Code" 
                        onChange={(event)=>{
                            setTest_value(event.target.value);
                        }} 
                        defaultValue={course.code} 
                        fullWidth
                        required
                        multiline
                    />
                </Box>
                */}
            </Box>
            
                                
        </>
    );
}

export default CourseEditor;