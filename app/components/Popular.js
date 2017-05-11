import React from 'react';

class Popular extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedLang: 'All'
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  updateLanguage(lang){
    this.setState({
      selectedLang: lang
    })
  }
  render(){
    let languages = ['All', 'Javascript', 'Ruby', 'Python', 'Java', 'CSS']
    return (
      <ul className="languages">
      {languages.map((lang)=>{
        return <li
          style={lang === this.state.selectedLang ? {color: "#ff3300"} : null}
          onClick={this.updateLanguage.bind(null, lang)}
          key={lang}
          >{lang}</li>
      })}
    </ul>
    )
  }
}

export default Popular;
