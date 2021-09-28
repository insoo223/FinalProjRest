/* Original /pages/register.js */

import React, { useState, useContext } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { registerUser } from "../components/authStrapi";
import AppContext from "../components/context";

//added by Insoo on Sep 27, 2021
import {RegUserFirebase} from "../components/authGoogle"; 

//added by Insoo on Sep 28, 2021
//when running in debuggin mode, set it true or false
const DEBUG = true; 

// -------------------- Register -------------------- 
const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const appContext = useContext(AppContext);
  
  // -------------------- RegUserStrapi -------------------- 
  //refactored by Insoo on Sep 28, 2021
  const RegUserStrapi=() => {
    
    if (DEBUG) console.log("called RegUserStrapi");

    //entry validation: added by Insoo on Sep 28, 2021
    if (data.username == "" || data.email == "" || data.password == "") {
      if (DEBUG) console.log("inside if condition");
      alert ('Please, check your entry. Every field should be filled up.')
      setLoading(false);
      return;
    } //if 
    //end of validation
    
    setLoading(true);

    registerUser(data.username, data.email, data.password)
      .then((res) => {
        // set authed user in global context object
        appContext.setUser(res.data.user);

        setLoading(false);
        console.log(`registered user: ${JSON.stringify(res.data)}`)
        alert(`Success to create a new user ${JSON.stringify(res.data.user.username)} registered on Strapi:`);
        setUser(res.data.user.username);

      }) //then
      .catch((error) => {
        console.log(`error in register: ${error}`)
        //setError(error.response.data);
        setLoading(false);
      }); //catch
    
      setLoading(false);
  } //RegUserStrapi
  // -------------------- (End) RegUserStrapi -------------------- 

  // -------------------- (return) Register -------------------- 
  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 0 }}>
          <div className="paper">
            <div id="header" className="header">
              {/* // ims src modified by Insoo on Sep 22, 2021 */}
              {/* <img src="http://localhost:1337/uploads/5a60a9d26a764e7cba1099d8b157b5e9.png" /> */}
              <img src="https://2a64nz1v15bg2wnfsl3jk3ld-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/logo-mit-png-mit-logo-793.png" width="180" height="90" />
              <h2>Register a new user</h2>
            </div>
            <section className="wrapper">
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                error.message.map((error) => {
                  return (
                    <div
                      key={error.messages[0].id}
                      style={{ marginBottom: 10 }}
                    >
                      <small style={{ color: "red" }}>
                        {error.messages[0].message}
                      </small>
                    </div>
                  );
                })}
              <Form>
                <fieldset disabled={loading}>

                  {/* ------------ username ------------ */}
                  <FormGroup>
                    <Label>Username:</Label>
                    <Input
                      id="username"
                      disabled={loading}
                      onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                      }
                      value={data.username}
                      type="text"
                      name="username"
                      // style modified by Insoo on Sep 28, 2021 
                      // style={{ height: 50, fontSize: "1.2em" }}
                      style={{ height: 30, fontSize: "1em" }}
                    />
                  </FormGroup>

                  {/* ------------ email ------------ */}
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      id="email"
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      value={data.email}
                      type="email"
                      name="email"
                      style={{ height: 30, fontSize: "1em" }}
                    />
                  </FormGroup>
                  
                  {/* ------------ password ------------ */}
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      id="password"
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      value={data.password}
                      type="password"
                      name="password"
                      style={{ height: 30, fontSize: "1em" }}
                    />
                  </FormGroup>

                  {/* ------------ Buttons ------------ */}
                  <FormGroup>
                    {/* ------------ Button Reg by Strapi ------------ */}
                    <Button
                      id="btnRegStrapi"
                      style={{ float: "left", width: 140 }}
                      color="primary"
                      disabled={loading}
                      onClick={() => RegUserStrapi()}
                    >
                      {loading ? "Loading.." : "Reg. on Strapi"}
                    </Button>
                    
                    {/* ------------ Button Reg by Firebase  ------------ */}
                    <Button 
                      id="firesignup" 
                      style={{ float: "right", width: 140 }}
                      color="warning"
                      disabled={loading}
                      onClick={() => {RegUserFirebase()}}
                    >
                      Reg. on Firebase
                    </Button>

                  </FormGroup>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
        `}
      </style>
    </Container>
  );
  
}; //const Register


export default Register;
