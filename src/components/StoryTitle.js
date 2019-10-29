import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types'



class StoryTitle extends Component {
    constructor(props) {
      super(props);
      this.state = {text: "",  helperText: "", error: false };
    }
  
    onChange(event) {
             
      this.setState({ text: event.target.value, 
        helperText: '', 
        error: false });
        
      if (event.target.value.length === 0) {
        this.setState({ helperText: 'Required', error: true });
      }

this.props.onChange(event.target.value)
    }
s
    render() {
        const {classes} = this.props;

      return (
            <TextField
            className={classes.questions}
            helperText={this.state.helperText}
            onChange={this.onChange.bind(this)}
            error={this.state.error}
            required
            id="outlined-required"
            label={this.props.placeholder}
            />
            );
    }
}

const StoryStyles = theme => ({
    questions: {
        width: '80%'
    },
  })

StoryTitle.propTypes = {
    classes: PropTypes.object.isRequired
};    

export default withStyles(StoryStyles)(StoryTitle);