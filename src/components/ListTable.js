import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { TextField, Button, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import DeleteIcon from "@mui/icons-material/Delete";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";

import ListTableRow from "./ListTableRow";

import { Context, COURSELIST, EDITOR, PARSE } from "../context/provider";

const API_URL = process.env.REACT_APP_API_URL;

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const ListTable = (props) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [searchResult, setSearchResult] = React.useState(null);

  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [courseIndex, setCourseIndex] = React.useState(null);
  const [inputKey, setInputKey] = React.useState(true);
  const [rowSelection, setRowSelection] = React.useState([]);

  const [state, dispatch] = React.useContext(Context);

  React.useEffect(() => {
    var subscribed = true;

    if (searchValue === "") return;
    const fetchResult = async () =>
      await axios.get(API_URL + "/search/", {
        params: { searchTerm: searchValue },
      });

     sleep(5e2)
     .then()
      .then(() => {
        if(!subscribed) return;
      else return fetchResult()
    })
      .then((result) => result.data)
      .then((data) => {
        if (!subscribed) return;
        setSearchResult(data);
      })
      .catch((err) => console.log(err));

    return () => {
      subscribed = false;
    };
  }, [searchValue]);

  const resetCourse = () => {
    setInputKey(!inputKey);
    setSelectedCourse(null);
  };

  const resetIndex = () => {
    setCourseIndex(null);
  };

  const addValue = () => {
    var selected = selectedCourse;
    delete selectedCourse.indexes;
    dispatch({
      type: COURSELIST.PUSH,
      course: { course: selected, index: courseIndex },
    });
    resetCourse();
    resetIndex();
  };

  const addSelection = (value) => {
    const checkedRowSelection = [];
    rowSelection.forEach((element)=> {
        if(element !== value) checkedRowSelection.push(element);
    })
    setRowSelection(checkedRowSelection.concat(value));
  };

  const removeSelection = (value) => {
    setRowSelection(rowSelection.filter((element) => element !== value));
  };

  const deleteSelected = (value) => {
    dispatch({ type: COURSELIST.POP_MULTIPLE, indexes: rowSelection });
    setRowSelection([]);
  };

  const customCourseHandler = () => {
    dispatch({ type: EDITOR.SET_INDEX, index: -1 });
    dispatch({ type: EDITOR.OPEN_WINDOW });
  };

  /*pop={props.pop} */
  return (
    <>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table
          sx={{
            minWidth: 500,
            backgroundColor: "#fdfdfd",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 0.08 }}></TableCell>
              <TableCell sx={{ width: 0.1 }} align="left">
                Course code
              </TableCell>
              <TableCell align="left">Course name</TableCell>
              <TableCell sx={{ width: 0.2 }} align="left">
                Index
              </TableCell>
              <TableCell sx={{ width: 0.2 }} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.courseList.map((element, index) => (
              <ListTableRow
                element={element}
                key={index}
                index={index}
                edit={props.edit}
                popSelection={removeSelection}
                addSelection={addSelection}
              />
            ))}
            <TableRow sx={{}}>
              <TableCell></TableCell>
              <TableCell colSpan={2}>
                <Autocomplete
                  filterOptions={(options) => {
                    options.unshift({
                        id: -1,
                    })
                    return options;
                  }}
                  onInputChange={(e, value) => {
                    setSearchResult(null);
                    setSearchValue(value);
                  }}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option.id === -1 ? (
                        <>
                          <AddIcon sx={{ mr: 2 }} />
                          {`Add a custom subject`}
                        </>
                      ) : (
                        `${option.code}\t ${option.name}`
                      )}
                    </Box>
                  )}
                  fullWidth={true}
                  key={inputKey}
                  options={searchResult === null ? [] : searchResult}
                  getOptionLabel={(option) => {
                    if (option.id !== -1) {
                      return `${option.code}\t ${option.name}`;
                    } else {
                      return "";
                    }
                  }}
                  onChange={(event, value) => {
                    resetIndex();
                    if (value && value.id === -1) {
                      customCourseHandler();
                      resetCourse();
                    } else setSelectedCourse(value !== null ? value : null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Course Code/Name"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                    />
                  )}
                />
              </TableCell>
              <TableCell>
                <Autocomplete
                  fullWidth={true}
                  options={
                    selectedCourse === null
                      ? []
                      : selectedCourse.indexes
                  }
                  disabled={selectedCourse === null}
                  key={selectedCourse === null ? "" : selectedCourse.id}
                  getOptionLabel={(option) => option.index}
                  onChange={(event, value) => {
                    setCourseIndex(value !== null ? value : null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Index"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                    />
                  )}
                />
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth={true}
                    disabled={selectedCourse === null || courseIndex === null}
                    onClick={addValue}
                  >
                    Add
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mb: 10, display: "flex", flexDirection: "row", gap: 2 }}>
        <Button
          variant="outlined"
          fullWidth={true}
          onClick={() => {
            dispatch({
              type: PARSE.SET_CALLBACK,
              callback: (res) => {
                if (res.isFull) {
                  dispatch({ type: COURSELIST.RESET });
                  res.courses.forEach((element) => {
                    dispatch({ type: COURSELIST.PUSH, course: element });
                  });
                }
                dispatch({ type: PARSE.SET_TEXT, text: "" });
              },
            });
            dispatch({
              type: PARSE.SET_TEXT,
              text: "Degree Audit > View Course timetable > Select all (Ctrl+A or cmd+A), copy and paste here",
            });
            dispatch({ type: PARSE.OPEN_WINDOW });
          }}
          startIcon={<ContentPasteIcon />}
        >
          Paste Schedule
        </Button>
        <Button
          variant="outlined"
          fullWidth={true}
          disabled={rowSelection.length === 0}
          onClick={deleteSelected}
          startIcon={<DeleteIcon />}
          color="error"
        >
          Delete Selected
        </Button>
      </Box>
    </>
  );
};

export default ListTable;
