import React from 'react';

import '../styles/UrunEkle.css';
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        width: '40%'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
});


class UrunEkle extends React.Component {
    state = {
        tip: '',
        marka: '',
        model: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onFormSubmit = event => {
        event.preventDefault();
        //TODO burada sunucuya urun tanimla adresine istek yapacak
        console.log(`${this.state.tip}, ${this.state.marka}, ${this.state.model}`);
    };

    render() {
        const {classes} = this.props;

        return(
            <div className={"flex-center"}>
                <h2>Ürün Tanımla</h2>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onFormSubmit}>
                    <TextField
                        id="outlined-name"
                        required
                        label="Ürün Tipi"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange('tip')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Marka"
                        className={classes.textField}
                        value={this.state.marka}
                        onChange={this.handleChange('marka')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Model"
                        className={classes.textField}
                        value={this.state.model}
                        onChange={this.handleChange('model')}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button type={"submit"} variant="contained" color="primary" className={classes.button}>
                        Primary
                    </Button>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(UrunEkle);