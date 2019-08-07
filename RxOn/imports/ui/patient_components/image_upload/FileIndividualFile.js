import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            <div className="m-t-sm">
                <div className="row">
                    <div className="col-md-12">
                        <strong>{this.props.fileName}</strong>
                        <div className="m-b-sm" />
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-3">
                        <a
                            href={this.props.fileUrl}
                            className="btn btn-outline btn-primary btn-sm"
                            target="_blank"
                        >
                            View
                        </a>
                    </div>

                    <div className="col-md-2">
                        <button
                            onClick={this.removeFile}
                            className="btn btn-outline btn-danger btn-sm"
                        >
                            Delete
                        </button>
                    </div>

                    <div className="col-md-4">Size: {this.props.fileSize}</div>
                </div>
            </div>
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
