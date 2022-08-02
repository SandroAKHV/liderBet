import React from "react";
import Card from "../shared/card";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function About() {
  return (
    <Card>
      <Link to="/">Time To go back</Link>
    </Card>
  );
}

export default About;
