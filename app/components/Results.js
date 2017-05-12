import React from 'react';
import queryString from 'query-string';
import api from '../utils/api.js';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';

function Profile(props){
  const info = props.profile
  return(
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className='battle_player_info'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>followers: {info.followers}</li>
        <li>following: {info.following}</li>
        <li>Public repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired
}

function Player(props){
  return(
    <div>
      <h3>{props.label}</h3>
      <p style={{teaxAlign: "center"}}>{props.score}</p>
      <Profile profile={props.profile}/>
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Results extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount(){
    let players = queryString.parse(this.props.location.search);

    api.battle([players.playerOneName, players.playerTwoName])
      .then((players)=>{
        if(players === null){
          return this.setState({
            error: "Look like there was error. Check that both users exist on github",
            loading: false
          })
        }
        this.setState({
          error: null,
          winner: players[0],
          loser: players[1],
          loading: false
        })
      });
  }
  render(){
    const {winner, loser, error, loading} = this.state;

    if(loading === true){
      return <p>LOADING...</p>
    }
    if(error){
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }
    return(
      <div className='battle_page'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

export default Results;
