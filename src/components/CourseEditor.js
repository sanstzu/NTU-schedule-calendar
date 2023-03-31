import * as React from 'react'
import { TextField, Box, Divider, Grid, Button, Paper, Typography } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save';

import CourseEditorRow from './CourseEditorRow';

import { Context, PARSE, EDITOR, COURSELIST } from '../context/provider';

const CourseEditor = (props) => {
    const [course, setCourse] = React.useState({'name':'test','code':null})
    const [indexNum, setIndexNum] = React.useState(null)
    const [indexList, setIndexList] = React.useState([]);
    const [isUpdate, setIsUpdate] = React.useState(0);
    const [isRendered, setIsRendered] = React.useState(0);
    const [updated, setUpdated] = React.useState(0);
    
    const [state, dispatch] = React.useContext(Context);

    React.useEffect(() => {
        let code, name, index, meetings;
        let selectedIndex = state.editor.index;
        if(selectedIndex === undefined || selectedIndex === -1){
            code = name = index = meetings = null;
        } else {
            ({code, name} = state.courseList[selectedIndex].course);
            ({index, meetings} = state.courseList[selectedIndex].index);
            setIndexList(meetings);
            setIsUpdate(1);
        }
        setCourse({'code': code, 'name': name});
        setIndexNum(index);
        setIsRendered(1);
    }, [state.courseList,state.editor.index]);


    

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
                            setUpdated(0);
                            dispatch({type:PARSE.SET_CALLBACK, callback:((res) => {
                                
                                setCourse(res.courses[0].course);
                                setIndexList([]);
                                setIndexList(res.courses[0].index.meetings);
                                setIndexNum(res.courses[0].index.index);
                                dispatch({type:PARSE.SET_TEXT, text:''});
                                setUpdated(1);
                                //console.log(indexList)
                            })})
                            dispatch({type:PARSE.SET_TEXT, text:'Degree Audit > View Course timetable > Select all rows of a subject, copy and paste here'});
                            dispatch({type:PARSE.OPEN_WINDOW});  
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
                                return(<Box key={(updated+key)}>
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
                            dispatch({type: COURSELIST.UPDATE, index: state.editor.index, course:new_var});
                        } else {
                            dispatch({type: COURSELIST.PUSH, course: new_var});
                        }
                        dispatch({type: EDITOR.CLOSE_WINDOW})
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