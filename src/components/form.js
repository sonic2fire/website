import React from 'react';

var form = {}
form.state = {
                title: '',
                description:'',
                skills: ['',],
              };

function handleTitle(event) {
  form.state.title = event.target.value;
};

function handleDescription(event) {
  form.state.description = event.target.value;
};

function handleSkill(event) {
  form.state.skills[parseInt(event.target.className)] = event.target.value;
};

function handleSubmit(event) {
  alert('A name was submitted: ' + form.state.title+'\nwith description: '+form.state.skills);
  event.preventDefault();
};

const Form = () => (
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" onChange={handleTitle} />
        </label>
        <label>
          Description:
          <input type="text" onChange={handleDescription} />
        </label>
        <label>
          Skills:
          <input type="text" onChange={handleSkill} className="1"/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    
);

export default Form
