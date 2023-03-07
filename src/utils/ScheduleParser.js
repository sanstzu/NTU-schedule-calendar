import DayParser from "./DayParser";
import WeekParser from "./WeekParser";

const invalidValue = () => {
    return null;
}

const ScheduleParser = (raw) => {
    /*
    Infos:
        - Header: 14 cols
        - First row of a subject: 14 cols
        - Subject belonging to a previous row: 6 cols
    
    Return:
        object{
            isFull: 0/1
            courses: [an array full coursre index object]
        }
    */
    var text = raw.split('\n');
    const full_check = [
        'NTU Logo',
        ' ',
        '',
        'Student Automated Registration System',
        null,
        null,
        '',
        'Course	Title	AU	Course',
        'Type	Course',
        'Group	S/U Grade option	Index',
        'Number	Status	Choice	Class',
        'Type	Group	Day	Time	Venue	Remark'
    ]
    const emptycourse = {
        course: {
            code:null, 
            id:null, 
            name:null
        }, 
        index: {
            index:null,
            meetings:[]
        }
    }

    var result = {isFull: true, courses:[]}
    var cur_course = emptycourse;
    var first = true;

    for(let i = 0; i<full_check.length && result.isFull; i++){
        if(!full_check[i]) continue;
        else if(i >= text.length) break;
        else if(full_check[i] !== text[i]) result.isFull = false;
    }

    if(result.isFull) text = text.slice(12);

    var temp = [];
    var temp_index = {};
    var ptr = 0;
    var isPartOfPrevious = false;
    console.log(text);
    for (let i = 0; i<text.length; i++){

        let row = text[i];
        if(row==='') {
            result.courses.push(JSON.parse(JSON.stringify(cur_course)));
            break;
        }
        let cur_data = row.split('\t');
        for(let j = 0; j<cur_data.length; j++){
            let column = cur_data[j];
            if(isPartOfPrevious) {
                isPartOfPrevious = false;
                temp[temp.length-1] = temp[temp.length-1].concat(' ');
            } else {
                temp.push('');
            }
            temp[temp.length-1] = temp[temp.length-1].concat(column);
        }
        if(temp.length === 5 || temp.length === 14){
            isPartOfPrevious = true;
        } else if (temp.length === 6){
            let cur_index = {};

            cur_index.type = temp[0];
            cur_index.group = temp[1];
            cur_index.day = DayParser(temp[2]);
            cur_index.time_start = temp[3].substring(0,4);
            cur_index.time_end = temp[3].substring(5);
            cur_index.venue = temp[4];
            cur_index.weeks = WeekParser(temp[5]);

            if(!cur_course.index.meetings.length) {
                return null;
            }
            cur_course.index.meetings.push(cur_index);
            temp = [];
            /*
            cur_course.index.meetings.push({
                type:
            })
            */
        } else if(temp.length === 15) {
            if(!first) result.courses.push(JSON.parse(JSON.stringify(cur_course)));
            else first = false;
            cur_course = emptycourse;
            cur_course.index.meetings = [];

            cur_course.course.code = temp[0];
            cur_course.course.id = -1;
            cur_course.course.name = temp[1];

            cur_course.index.index = temp[6];

            let cur_index = {};

            cur_index.type = temp[9];
            cur_index.group = temp[10];
            cur_index.day = DayParser(temp[11]);
            cur_index.time_start = temp[12].substring(0,4);
            cur_index.time_end = temp[12].substring(5);
            cur_index.venue = temp[13];
            cur_index.weeks = WeekParser(temp[14]);

            cur_course.index.meetings.push(cur_index);
            temp = [];


        } else {
            return null;
        }
    }

    return result;
}

export default ScheduleParser;