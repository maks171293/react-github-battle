import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

class PlayerInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    let userName = event.target.value;
      this.setState({
        username: userName
      })
  }
  handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username)
    this.state.username = '';
  }
  render(){
    return(
      <div className='player_form'>
        <form onSubmit={this.handleSubmit} className='battleForm'>
          <label className='header' htmlFor='username' >
            {this.props.label}
          </label><br></br>
          <input
            type="text"
            autoComplete="off"
            id="username"
            placeholder="Github username"
            value={this.state.username}
            onChange={this.handleChange}
          /><br></br>
           <button
             type='submit'
             disabled={!this.state.username}
             className='button'
             >
             Submit
           </button>
        </form>
      </div>
    );
  }
}

class Battle extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(id, username){
    let newState = {};
    newState[id + 'Name'] = username;
    newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
    this.setState(()=>{
      return newState;
    });
  }
  handleReset(id){
    let newState = {};
    newState[id + 'Name'] = '';
    newState[id + 'Image'] = null;
    this.setState(()=>{
      return newState;
    })
  }
  render(){
    const match = this.props.match;
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;
    const playerOneImage = this.state.playerOneImage;
    const playerTwoImage = this.state.playerTwoImage;
    return (
      <div>
        <div className='battle_page'>
          {!playerOneName &&
            <PlayerInput
              label='Player one'
              id='playerOne'
              onSubmit={this.handleSubmit}
            />}

            {playerOneImage !== null &&
              <PlayerPreview
                avatar={playerOneImage}
                username={playerOneName}
              >
                <button
                  className="reset"
                  onClick={this.handleReset.bind(null, 'playerOne')}
                  >
                  Reset
                </button>
            </PlayerPreview>}

            {playerTwoImage !== null &&
              <PlayerPreview
                avatar={playerTwoImage}
                id='playerTwo'
                username={playerTwoName}
                onReset={this.handleReset}
              >
                <button
                  className="reset"
                  onClick={this.handleReset.bind(null, 'playerTwo')}
                  >
                  Reset
                </button>
              </PlayerPreview>}

          {!playerTwoName &&
            <PlayerInput
              label='Player Two'
              id='playerTwo'
              onSubmit={this.handleSubmit}
            />}

        </div>
        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
            }}>
            Battle
          </Link>
        }
      </div>
    )
  }
}

export default Battle;
