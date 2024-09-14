import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import "./Login.css";

const Login = ({ registeredUser }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState("");

  const navigate = useNavigate();

  const initialvalues ={
    email:'',
    password:'',  
  }

  const validationschema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues:initialvalues,
    validationSchema:validationschema,
    onSubmit: (values) => {
      if (values.email === registeredUser.email && values.password === registeredUser.password) {
        setLoggedInUser({ email: values.email });
        alert("Login Successful!!");
        navigate('/todo');
        formik.resetForm();
      } else {
        setLoginMessage("Invalid email or password");
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      
        <div className="login-container">
          <h3 className="login-heading">Login to Your ToDo App</h3>
          <form className="login-form" onSubmit={formik.handleSubmit}>

            <div className="login-form-group">
              <input
                className="login-form-input"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              {formik.errors.email ? <div className="error-message">{formik.errors.email}</div>:null}
            </div>

            <div className="login-form-group">
              <input
                className="login-form-input"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              {formik.errors.password ? <div className="error-message">{formik.errors.password}</div>:null}
            </div>

            <button className="login-button" type="submit">Login</button>
          </form>

          {loginMessage && <p className="login-message">{loginMessage}</p>}
        </div>
      )
    </div>
  );
};

export default Login;
