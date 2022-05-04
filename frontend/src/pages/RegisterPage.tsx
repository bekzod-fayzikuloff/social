import style from "../assets/styles/LoginPage.module.scss";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext)
  return (
    <div className={`${style.root} ${style.register}`}>
      <div className={style.root__form}>
        <Form onSubmit={ registerUser }>

          <Form.Group className="mb-3">
            <Form.Control type="input" placeholder="Username..." name="username"/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="password" placeholder="Password..." name="password"/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="password" placeholder="Password..." name="password2"/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="Email..." name="email"/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="input" placeholder="First name..." name="first_name"/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="input" placeholder="Last name..." name="last_name"/>
          </Form.Group>

          <Button variant="outline-info" as="input" type="submit" value="Submit" />{' '}
        </Form>

        <p>
          Have account ? <Link className={style.register__headline} to="/login">Login</Link>
        </p>

      </div>
    </div>
  )
}

export default RegisterPage;