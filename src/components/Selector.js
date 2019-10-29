import React, {Component} from 'react'
import DropDown from './DropDown';
import {
    Grid,
    IconButton,
    Button,
  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { styled } from '@material-ui/styles';
import TypoGraphy from '@material-ui/core/Typography'


class Selector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            disableButton: false
        };

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange = idx => child_value  => {
    const newData = this.state.selected.map((d, sidx) => {
        if (idx !== sidx) return d;
        return { ...d, name: child_value };
    });


    this.setState({ selected: newData});
    this.props.onChange(newData)

    };

    handleAdd = () => {


        if(this.state.selected.length < this.props.max){
            this.setState({
                selected: this.state.selected.concat([{ name: "" }])
            });
        }

        if( this.state.selected.length === this.props.max - 1 ) {
            this.setState({
                disableButton: true,
            })
        }
    };

    handleRemove = idx => () => {
        const newSelected = this.state.selected.filter((s, sidx) => idx !== sidx)
        this.setState({
            selected: newSelected
        });
        
        this.props.onChange(newSelected)

        if( this.state.selected.length !== this.props.max - 1 ) {
            this.setState({
                disableButton: false,
            })
        }
    };


    render() {
        const customProps = {...this.props};


        const data = this.props.data
        const title = this.props.title
        return (
        <div>
            <Grid container spacing={1}>
    
                <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        
                            <TypoGraphy variant="subtitle1" color="inherit" display="inline">
                            {title}s 
                            </TypoGraphy>
                            <TypoGraphy variant="caption" display="inline">
                            {this.props.extra}
                            </TypoGraphy>
                    
                    </Grid>

                    {this.state.selected.map((character, idx) => (

                        <Grid container spacing={2} key={idx}>
                            <Grid item xs={9}>
                                <DropDown data={data} key={idx} customProps={customProps} onChange={this.handleNameChange(idx)}  ></DropDown>
                            </Grid>
                                <Grid item xs={3}>
                                    <IconButton
                                    onClick={this.handleRemove(idx)}
                                    aria-label="Delete"
                                    className="small"
                                    >
                                    <DeleteIcon/>
                                    </IconButton>
                                </Grid>
                        </Grid>

                        ))}

                    <Grid item xs={12} align="center">
                        <MyButton
                            type="button"
                            variant="outlined"
                            onClick={this.handleAdd}
                            className="small"
                            disabled={this.state.disableButton}
                            >
                            Add {title}
                        </MyButton>
                    </Grid>
                </Grid>
            
            
            </Grid>
           
        </div>
        )
    }
  }
  const MyButton = styled(Button)({
    padding: '5px 20px',
    borderColor: '#ffd700',
    FontSize: 12,
  });

export default Selector;