import React from 'react';
import axios from 'axios';
import NavBar from '../Navbar/NavBar';
import { axiosURL } from "../../settings/url";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { TabContainer } from 'react-bootstrap';


export default function EditUser() {


  return (  <>
  <Container fluid>
    <Form.Floating className="mb-3">
      <Form.Control
        id="floatingInputCustom"
        type="email"
        placeholder="name@example.com"
      />
      <label htmlFor="floatingInputCustom">Email address</label>
    </Form.Floating>
    <Form.Floating>
      <Form.Control
        id="floatingPasswordCustom"
        type="password"
        placeholder="Password"
      />
      <label htmlFor="floatingPasswordCustom">Password</label>
    </Form.Floating>
    </Container>
  </>
  )
}
{/* <div>EditUser</div> */}
 