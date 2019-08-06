import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
   card: {
      maxWidth: 345,
   },
   media: {
      height: 140,
   },
});

class IndividualFile extends Component {
   constructor(props) {
      super(props);
      this.state = {};
      this.removeFile = this.removeFile.bind(this);
   }

   removeFile() {
      let conf = confirm('Are you sure you want to delete the file?') || false;
      if (conf == true) {
         Meteor.call('images.RemoveFile', this.props.fileId, function(err, res) {
            if (err) console.log(err);
         });
      }
   }

   render() {
      return (
         <Card className={classes.card}>
            <CardActionArea>
               <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
               />
               <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                     Lizard
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                     Lizards are a widespread group of squamate reptiles, with over 6,000
                     species, ranging across all continents except Antarctica
                  </Typography>
               </CardContent>
            </CardActionArea>
            <CardActions>
               <Button size="small" color="primary">
                  Delete
               </Button>
               <Button size="small" color="primary">
                  Upload
               </Button>
            </CardActions>
         </Card>
      );
   }
}

IndividualFile.propTypes = {
   fileName: PropTypes.string.isRequired,
   fileSize: PropTypes.number.isRequired,
   fileUrl: PropTypes.string,
   fileId: PropTypes.string.isRequired,
};

export default IndividualFile;

{
   /* <a
                            href={this.props.fileUrl}
                            className="btn btn-outline btn-primary btn-sm"
                            target="_blank"
                        >
                            View
                        </a>

                        <div className="row">
                    <div className="col-md-12">
                        <strong>{this.props.fileName}</strong>
                        <div className="m-b-sm" />
                    </div>
                </div> */
}
