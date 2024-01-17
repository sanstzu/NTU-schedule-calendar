> Note from (1/18/24): Thank you for using my very first project for your schedule 🤩, but unfortunately, there  won't be any maintenance or update for future class schedules 🥺. But, I would like to promote an alternative and better site [NTUMods 📅](https://ntumods.org) (I am one of the developers 😊) that has more features including the one I made on this site.

# NTU Schedule Calendar Generator

I remembered the days where I have to suffer by manually inputting the course schedule into my calendar app. To save up few hours of my life (and yours), I created this repository. This website in this repository allows the user to export their course schedule into an iCalendar file (which can be imported into most calendar applications).

- Frontend: [React](https://reactjs.org/), [MaterialUI](https://mui.com/)
- Backend: [Express](https://expressjs.com/), [BeautifulSoup 4](https://www.crummy.com/software/BeautifulSoup/) (Webscrapping)
- iCalendar Generator: [ics](https://github.com/adamgibbons/ics)

[**Link to Website**](https://ntucal.vercel.app)

## How to use it

There are two ways to input your course schedule, as well as the ability to modify it.

### Manual Input

You can manually type the course and index into the inputs of the first table.

<img src="https://user-images.githubusercontent.com/26087840/223480914-42a8e962-9fe8-41fc-a3bf-de86eb804bc2.png" width="720">

Simply enter the course code or the course name into the first input and the suggestions will appear from the collected data.

<img src="https://user-images.githubusercontent.com/26087840/223481445-a27e47a4-db0f-41a0-aec6-7f0e287c392c.png" width="360">

Your desired module does not appear? You can add your own customized module by inserting manually as well (if you are a masochist),

<img src="https://user-images.githubusercontent.com/26087840/223482311-a6f7b410-ab73-470b-b88b-f79df7a2fd8c.png" width="360">

or you can import from your Course Timetable by copying the row(s) of the subject you wanted to import

<img src="https://user-images.githubusercontent.com/26087840/223493991-57d04138-dcff-42ce-9c6c-43a0683f295f.png" width="720">

### Quick Input

Simply select everything (Ctrl+A or cmd+A) from your timetable, paste into the 'PASTE SCHEDULE', and voila! All ready in a single click.

<img src="https://user-images.githubusercontent.com/26087840/223489475-afbf28eb-4fdd-4053-ad1c-09e8b8c0be5c.png" width="480">

### Text formatting

Dislike the default format of the calendar title? You can create your own with the available variables (listed on the website).

<img src="https://user-images.githubusercontent.com/26087840/223490009-e047089d-5825-4704-80d2-3c679b1058c3.png" width="480">

# Suggestions

If you have any suggestions or input, feel free to contact me through [my email](mailto:claytonfernalo@gmail.com).&nbsp;

<img src="https://media.tenor.com/591bCuq_tyMAAAAC/bocchi-bocchitherock.gif" width="360">

# Changelogs
- (1/18): Repository archived
- (12/25): Updated Calendar for AY 23/24 Semester 2
- (08/22): Fixed error for schedules after Recess Week
- (06/16): Updated Calendar for AY 23/24 Semester 1 and Implemented Backend
- (03/20): Fixed prop drilling with the use of `useContext` and `useReducer`
- (03/07): Initial Commit
