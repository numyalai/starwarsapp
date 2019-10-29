import React, {Component} from 'react'
import {
    Select,
    MenuItem,
  } from '@material-ui/core';


class DropDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: {
                name: this.props.data[0].name,
                resource:this.props.data[0].url
            }
        };

        this.handleChange = this.handleChange.bind(this);

        if(this.props.customProps.title === "character")
        {
            this.props.customProps.customProps.people = this.state.selected;
        }
        else{
            this.props.customProps.customProps.planets = this.state.selected;
        }
    }

    componentDidMount() {
        this.props.onChange(this.state.selected)
        this.props.onChange(this.state.resource)
    }

    handleChange(event,props) {

      //  console.log(props.props.resource)
        let newValue = event.target.value
        this.setState({selected: {
                name: newValue,
                resource: props.props.resource
            }

            })
        this.props.onChange(newValue)
        if(this.props.customProps.title === "character")
        {
            this.props.customProps.customProps.people = this.state.selected;
        }
        else{
            this.props.customProps.customProps.planets = this.state.selected;
        }

      };

    renderOptions() {


        const data = this.props.data;

        return data.map((item, idx) => {

          return (
              <MenuItem
                label="Select"
                value={item.name}
                key={idx}
                name={item.name} resource={item.url} >{item.name}  </MenuItem>
          );
        });
    }

    render() {

        return (
        <div className="">
           <Select className="" value={this.state.selected.name} onChange={this.handleChange} style={{ width: '100%'}} >
               {this.renderOptions()}
           </Select>
        </div>
        )
    }
  }

export  default DropDown ;

