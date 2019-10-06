import React, { useState, useRef }from 'react';
import axios from 'axios';
import TwitterShare from './TwitterShare'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        textAlign: 'center'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function GifTranslation() {
    const api_key = process.env.API_KEY;
    const classes = useStyles();
    const [state, setState] = React.useState({
        text: '',
        error: false,
        loading: false,
        img_url: '',
        found: false,
    });
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(1);

    const handleChange = name => event => {
        event.persist();
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    const handleSubmit = async e => {
        e.preventDefault();
        if (!state.text) return;
        setState({
            ...state,
            error: false,
            loading: false,
            img_url: '',
            found: false,
        });
        try {
            setState({
                ...state,
                loading: true,
            });
            const response = await axios.get(`https://api.giphy.com/v1/gifs/translate?api_key=${api_key}&s=${state.text}`);
            setState({
                ...state,
                found: true,
            });
            if (!response) setState({
                ...state,
                found: false,
            });
            setState({
                ...state,
                img_url: response.data.data.images.downsized.url,
                loading: false,
                error: false,
                found: true,
            });
        } catch (error) {
            setState({
                ...state,
                error: true,
                loading: false,
            });
        }
    };

    return (
        <div>
            <form className={classes.formControl} onSubmit={handleSubmit}>
                {/* <InputLabel htmlFor="Text Input">Enter text</InputLabel> */}
                <div className='textInput'>
                    <Input
                        value={state.text}
                        name="Text Input"
                        onChange={handleChange('text')}
                        placeholder="Enter text here"
                    />
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                        Gif it
                </Button>
                </div>
            </form>
            <div>
                {state.loading ? (
                    <div className="loader" />
                ) : (
                        <div>
                            {!state.found && state.error ? (
                                <span className="message" style={{ color: "red" }}>
                                    <p>Something went wrong, please try again</p>
                                </span>
                            ) : (
                                    <div className="message">
                                        {state.img_url &&
                                        <div>
                                            <img src={state.img_url} />
                                            <TwitterShare url={state.img_url}/>
                                        </div>
                                        }
                                    </div>
                                )}
                        </div>
                    )}
            </div>
        </div>
    );
}