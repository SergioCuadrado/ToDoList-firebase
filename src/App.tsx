import { useState } from "react";
import Todolist from "./components/Todolist";

import { ToDoList } from "./interfaces";
import { addANewDocument } from "./firebase";

import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";

import { BsSunFill, BsMoonFill } from "react-icons/bs";

const ChangeColor = styled.button`
  background-color: ${(props) =>
    props.theme.color === "light" ? "#805ad5" : "#fbd38d"};
`;

const App = () => {
  const [values, setValue] = useState<ToDoList>({
    name: "",
    isDone: false,
  });

  const [theme, setTheme] = useState("dark");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const addValue = (e: any) => {
    const { name, value } = e.target;
    setValue({ ...values, [name]: value, isDone: false });
  };

  const sendData = async (e: any) => {
    e.preventDefault();
    addANewDocument(values);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <label htmlFor="todo">ToDo List</label>
        <input
          type="text"
          name="name"
          id="todo"
          autoFocus
          onChange={(e) => addValue(e)}
        />
        <button onClick={sendData}>Save</button>
        <ChangeColor onClick={themeToggler} theme={{ color: theme }}>
          {theme === "light" ? <BsMoonFill /> : <BsSunFill />}
        </ChangeColor>
        <Todolist />
      </>
    </ThemeProvider>
  );
};

export default App;
