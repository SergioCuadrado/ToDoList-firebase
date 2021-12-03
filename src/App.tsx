import { useState } from "react";
import Todolist from "./components/Todolist";

import { ToDoList } from "./components/interfaces";
import { addANewDocument } from "./firebase";

import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";

import { BsSunFill, BsMoonFill } from "react-icons/bs";

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  padding: 8px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  margin: 0;
`;

const SectionToDo = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;

  label {
    cursor: pointer;
  }

  input {
    margin: 0 10px;
    height: 40px;
    width: 50%;
    border-radius: 10px;
    border: none;
    padding-left: 10px;
    font-size: 16px;
  }

  button {
    border-radius: 10px;
    border: none;
    width: 45px;
    height: 40px;
    cursor: pointer;
  }
`;

const ChangeColor = styled.button`
  border: none;
  border-radius: 10px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  background-color: ${(props) =>
    props.theme.color === "light" ? "#805ad5" : "#fbd38d"};

  &:hover {
    background-color: ${(props) =>
      props.theme.color === "light" ? "#7348d5" : "#ffcf7b"};
  }
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
    if (values.name !== "") {
      addANewDocument(values);
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />

      <Header>
        <Title>ToDo List with Firebase</Title>
        <ChangeColor onClick={themeToggler} theme={{ color: theme }}>
          {theme === "light" ? <BsMoonFill /> : <BsSunFill />}
        </ChangeColor>
      </Header>

      <SectionToDo>
        <label htmlFor="todo">ToDo List</label>
        <input
          type="text"
          name="name"
          id="todo"
          autoFocus
          onChange={(e) => addValue(e)}
        />
        <button onClick={sendData}>Save</button>
      </SectionToDo>

      <Todolist theme={theme} />
    </ThemeProvider>
  );
};

export default App;
