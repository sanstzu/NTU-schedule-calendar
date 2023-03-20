import * as React from 'react'
import { Typography, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';

import ListTable from '../components/ListTable';
import SimpleDialog from '../components/SimpleDialog';
import CourseEditor from '../components/CourseEditor';
import TextParser from '../components/TextParser';
import Export from '../components/Export';

import { Context, EDITOR, PARSE } from '../context/provider';

/*
    const pushCourseList = (course) => {
        if(checkDuplicateCourseList(course)===-1) setCourseList([...courseList, course])
    }

    const popCourseList = (index) => {
        let newList = []
        courseList.map((element,key) => {
            if(key === index) return;
            newList.push(element);
        })
        setCourseList(newList)
    }
    
    const popSelectedCourseList = (arr) => {
        let newList = []
        courseList.map((element,key) => {
            if(arr.includes(key)) return;
            newList.push(element);
        })
        setCourseList(newList)
    }

    const updateCourseList = (index, value) => {
        setCourseList([...(courseList.slice(0,index)), value, ...(courseList.slice(index+1))])
    }
    */



function Main(){
    const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
    //const [courseList, setCourseList] = React.useState([])
    //const [customAddWindow, setCustomAddWindow] = React.useState(false)
    const [parseWindow, setParseWindow] = React.useState(false)
    const [parseCallback, setParseCallback] = React.useState();
    const [parseDetailsText, setParseDetailsText] = React.useState('');
    //const [editorIndex, setEditorIndex] = React.useState(-1);

    const [state, dispatch] = React.useContext(Context);

    React.useEffect(() => {
        window.addEventListener('resize', ()=>{
            setWindowHeight(window.innerHeight);
        })
    },[])



    
    /*
    const activateEditor = (index) => {
        setEditorIndex(index)
        setCustomAddWindow(true);
    }

    const closeEditor = () => {
        setCustomAddWindow(false);
    }

    const activateParse = () => {
        setParseWindow(true);
    }

    const closeParse = () => {
        setParseWindow(false);
    }
    */

    return (
        <Box
            sx = {{
                display:'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                width: 1,
                minHeight: `${windowHeight < 720 ? windowHeight : (windowHeight - 50)}px`,
                pt:5,
            }}
        >
            <Typography component='h1' sx={{alignSelf:'center', fontSize: 30}}>
                NTU Schedule Parser 📅
            </Typography>
            
            <Box
            sx = {{
                padding: 3,
                alignSelf: 'center',
                m: 5,
                width:  {
                    xs:0.8, 
                    lg:0.5
                },
                minWidth: {
                    xs:0,
                    lg:0
                },
                maxWidth: {
                    xs:720, 
                    lg:1080
                },
            }}
        >
                <SimpleDialog 
                    onClose={() => {dispatch({type: PARSE.CLOSE_WINDOW})}}
                    open={state.parse.window}
                >
                    <Box
                        sx={{
                            padding: 3
                        }}
                    >
                        <TextParser parseCallback={parseCallback} parseDetails={parseDetailsText} close={() => {dispatch({type: PARSE.CLOSE_WINDOW})}}/>
                    </Box>
                </SimpleDialog>

                <SimpleDialog 
                    onClose={() => {dispatch({type: EDITOR.CLOSE_WINDOW})}}
                    open={state.editor.window}
                >
                    <Box
                        sx={{
                            padding: 3
                        }}
                    >
                        <CourseEditor 
                            close={()=>{dispatch({type: EDITOR.CLOSE_WINDOW})}}
                        />
                    </Box>
                </SimpleDialog>
                <ListTable/>
                <Export courseList={state.courseList} />
            </Box>
        </Box>
        
    )
}

export default Main;