import React, { useState, useEffect } from "react";
import { Col, Container, Pagination, Row } from "rsuite";
import icon from "./assets/img/icon.png";
import { Message } from "./Message";

import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { getInbox } from "../../features/inbox/inboxThunk";
import { useDispatch } from "react-redux";
import DateFormat from "../../../usercomponents/DateFormat/DateFormat";

export const Inbox = () => {
  const [emailID, setEmailId] = useState(null);
  const [prev, setPrev] = React.useState(true);
  const [next, setNext] = React.useState(true);
  const [first, setFirst] = React.useState(true);
  const [last, setLast] = React.useState(true);
  const [ellipsis, setEllipsis] = React.useState(true);
  const [boundaryLinks, setBoundaryLinks] = React.useState(true);
  const [activePage, setActivePage] = React.useState(1);
  const [size, setSize] = React.useState("xs");
  const [maxButtons, setMaxButtons] = React.useState(5);
  const [total, setTotal] = React.useState(0);
  const [layout, setLayout] = React.useState([
    "total",
    "-",
    "limit",
    "|",
    "pager",
    "skip",
  ]);
  const [limit, setLimit] = React.useState(5);
  const [message, setMessage] = useState([]);
  const [messagePreivew, setPreview] = useState([]);

  const dispatch = useDispatch();

  const getEmail = (id) => {
    // setEmailId(id);

    const messageP = message.filter((item, index) => {
      return item._id === id;
    });
    console.log(message);
    setPreview(messageP);
  };

  useEffect(() => {
    const getMessage = async () => {
      try {
        const messageS = await dispatch(
          getInbox({ page: activePage, perPage: limit })
        );

        const { count, message } = messageS.payload;
        setTotal(count);
        setMessage(message);
      } catch (err) {
        console.error(err);
      }
    };
    getMessage();
  }, []);
  return (
    <>
      <Container fluid="true">
        <Row className="marginTop">
          <Col md={10}>
            <InputGroup style={{ width: "100%" }}>
              <Input />
              <InputGroup.Button style={{ width: 40 }}>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </Col>
        </Row>
        <Row className="marginTop">
          <Col md={24}>
            <Row>
              <Col
                md={10}
                style={{
                  border: "1px solid black",
                  padding: 10,
                  height: "650px",
                  overflow: "scroll",
                }}
              >
                {message.map((item, index) => {
                  return (
                    <>
                      <Row
                        className="inboxItem"
                        key={item.id}
                        onClick={() => {
                          getEmail(item._id);
                        }}
                      >
                        <Col md={24}>
                          <Row>
                            <Col md={18}>
                              <img
                                src={icon}
                                style={{ verticalAlign: "middle" }}
                                alt=""
                              />{" "}
                              <span>{item.username}</span>
                            </Col>
                            <Col md={6}>
                              <div
                                className="verticalMiddle"
                                style={{ fontSize: 10 }}
                              >
                                <DateFormat timestamp={item.createdAt} />
                              </div>
                            </Col>
                          </Row>

                          <Row style={{ marginTop: 15 }}>
                            <Col md={24}>{item.subject}</Col>
                          </Row>
                        </Col>
                      </Row>
                    </>
                  );
                })}
              </Col>
              <Col md={1}></Col>
              <Col md={13}>
                <Message message={messagePreivew} />
              </Col>
            </Row>

            <Row style={{ padding: 20 }}>
              <Col md={24}>
                <Pagination
                  layout={layout}
                  size={size}
                  prev={prev}
                  next={next}
                  first={first}
                  last={last}
                  ellipsis={ellipsis}
                  boundaryLinks={boundaryLinks}
                  total={total}
                  limit={limit}
                  limitOptions={[10, 20, 50]}
                  maxButtons={maxButtons}
                  activePage={activePage}
                  onChangePage={setActivePage}
                  onChangeLimit={setLimit}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
