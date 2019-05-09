import React from 'react';

import '../styles/UrunSatis.css';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

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


class UrunSatis extends React.Component {
    state = {
        id: '',
        adet: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onFormSubmit = event => {
        event.preventDefault();
        //TODO burada sunucuya urun tanimla adresine istek yapacak
        console.log(`${this.state.id}, ${this.state.adet}`);
    };

    render() {
        const {classes} = this.props;

        return(
            <div className={"flex-center"}>
                <h2>Ürün Satış</h2>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onFormSubmit}>
                    <TextField
                        id="standard-number"
                        label="Ürün ID"
                        value={this.state.id}
                        onChange={this.handleChange('id')}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <TextField
                        id="standard-number"
                        label="Adet"
                        value={this.state.adet}
                        onChange={this.handleChange('adet')}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <Button type={"submit"} variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(UrunSatis);