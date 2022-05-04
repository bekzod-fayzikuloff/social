import { useContext } from "react";

import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import { AuthContext } from "../context/AuthContext";
import style from "../assets/styles/LoginPage.module.scss"
import { Form } from "react-bootstrap";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext)
  return (
    <div className={style.root}>
      <div className={style.root__form}>
        <Form onSubmit={ loginUser }>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="input" placeholder="Username..." name="username"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password..." name="password"/>
          </Form.Group>
          <Button variant="outline-info" as="input" type="submit" value="Submit" />{' '}
        </Form>

        <p>
          Have not account ? <Link className={style.register__headline} to="/register">Register</Link>
        </p>

      </div>
    </div>
  )
}

export default LoginPage;
