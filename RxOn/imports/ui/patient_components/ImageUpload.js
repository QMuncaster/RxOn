import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default function ImageUpload() {
    return (
        <div>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
        </div>
    );
}
