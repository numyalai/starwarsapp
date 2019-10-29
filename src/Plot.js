import React, {Component} from "react";

import {Grid} from "@material-ui/core";
import PropTypes from 'prop-types'
import Background from '../src/imgs/star_sky.jpg'
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { generatePlot } from "./PlotGenerator";

const StoryStyles = theme => ({
    root: {
        width: '100%',
        maxWidth: 500,
        minWidth: 500,
        background: `url(${Background})`,
    },
    title: {
        color: '#ffd700'
    },
    subtitle: {
        color: 'white',
    },

    body: {
        color: '#ffd700',
    },

    card: {
        align: 'center',
        width : '100%',
        maxWidth: 900,
    },
    media: {
        height: 140,
    },


})

function redirect()
{
    window.location.reload(false);
}
class Plot extends Component {



    render() {
        const {classes} = this.props;

        const {title, description} = generatePlot(this.props.customProps.characters, this.props.customProps.planets);
        const personResource = this.props.customProps.characters.resource;
        const PlanetResource = this.props.customProps.planets.resource;

        return (

            <div>

                <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={ Background}
                                title="Star Wars"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" align={"center"}>
                                    {this.props.customProps.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {description}
                            </Typography>
                                <br/>

                                <Typography fontSize={16} variant="body2" color="textPrimary" component="p">
                                    Used resources
                                </Typography>

                                <Typography fontSize={16} variant="body2" color="textPrimary" component="p">
                                    <Link target="_blank" href={personResource} >{personResource}</Link>
                                    <br/>
                                    <Link  target="_blank"  href={PlanetResource} >{PlanetResource}</Link>
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                        <CardActions style={{justifyContent: 'center'}}>

                            <Button variant="contained" color="primary" onClick={redirect}>
                                Generate New Plot
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>

            </div>
        );
    }
}


Plot.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(StoryStyles)(Plot);