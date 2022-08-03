import React from 'react'
import styled from 'styled-components'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import db from "../firebase"
import {collection, addDoc, query,doc, getDocs, serverTimestamp, orderBy, deleteDoc} from "firebase/firestore"


const List = (props)=> {
    const {id, todo} = props.text

    // const deleteList = () => {
    //     const docRef = doc(db, "todos", id)
    //     deleteDoc(docRef)
    //     .then(() => {
    //         console.log("Entire Document has been deleted successfully.")
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    // }
  return (
    <>
  
    <li >
        {todo}
        <DeleteForeverIcon className='icons'  onClick={() => props.show(id)} />
    </li>
    
      
    </>
  )
}

export default List
