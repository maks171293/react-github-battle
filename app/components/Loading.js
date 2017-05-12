import React from 'react';
import PropTypes from 'prop-types';

let styles = {
  content: {
    fontSize: "30px",
    color: "#ff3300"
  }
}

class Loading extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: props.text
    }
  }
  componentDidMount(){
    const stopper = this.props.text + '...';
    this.timer = setInterval(()=>{
      if(this.state.text === stopper){
        this.setState({
          text: this.props.text
        })
      }else{
        this.setState((prevState)=>{
          return {
            text: prevState.text + '.'
          }
        })
      }
    }, this.props.speed)
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  render(){
    return(
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
  text: "Loading",
  speed: 200
}

export default Loading;
