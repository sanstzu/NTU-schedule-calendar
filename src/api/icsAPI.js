import { default_format } from '../const/const';

const ics = require('ics');

const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes*60000);
}



const downloadFile = (text) => {
    const element = document.createElement('a');
    const file = new Blob([text], {
        type: "text/plain;charset=utf-8"
    ,});
    element.href = URL.createObjectURL(file);
    element.download = "ntucal.ics"
    document.body.appendChild(element);
    element.click();
}

export const stringFormat = (raw, course, cur_meet) => {
    const course_name = `!{course_name}`;
    const course_code = `!{course_code}`;
    const course_index = `!{course_index}`;
    const meeting_type = `!{meeting_type}`;
    const meeting_group = `!{meeting_group}`;
    const meeting_venue = `!{meeting_venue}`;
    
    let result = raw;
    result = result.replace(course_name, course.course.name);
    result = result.replace(course_code, course.course.code);
    result = result.replace(course_index, course.index.index);
    result = result.replace(meeting_type, cur_meet.type);
    result = result.replace(meeting_group, cur_meet.group);
    result = result.replace(meeting_venue, cur_meet.venue);
    return result;
}

const icsAPI = (courseList, startDate, format = default_format, recessBeforeWeek = 8) => {
    //startDate = date object of monday of the first week
    let events = [];
    let start_date = new Date(startDate.toDateString()); //removes time component


    for(let index = 0; index < courseList.length; index++){

        let course = courseList[index];

        for(let i=0; i < course.index.meetings.length; i++){

            let cur_meet = course.index.meetings[i];


            let subject = stringFormat(format, course, cur_meet);

            let date_ptr = new Date(start_date);
            date_ptr.setDate(date_ptr.getDate() + cur_meet.day);
            let date_start = addMinutes(date_ptr, parseInt(cur_meet.time_start.slice(0,2))*60 + parseInt(cur_meet.time_start.slice(2,4)));
            let date_end = addMinutes(date_ptr, parseInt(cur_meet.time_end.slice(0,2))*60 + parseInt(cur_meet.time_end.slice(2,4)));

            let preRecess = true;

            for(let j=1; j<=13; j++){
                if(j>1) {
                    date_start.setDate(date_start.getDate() + 7);
                    date_end.setDate(date_end.getDate() + 7);
                }
                if(!cur_meet.weeks.includes(j)) continue;
                if(preRecess && j===recessBeforeWeek) {
                    j--;
                    preRecess = false;
                    continue;
                }
                events.push({
                    title: subject,
                    location: cur_meet.venue,
                    start: [date_start.getFullYear(), date_start.getUTCMonth()+1, date_start.getUTCDate(), date_start.getUTCHours(), date_start.getUTCMinutes()],
                    startInputType: 'utc',
                    startOutputType: 'utc',
                    end: [date_end.getFullYear(), date_end.getUTCMonth()+1, date_end.getUTCDate(), date_end.getUTCHours(), date_end.getUTCMinutes()],
                    endInputType: 'utc',
                    endOutputType: 'utc',
                })
            }
            
        }
    }
    const {error, value} = ics.createEvents(events);
    //makelogs(cal);
    if(error) console.log(error);
    console.log(value);
    downloadFile(value);
}

export default icsAPI;