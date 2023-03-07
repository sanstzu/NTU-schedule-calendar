/*
def weekParser(text: str):
    weeks = []
    text = text.removeprefix('Teaching Wk')
    ranges = text.split(',')
    for i in ranges:
        interval = i.split('-')
        if(len(interval)==1):
            weeks.append(int(interval[0]))
        elif(len(interval)==2):
            for j in range(int(interval[0]), int(interval[1])+1):
                weeks.append(int(j))
        
    return weeks
*/

const WeekParser = (raw) => {
    const filtered = `Teaching Wk`

    var weeks = [];

    var ranges = raw.substring(filtered.length).split(',');
    for(let j=0; j<ranges.length; j++){
        let i = ranges[j];
        let interval = i.split('-');
        if(interval.length == 1){
            weeks.push(parseInt(interval[0]));
        } else if(interval.length == 2){
            for(let j = parseInt(interval[0]); j<=parseInt(interval[1]); j++){
                weeks.push(parseInt(j))
            }
        }
    }
    return weeks;
}

export default WeekParser;