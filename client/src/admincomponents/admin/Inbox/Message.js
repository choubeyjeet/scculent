import React, { useState } from "react";
import { inbox } from "./Demo";
import { Container, Row, Col } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import { AlertConfirm } from "../../utility/AlertConfirm";

export const Message = (props) => {
  const [open, setOpen] = useState(false);
  const [msgID, setMsgID] = useState(null);

  const confirmDeletePop = (msgId) => {
    setMsgID(msgId);
    setOpen(!open);
  };

  const deleteMessage = (id) => {
    alert(id);

    setOpen(!open);
  };

  return (
    <Container fluid="true">
      {props.message.length > 0 ? (
        <>
          <Row
            style={{
              border: "1px solid black",
              height: 650,
              overflow: "scroll",
              marginRight: 20,
              padding: 20,
            }}
          >
            <Col md={24}>
              <Row>
                <Col md={22}>
                  {" "}
                  <div>
                    From: {props.message[0].username} ({props.message[0].email})
                  </div>
                  <br />
                  <div>Subject: {props.message[0].subject}</div>
                  <br />
                </Col>
                <Col md={2}>
                  <TrashIcon
                    className="addPointer"
                    onClick={(e) => {
                      confirmDeletePop(props.message[0].id);
                    }}
                  />
                </Col>
              </Row>
              <hr style={{ height: 2 }} />
              <Row>
                <Col md={24}>
                  <div style={{ marginTop: 10 }}>
                    {props.message[0].message}{" "}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row></Row>
        </>
      ) : (
        <>Loading...</>
      )}
      <AlertConfirm
        id={msgID}
        toDeleteByID={deleteMessage}
        open={open}
        setDeleteopen={setOpen}
      />
    </Container>
  );
};
