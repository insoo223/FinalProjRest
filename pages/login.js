/* Original /pages/login.js */

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
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
import { login } from "../components/authStrapi";
import AppContext from "../components/context";
//added by Insoo on Sep 27, 2021
import {LoginGoogle, LogoutGoogle, LoginFirebase} from "../components/authGoogle"; 

//added by Insoo on Sep 28, 2021
//when running in debuggin mode, set it true or false
const DEBUG = true; 

// -------------------- Login -------------------- 
function Login(props) {
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);
  
  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.push("/"); // redirect if you're already logged in
    }
  }, []);


  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  // -------------------- LoginUserStrapi -------------------- 
  //refactored by Insoo on Sep 28, 2021
  const LoginUserStrapi=() => {
    
    if (DEBUG) console.log("called LoginUserStrapi");

    //entry validation: added by Insoo on Sep 28, 2021
    if (data.email == "" || data.password == "") {
      if (DEBUG) console.log("inside if condition");
      alert ('Please, check your entry. Every field should be filled up.')
      setLoading(false);
      return;
    } //if 
    //end of validation
    
    setLoading(true);
    login(data.identifier, data.password)
      .then((res) => {
        setLoading(false);
        // set authed User in global context to update header/app state
        appContext.setUser(res.data.user);
        appContext.isAuthenticated = true;
        appContext.login = true;
        
        alert(`Success to login as ${JSON.stringify(res.data.user.email)} approved by Strapi`);
      }) //then
      .catch((error) => {
        //setError(error.response.data);
        setLoading(false);
      }); //catch
    
      setLoading(false);
  } //LoginUserStrapi
  // -------------------- (End) LoginUserStrapi -------------------- 

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 0 }}>
          <div className="paper">
            <div className="header">
              {/* // ims src modified by Insoo on Sep 22, 2021 */}
              {/* <img src="http://localhost:1337/uploads/5a60a9d26a764e7cba1099d8b157b5e9.png" /> */}
              <img src="https://2a64nz1v15bg2wnfsl3jk3ld-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/logo-mit-png-mit-logo-793.png" width="180" height="90" />
              <h2>Log In</h2>
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
                  
                  {/* ------------ email ------------ */}
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      id="email"
                      onChange={(event) => onChange(event)}
                      name="identifier"
                      // style modified by Insoo on Sep 28, 2021 
                      // style={{ height: 50, fontSize: "1.2em" }}
                      style={{ height: 30, fontSize: "1em" }}

                    />
                  </FormGroup>

                  {/* ------------ password ------------ */}
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      id="password"
                      onChange={(event) => onChange(event)}
                      type="password"
                      name="password"
                      // style modified by Insoo on Sep 28, 2021 
                      // style={{ height: 50, fontSize: "1.2em" }}
                      style={{ height: 30, fontSize: "1em" }}
                    />
                  </FormGroup>

                  {/* ------------ Forgot password & Buttons ------------ */}
                  <FormGroup>
                    <span>
                      <a href="">
                        <small>Forgot Password?</small>
                      </a>
                    </span>
                    <br></br>
                    {/* ------------ Button Login by Strapi ------------ */}
                    <Button
                      // style modified by Insoo on Sep 28, 2021 
                      // style={{ float: "right", width: 120 }}
                      style={{ float: "left", width: 140 }}
                      color="primary"
                      onClick={() => {LoginUserStrapi()}}
                    >
                      {/* text modified by Insoo on Sep 28, 2021: Submit -> Login to Strapi */}
                      {loading ? "Loading... " : "Login by Strapi"}
                    </Button>
                    <br></br>
                    <br></br>

                    {/* ------------ Button Login by Google ------------ */}
                    <Button 
                      id="googlelogin" 
                      style={{ float: "left", width: 140 }}
                      color="success"
                      onClick={() => {LoginGoogle()}}
                    >
                      Login by Google 
                    </Button>

                    {/* ------------ Button Logout by Google ------------ */}
                    <Button 
                      id="googlelogout" 
                      style={{ float: "right", width: 140 }}
                      color="success"
                      onClick={() => {LogoutGoogle()}}
                    >
                      Google Logout
                    </Button>

                    <br></br>
                    <br></br>

                    {/* ------------ Button Login by Firebase ------------ */}
                    <Button 
                      id="firelogin" 
                      style={{ float: "left", width: 140 }}
                      color="warning"
                      onClick={() => {LoginFirebase()}}
                    >
                      Firebase Login
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
}

export default Login;
