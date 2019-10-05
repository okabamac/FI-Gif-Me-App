import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
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
        data: [],
        found: false,
    });

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    const handleChange = name => event => {
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
            data: [],
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
                data: response.data,
                loading: false
            });
            console.log(state.data);
        } catch (error) {
            setState({
                ...state,
                error: true,
                loading: false,
            });
        }
    };
    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="age-native-simple">Age</InputLabel> */}
                <div className='textInput'>
                    <Input
                        placeholder="Enter text here"
                        value={state.text}
                        onChange={handleChange('text')}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Gif it
                </Button>
                </div>
            </FormControl>
            <div className='fetchedGif'>
            </div>
        </div>
    );
}