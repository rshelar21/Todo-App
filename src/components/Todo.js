import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import db from "../firebase"
import {collection, addDoc, query, getDocs, serverTimestamp, orderBy} from "firebase/firestore"


const Todo = () => {
    const [value, setValue] = useState('')
    const [arr, setArr] = useState([])

    useEffect(() => {
        let payload = []

        const getData = async () => {
            const dataRef =  collection(db, "todos")
            const q = query(dataRef, orderBy("timestamp"));
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
            console.log(doc.data())
            payload = [...payload, doc.data().todo]
            setArr(payload)
            
           
        })
        }

        getData()

    })

    const setData = () => {
        setArr([...arr, value])
        const docRef = addDoc(collection(db, "todos"), {
            todo: value,
            timestamp : serverTimestamp(),
        })
        setValue('')
        console.log("id" , docRef.id)

    }
    console.log(arr)
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
                        <li key={index}>{item}</li>
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

}
`


const Main = styled.div`
margin-top: 10px;



ul {
    list-style: none;
}
li {
    padding: 10px 0;
}
`



export default Todo
