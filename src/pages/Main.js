import * as React from 'react'
import { Typography, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';

import ListTable from '../components/ListTable';
import SimpleDialog from '../components/SimpleDialog';
import CourseEditor from '../components/CourseEditor';
import TextParser from '../components/TextParser';
import Export from '../components/Export';


function Main(){
    const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
    const [loaded, setLoaded] = React.useState(0);
    const [courseList, setCourseList] = React.useState([])
    const [customAddWindow, setCustomAddWindow] = React.useState(false)
    const [parseWindow, setParseWindow] = React.useState(false)
    const [parseOutput, setParseOutput] = React.useState(false)
    const [parseCallback, setParseCallback] = React.useState();
    const [parseDetailsText, setParseDetailsText] = React.useState('');
    const [editorIndex, setEditorIndex] = React.useState(-1)

    React.useEffect(() => {
        window.addEventListener('resize', ()=>{
            setWindowHeight(window.innerHeight);
        })
    },[])

    const checkDuplicateCourseList = (course) => {
        let d_index = -1
        let cstring = JSON.stringify(course)
        courseList.map((element, index) => {
            if(cstring===JSON.stringify(element)) d_index = index;
        })

        return d_index;
        
    }

    const pushCourseList = (course) => {
        if(checkDuplicateCourseList(course)==-1) setCourseList([...courseList, course])
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
                    onClose={setParseWindow}
                    open={parseWindow}
                >
                    <Box
                        sx={{
                            padding: 3
                        }}
                    >
                        <TextParser parseResult={parseOutput} parseCallback={parseCallback} parseDetails={parseDetailsText} close={closeParse}/>
                    </Box>
                </SimpleDialog>

                <SimpleDialog 
                    onClose={setCustomAddWindow}
                    open={customAddWindow}
                >
                    <Box
                        sx={{
                            padding: 3
                        }}
                    >
                        <CourseEditor 
                            openParse={activateParse} 
                            parseResult={setParseOutput} 
                            parseCallback={setParseCallback} 
                            parseDetails={setParseDetailsText}
                            selectedIndex={editorIndex} 
                            courseList={courseList} 
                            update={updateCourseList} 
                            push={pushCourseList} 
                            close={closeEditor}
                        />
                    </Box>
                </SimpleDialog>
                <ListTable
                    openParse={activateParse} 
                    parseResult={setParseOutput} 
                    parseCallback={setParseCallback}
                    parseDetails={setParseDetailsText} 
                    courseList={courseList} 
                    setCourseList={setCourseList} 
                    push={pushCourseList} 
                    pop={popCourseList} 
                    popSelect={popSelectedCourseList} 
                    edit={activateEditor}
                    
                />
                <Export courseList={courseList} />
            </Box>
        </Box>
        
    )
}

export default Main;