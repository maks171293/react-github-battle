import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api.js';

function ReposGrid(props){
      console.log(props.repos);
  return(
    <ul className='popular_list'>
      {props.repos.map((repo, index)=>{
        return  (
          <li className="repo_item" key={repo.name}>
            <div>#{index + 1}</div>
            <img src={repo.owner.avatar_url} className='repo_avatar'></img>
            <a href={repo.owner.html_url}>{repo.name}</a>
            <h4>@{repo.owner.login}</h4>
            <p>{repo.stargazers_count} stars</p>
          </li>
        )
      })}
    </ul>
  )
}

function SelectLanguage (props){
    let languages = ['All', 'Javascript', 'Ruby', 'Python', 'Java', 'CSS']
    return (
      <ul className="languages">
      {languages.map((lang)=>{
        return <li
          style={lang === props.selectedLang ? {color: "#ff3300"} : null}
          onClick={props.onSelect.bind(null, lang)}
          key={lang}
          >{lang}</li>
      })}
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLang: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedLang: 'All',
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount(){
    this.updateLanguage(this.state.selectedLang)
  }
  updateLanguage(lang){
    this.setState({
      selectedLang: lang,
      repos: null
    });
    api.fetchPopularRepos(lang)
      .then((repos)=>{
        this.setState({
          repos: repos
        });
      });
  }
  render(){
    return (
      <div>
        <SelectLanguage
        selectedLang={this.state.selectedLang}
        onSelect={this.updateLanguage}
       />
       {!this.state.repos ? <p>LOADING...</p> : <ReposGrid repos={this.state.repos} />}

      </div>
    )
  }
}

export default Popular;
