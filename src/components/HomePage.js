import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Selector from "./Selector";
import StoryTitle from "./StoryTitle";
import Button from '@material-ui/core/Button';
import { loadData} from "../prepareData/fetchData";
import Loader from "./Loader";
import Plot from "../Plot";


import { BrowserRouter , Route} from "react-router-dom";
const API = 'https://swapi.co/api/';

const FormStyles = theme => ({
    questions: {
        width: '80%'
    },

    fullContainer: {
        paddingRight: 50,
        paddingLeft: 50
    },

    inputText: {
        marginBottom: 20
    },

    paper: {
        padding: 20
    },
})


class HomePage extends Component {

    constructor(props)
    {
        super(props);
        this.state = {

            title: "",
            characters: [],
            planets: [],
            data: {
                people: [],
                planets: []
            },
            peopleLoadEndedInError: false,
            planetsLoadEndedInError: false,
            generateStory: false,
        }

        this.setPeople = this.setPeople.bind(this);
        this.setPlanets = this.setPlanets.bind(this);

        this.handleCharactersChange = this.handleCharactersChange.bind(this)
        this.handlePlanetsChange = this.handlePlanetsChange.bind(this)
        this.handleTitleChange =this.handleTitleChange.bind(this)
        this.isLoadedInitialData = this.isLoadedInitialData.bind(this);
        this.handlePeopleLoadError = this.handlePeopleLoadError.bind(this);
        this.handlePlanetsLoadError = this.handlePlanetsLoadError.bind(this);
    }

    handleTitleChange = child_value => {
        this.setState({
            title: child_value,
            generateStory: false
        });

    //    console.log(child_value)
    };

    handlePlanetsChange = child_value =>  {
        this.setState({ planets: child_value.planets,
            generateStory: false
        })
    }
    setPeople(people) {
        this.setState((state) => ({
            ...state,
            data: {...state.data, people}
        }));
    }

    setPlanets(planets) {
        this.setState((state) => ({
            ...state,
            data: {...state.data, planets}
        }));
    }
    isLoadedInitialData() {
        return this.state.data.people.length > 0 && this.state.data.planets.length > 0;
    }
    handlePeopleLoadError(err) {
        console.log('Initial loading of people has failed', err);
        this.setState((state) => ({
            ...state,
            peopleLoadEndedInError: true
        }));
    }

    handlePlanetsLoadError(err) {
        console.log('Initial loading of planets has failed', err);
        this.setState((state) => ({
            ...state,
            planetsLoadEndedInError: true
        }));
    }

    componentDidMount() {
        loadData(API + "people", this.setPeople, this.handlePeopleLoadError)
        loadData(API + "planets",  this.setPlanets, this.handlePlanetsLoadError)

    }
    handleCharactersChange (child, e) {

        setTimeout(() => {
            this.setState({
                characters: child.people,
                generateStory: false
            })
        },1000)


        //this.getchars(customProps);
    }
    checkRequiredInfo() {
        return !this.checkButton()
    }



    checkButton () {


        if(this.state.title)
        {
            if(this.state.title.length !== undefined
                && this.state.characters.length !== 0 && this.state.planets.length !== 0)
                return false
        }


        return true
    }

    handleSubmit = evt => {

        if (this.checkRequiredInfo()){
            this.setState({generateStory: true})
        }

    };

    render() {


        const customProps = {...this.state};
    //    console.log(this.props)


        const {classes} = this.props;


        if (!this.state.peopleLoadEndedInError && !this.state.planetsLoadEndedInError && !this.isLoadedInitialData()) {
            return (
                <Loader/>
            );
        }

        if(this.state.generateStory) {


            return (
                <BrowserRouter>
                    <Route  path="/" render={(props) => <Plot {...props} customProps={customProps}/>} />
                </BrowserRouter>

            )
        }
        else if(this.isLoadedInitialData()){
            return (
                <div className={classes.fullContainer}>
                    <Grid container className={classes.inputText} spacing={2} align="center">
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Choose a wise title for your story
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <StoryTitle value={this.state.title} onChange={this.handleTitleChange} placeholder={"Title for your story"}/>
                        </Grid>

                    </Grid>
                    <Grid container spacing={2} align="center">
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Choose some information for your plot
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <Selector onChange={(e) => this.handleCharactersChange(customProps, e)} data={this.state.data.people} max={1} title={"character"} customProps={customProps}  extra={"*"} >
                                </Selector>
                            </Paper>
                        </Grid>

                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <Selector onChange={(e) => this.handlePlanetsChange(customProps, e)} data={this.state.data.planets } customProps={customProps} max={1}  title={"Planet"} extra={"*"}>
                                </Selector>
                            </Paper>
                        </Grid>

                    </Grid>

                    <Grid container spacing={0} align="center">
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={this.handleSubmit} disabled={this.checkButton()}>
                                Generate Plot
                            </Button>
                        </Grid>
                    </Grid>

                </div>

            );

        }

    }
}


export default withStyles(FormStyles)(HomePage);