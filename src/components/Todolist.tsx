import { useState, useEffect } from "react";
import { ToDoList } from "../interfaces";
import styled from "styled-components";

import { firestore, updateADocument, deleteADocument } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

import { RiDeleteBin6Fill, RiCheckboxCircleFill } from "react-icons/ri";
const Section = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
`;

const Item = styled.div`
  border: 1px solid #000;
  border-radius: 5px;
  width: 75%;
  display: flex;
  margin: 5px 0;
  justify-content: space-between;
  place-items: center;
  padding: 0 10px;
`;

const Paragraph = styled.p`
  text-decoration: ${(props) => (props.theme.done ? "line-through" : "none")};
`;

const ToDo = styled.div`
  cursor: pointer;
  height: 100%;
`;

const CheckToDo = styled.a`
  cursor: pointer;
  color: green;
  margin-right: 15px;
`;

const EliminatedToDo = styled.a`
  cursor: pointer;
  color: red;
`;

const Todolist = () => {
  const [list, setList] = useState<ToDoList[]>([]);

  useEffect(() => {
    const orderQuery = query(collection(firestore, "todos"));
    onSnapshot(orderQuery, (querySnapshot) => {
      let liststring = JSON.stringify(querySnapshot.docs.map((e) => e.data()));
      setList(JSON.parse(liststring));
    });
  }, []);

  const updateData = async (name: string, isDone: boolean) => {
    updateADocument(name, !isDone);
  };

  const eliminateData = async (name: string) => {
    deleteADocument(name);
  };

  return (
    <Section>
      {list ? (
        list.map((valuelist, index) => (
          <Item key={index}>
            <Paragraph theme={{ done: valuelist.isDone }}>
              {valuelist.name}
            </Paragraph>

            <ToDo>
              <CheckToDo
                onClick={() => {
                  updateData(valuelist.name, valuelist.isDone);
                }}
              >
                <RiCheckboxCircleFill />
              </CheckToDo>
              <EliminatedToDo
                onClick={() => {
                  eliminateData(valuelist.name);
                }}
              >
                <RiDeleteBin6Fill />
              </EliminatedToDo>
            </ToDo>
          </Item>
        ))
      ) : (
        <p>Add something to do</p>
      )}
    </Section>
  );
};

export default Todolist;
