import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Register.css";

const Register = ({ onRegister }) => {

  const initialvalues ={
    name:'',
    email:'',
    password:'',  
  }
  
  const validationschema = Yup.object({
    name: Yup.string()
          .required('Name is required')
          .max(20,'Must be 20 characters or less'),
    email: Yup.string()
          .email("Invalid email address")
          .required('Email is required'),
    password: Yup.string()
          .min(5, 'Must be at least 5 characters')
          .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{5,}$/,
            "Password must contain at least one letter and one number"
          )
          .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema:validationschema,
    onSubmit: (values) => {
      onRegister({ email: values.email, password: values.password });
      alert("Successfully Registered");
      formik.resetForm();
    },
  });

  return (
    <div className="register-container">
      
      <h3 className="register-heading">SignUp for ToDo App</h3>
      <form className="register-form" onSubmit={formik.handleSubmit}>
        
        <div className="form-group">
          <input
            className="form-input"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Name"
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          {formik.errors.name ? <div className="error-message">{formik.errors.name}</div>:null}
        </div>

        <div className="form-group">
          <input
            className="form-input"
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

        <div className="form-group">
          <input
            className="form-input"
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

        <button className="register-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
