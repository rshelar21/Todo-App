import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import db from "../firebase"
import {collection, addDoc, query,doc, getDocs, serverTimestamp, orderBy, deleteDoc} from "firebase/firestore"
import List from './List';


const Todo = () => {
    const [value, setValue] = useState('')
    const [arr, setArr] = useState([])

    useEffect(() => {
        

        const getData = async () => {
            // let payload = []
            const dataRef =  collection(db, "todos")
            const q = query(dataRef, orderBy("timestamp"));
            const querySnapshot = await getDocs(q)
            console.log(querySnapshot.docs)
            setArr(querySnapshot.docs.map((doc) => ({...doc.data() , id: doc.id})))
        //     querySnapshot.forEach((doc) => {
        //     console.log(doc.data())
        //     payload.push({id: doc.id, todo: doc.data().todo}) 
           
        // })
        // setArr(payload)

        }

        getData()

    }, )

    const setData = () => {
        // setArr([...arr, value])
        const docRef = addDoc(collection(db, "todos"), {
            todo: value,
            timestamp : serverTimestamp(),
        })
        setValue('')
        // console.log("id" , docRef.id)

    }

   
    console.log(arr)

    const delList = async (data) => {
        await deleteDoc(doc(db, "todos", data))
        

    }

    
    
  return (
    <>
    <Container>
    <Box>
        <h2>Todo List</h2>
        <Input>
        <input type="text" placeholder='enter todo'  value={value} onChange={(event) => setValue(event.target.value)}/>
        <button disabled={!value} onClick={setData}>ADD</button>
        </Input>

        <Main>
        <ul>
            { 
                arr.map((item , index) => {
                    return(
                        <List key={index} text={item}  show={delList}/>
                    )
                })
            }
        </ul>

        </Main>
    </Box>
    </Container>

    </>
  )
}

const Container = styled.div`
width: 100vw;
height: 100vh;
background-color: aquamarine;
display: flex;
justify-content: center;
align-items: center;

`

const Box = styled.div`
max-width: 350px;
width: 100%;
background: #fff;
border-radius: 5px;
text-align: center;
padding: 20px;



`

const Input = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 10px;

input {
    flex-grow: 1;
    margin-right: 10px;
    padding: 0 10px;
    height: 40px;
}

button {
    padding: 10px;
    border: none;
    outline: none;
    border: 1px solid lightgray;
    cursor: pointer;

}
`


const Main = styled.div`
margin-top: 10px;



ul {
    list-style: none;
}
li {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;


    .icons {
        background: red;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
    }
}
`



export default Todo
