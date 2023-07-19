import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from 'react-bootstrap/Collapse';
import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { generateID } from "./helper";

function CustomisationForm({ customisations, handleCustomisations }) {
  const radioStyle = {
    accentColor: "black", 
    verticalAlign: "middle", 
    width: "14px", 
    height: "14px"
  }
  const [showForm, setShowForm] = React.useState(false);
  const [custName, setCustName] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [required, setRequired] = React.useState(false);
  const [optionNum, setOptionNum] = React.useState(1);
  const [select, setSelect] = React.useState("upTo");

  function newCustomisation() {
    setShowForm(!showForm);
  }
  function changeName(value) {
    setCustName(value);
  }
  function changeOptions(value, optionIndex) {
    let newOptions = [...options];
    newOptions[optionIndex] = value;
    setOptions(newOptions);
  }
  function addOption() {
    let newOptions = [...options, ""];
    setOptions(newOptions);
  }
  function removeOption(optionIndex) {
    let newOptions = [...options];
    newOptions.splice(optionIndex, 1);
    setOptions(newOptions);
  }
  function addCustomisation() {
    const customisation = {
      id: generateID(),
      name: custName,
      options: options,
      required: required,
      select: select,
      optionNum: optionNum
    }
    const tempCust = [...customisations, customisation];
    handleCustomisations(tempCust);
    setCustName("");
    setOptions([]);
  }
  function discardCustomisation() {
    setShowForm(false);
    setCustName("");
    setOptions([]);
  }
  function changeNumber(value) {
    if (value !== "") {
      setOptionNum(parseInt(value));
    }
    else {
      setOptionNum("");
    }
  }
  return (
    <>
      <p>Food Customisations (e.g choice of sauce or drink)</p>
      <Button onClick={newCustomisation} variant="dark">
        {showForm 
          ? "-"
          : "+"
        }
      </Button> <br/> <br/>
        <Collapse in={showForm}>
          <div>
          <Form.Group className="mb-3" controlId="customisation-name">
            <Form.Label>Customisation Name</Form.Label>
            <Form.Control
                type="text"
                value={custName}
                onChange={e => changeName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Options</Form.Label>
            {options.map((option, optionIndex) => (
              <div style={{ display: "flex", alignItems: "center" }} key={optionIndex}>
                <Form.Control
                  type="text"
                  value={option}
                  onChange={e => changeOptions(e.target.value, optionIndex)}
                />
                <CloseButton onClick={() => removeOption(optionIndex)} style={{ marginLeft: "10px" }} />
              </div>
            ))} <br/>
            <Button onClick={() => addOption()} variant="dark">
              Add option
            </Button> <br/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="limits">
            <Form.Label>How many options can the customer choose? </Form.Label> <br/>  
            <Form.Select aria-label="Up to or exactly" onChange={e => setSelect(e.target.value)} id={"select"}>
              <option value="upTo">up to </option>
              <option value="exactly">exactly</option>
            </Form.Select>
            <Form.Control
              type="number"
              value={optionNum}
              onChange={e => changeNumber(e.target.value)}
              min="1"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="required">
            Are customers required to pick an option? <br/>
            <div>
              <input 
                type="radio" 
                name="optional" 
                id="optionalYes" 
                value="yes" 
                style={radioStyle}
                onChange={() => setRequired(true)}/>
              <label htmlFor="optionalYes" style={{ width: "30px", paddingLeft: "5px", marginRight: "10px" }}>Yes</label>
              <input type="radio" name="optional" id="optionalNo" value="no" style={radioStyle} onChange={() => setRequired(false)}/>
              <label htmlFor="optionalNo" style={{ width:"30px", paddingLeft: "5px" }}>No</label>
            </div>
          </Form.Group>
          <Button onClick={() => addCustomisation()} variant="dark" style={{ marginRight: "5px" }}>
            Add customisation
          </Button> 
          <Button variant="outline-danger" onClick={discardCustomisation}>
            Discard changes
          </Button> 
          </div>
        </Collapse><br/>

    </>
  )
}

export default CustomisationForm;