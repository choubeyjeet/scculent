import React, { useState } from "react";
import { inbox } from "./Demo";
import { Container, Row, Col } from "rsuite";
import TrashIcon from '@rsuite/icons/Trash';
import { AlertConfirm } from "../../utility/AlertConfirm";



export const Message = (props) =>{

const [open, setOpen] = useState(false);
const [msgID, setMsgID] = useState(null)

const message = inbox.filter((item, index)=>{

    
   
    return item.id === props.messageID
   
   
})


const confirmDeletePop  = (msgId) =>{
    setMsgID(msgId);
    setOpen(!open)
}

const deleteMessage = (id) => {
    alert(id)

    setOpen(!open)
 
}

    return (
        <Container fluid="true">


{message.length> 0 ? <>
    <Row style={{border: "1px solid black", height: 650, marginRight: 20, padding: 20}}>

<Col md={24}>
  <Row>

    <Col md={22}>  <div>From: {message[0].sender}</div><br />
     <div>Subject: {message[0].subject}</div><br />
     
    
    </Col>
    <Col md={2}><TrashIcon className="addPointer" onClick={(e)=>{
   confirmDeletePop(message[0].id) }}/></Col>
    
  </Row>
  <hr />
<Row>
<Col md={24}>
<div style={{marginTop:20}}>{message[0].message} </div>
</Col>

</Row>
 
</Col>

</Row>
<Row>



</Row>
</>: <>Loading...</>}
            <AlertConfirm id={msgID} toDeleteByID={deleteMessage} open={open} setDeleteopen={setOpen}/>
        </Container>
    )
}