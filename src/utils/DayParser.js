/*
def dayClassifier(text):
    daylist = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    return int(daylist.index(text))
*/

const DayParser = (raw) => {
    const dayList = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return dayList.indexOf(raw)!=-1?dayList.indexOf(raw):null;
}

export default DayParser;
