import React from 'react';

export default class Form extends React.Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description:'',
      image:null,
      skills:[{skill:''}],
    }

    this.fileInput = React.createRef();
 }


  handleTitle = (event) => {
    this.setState({title: event.target.value})
  };

  handleDescription = (event) => {
    this.setState({description: event.target.value})
  };

  handleImage = (event) => {
    localStorage.setItem('test',URL.createObjectURL(event.target.files[0]))
    var file = localStorage.getItem('test')

    this.setState({
      image: file
    })

    upload.post('/upload')

  };

  handleSkill = (event) => {
    this.state.skills[parseInt(event.target.className)] = event.target.value;
  };

  addSkill = () => {
    this.setState({
      skills: this.state.skills.concat([{skill:''}])
    });
  };

  removeSkill = (idx) => () => {
    console.log(idx)
    this.setState({
      skills: this.state.skills.filter((s, sidx) => idx !== sidx)
    });
  };

  changeSkill = (idx) => (event) => {
    const newSkill = this.state.skills.map((skill,sidx) => {
        if (idx !== sidx) return skill;
        return { ...skill, skill: event.target.value };
      });

    this.setState({ skills: newSkill })
  }

  clear = () => {
    this.setState({
      title: '',
      description:'',
      skills:[{skill:''}],
    })
  }

  handleSubmit = (event) => {
    var string = 'A name was submitted: ' + this.state.title+'\nwith description: '+this.state.description+'\n with these skills\n '
    this.state.skills.map((skill,idx) => {
      string = string + skill.skill + '\n'
    })
    this.clear()
    alert(string);
    event.preventDefault();
  };


  render() {
    return (

          <form onSubmit={this.handleSubmit}>
          <ul className='formList'>
            <li>
              <label> Title: </label>
              <input type="text" value={this.state.title}  onChange={this.handleTitle} />
            </li>
            <li>
            <label> Description: </label>
              <textarea value={this.state.description} onChange={this.handleDescription} />
            </li>
            <li>
            <label> Image: </label>
              <input type="file" onChange={this.handleImage} ref={this.fileInput}/>
              <img src={this.state.image}/>
            </li>
            <li>
              <label> Skills: </label>
                

                {this.state.skills.map((skills, idx) => (
                  <div>
                    <input
                      type="text"
                      className='Formskills'
                      onChange={this.changeSkill(idx)}
                      value = {skills.skill}
                    />
                    <button type="button" onClick={this.removeSkill(idx)} className="rmvSkills">-</button>
                  </div>
                  ))}
                <input type="button" value="Add Skill" onClick={this.addSkill}/>
                </li>
                
            </ul>

            <div id="submitLine">

            <input type="submit" value="Submit"/>
            <button type="button" id="clear" onClick={this.clear}> clear </button>
            
            </div>

          </form>
        );
    }
}