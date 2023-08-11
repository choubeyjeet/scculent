import React, { useState } from 'react';
import { Col, Container, Row } from 'rsuite';
import icon from "./assets/img/icon.png";
import { Message } from './Message';
import {inbox} from "./Demo";
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

export const Inbox = ()=>{

    const  [emailID, setEmailId] =  useState(null);

const getEmail = (id)=>{
    
    setEmailId(id);
    
}


    return(
     <><Container fluid="true">

<Row className='marginTop'>

    <Col md={10}>
    <InputGroup style={{width: "100%"}}>
      <Input />
      <InputGroup.Button style={{width: 40}}>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>

    </Col>
</Row>
        <Row className='marginTop'>
<Col md={24}>

<Row>
<Col md={10} style={{border: "1px solid black", padding: 10, height:"650px", overflow: "scroll"}}>
{inbox.map((item, index)=>{

return (<>
<Row className='inboxItem' key={item.id} onClick={()=>{getEmail(item.id)}}> 
<Col md={24}>
<Row>
    <Col md={18}><img src={icon} style={{verticalAlign:"middle"}} alt=""/> <span>{item.sender}</span></Col>
    <Col md={6} ><div className='verticalMiddle'>{item.date}</div></Col>
</Row>

<Row style={{marginTop: 15}}>
<Col md={24}>{item.subject}</Col>
</Row>

</Col>

</Row>
</>)

})}

</Col>
<Col md={1}></Col>
<Col md={13}>

<Message messageID={emailID}/>

</Col>

</Row>

</Col>

        </Row>
        
        </Container></>
    )
}

