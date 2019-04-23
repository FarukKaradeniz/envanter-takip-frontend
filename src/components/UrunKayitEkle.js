import React from 'react';

import '../styles/UrunEkle.css';
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

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


class UrunKayitEkle extends React.Component {
    state = {
        giris: '',
        sonkullanma: '',
        adet: '',
        urunler: [
            {
                value: 1,
                label: "Telefon"
            },
            {
                value: 2,
                label: "Araba"
            }
        ],
        secilen: 1,
    };

    componentWillMount = () => {
        //todo burada urunler icin istek yapilacak ve ürün tipi listesi dönüşü yapilacak
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onFormSubmit = event => {
        event.preventDefault();
        //TODO burada sunucuya urun kayit adresine istek yapacak
        console.log(`${this.state.giris}, ${this.state.sonkullanma}, ${this.state.adet}, ${this.state.secilen}`);
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={"flex-center"}>
                <h2>Ürün Kaydı Ekle</h2>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onFormSubmit}>
                    <TextField
                        id="outlined-name"
                        required
                        label="Giriş Tarihi"
                        className={classes.textField}
                        value={this.state.giris}
                        onChange={this.handleChange('giris')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Son Kullanma Tarihi"
                        className={classes.textField}
                        value={this.state.sonkullanma}
                        onChange={this.handleChange('sonkullanma')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Adet"
                        className={classes.textField}
                        value={this.state.adet}
                        onChange={this.handleChange('adet')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Ürün Tipi"
                        className={classes.textField}
                        value={this.state.secilen}
                        onChange={this.handleChange('secilen')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        helperText="Eklemek istediğiniz ürün tipini seçininz"
                        margin="normal"
                        variant="outlined"
                    >
                        {this.state.urunler.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button type={"submit"} variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(UrunKayitEkle);