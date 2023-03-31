import { useReducer, createContext } from 'react';

export const COURSELIST = {
    PUSH: 'courselist-push',
    POP: 'courselist-pop',
    POP_MULTIPLE: 'courselist-pop-multiple',
    UPDATE: 'courselist-update',
    RESET: 'courselist-reset'
}
const courselist = new Set(Object.values(COURSELIST));

export const EDITOR = {
    OPEN_WINDOW: 'editor-open-window',
    CLOSE_WINDOW: 'editor-close-window',
    SET_INDEX: 'editor-set-index',
}
const editor = new Set(Object.values(EDITOR));

export const PARSE = {
    OPEN_WINDOW: 'parse-open-window',
    CLOSE_WINDOW: 'parse-close-window',
    SET_CALLBACK: 'parse-set-callback',
    SET_TEXT: 'parse-set-text',
}
const parse = new Set(Object.values(PARSE));

const checkDuplicateCourseList = (arr, course) => {
    let d_index = -1
    let cstring = JSON.stringify(course)
    arr.forEach((element, index) => {
        if(cstring===JSON.stringify(element)) d_index = index;
    })

    return d_index;
}

const reducer = (state, action) => {
    if(courselist.has(action.type)){
        switch(action.type){
            //COURSELIST
            case COURSELIST.PUSH:
                if (checkDuplicateCourseList(state.courseList, action.course) === -1) return {...state, 
                    courseList: [...(state.courseList), action.course] 
                };
                else return state;
            case COURSELIST.POP:
                return {...state,
                    courseList: [...(state.courseList.slice(0,action.index)), ...(state.courseList.slice(action.index+1))]
                };
            case COURSELIST.POP_MULTIPLE:
                let newList = []
                state.courseList.map((element,key) => {
                    if(!action.indexes.includes(key)) newList.push(element);
                })
                return {... state,
                    courseList: newList
                }
            case COURSELIST.UPDATE:
                return {...state,
                    courseList: [...(state.courseList.slice(0,action.index)), action.course, ...(state.courseList.slice(action.index+1))]
                }
            case COURSELIST.RESET:
                return {...state,
                    courseList: []
                };
            default: throw Error()
        }
    } else if(editor.has(action.type)) {
        switch(action.type){
            //EDITOR
            case EDITOR.OPEN_WINDOW:
                return {...state,
                    editor: { ...state.editor,
                        window: true
                    }
                }
            case EDITOR.CLOSE_WINDOW:
                return {...state,
                    editor: { ...state.editor,
                        window: false
                    }
                }
            case EDITOR.SET_INDEX:
                return {...state,
                    editor: {...state.editor,
                        index: action.index
                    }
                }
            default: throw Error()
        }
    } else if(parse.has(action.type)){
        switch(action.type){
            //EDITOR
            case PARSE.OPEN_WINDOW:
                return {...state,
                    parse: { ...state.parse,
                        window: true
                    }
                }
            case PARSE.CLOSE_WINDOW:
                return {...state,
                    parse: { ...state.parse,
                        window: false
                    }
                }
            case PARSE.SET_TEXT:
                return {...state,
                    parse: {...state.parse,
                        text: action.text
                    }
                }
            case PARSE.SET_CALLBACK:
                return {...state,
                    parse: {...state.parse,
                        callback: action.callback
                    }
                }
            default: throw Error(action)
        }
    } else {
        throw Error();
    }
}

const initial = {
    courseList: [],
    editor: {
        window: false,
        index: -1,
    },
    parse: {
        window: false,
        callback: null,
        text: '',
    }
};



export const Context = createContext();

export const Provider = (props) => {
    const [state, dispatch] = useReducer(reducer, initial);
    return (
        <Context.Provider value={[state, dispatch]}>
            {props.children}
        </Context.Provider>
    );
}