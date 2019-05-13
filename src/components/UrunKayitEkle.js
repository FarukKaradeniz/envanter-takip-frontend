import React from 'react';

import '../styles/UrunEkle.css';
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import Axios from 'axios';

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
        urunler: [],
        secilen: 0,
    };

    componentWillMount = () => {
        //todo burada urunler icin istek yapilacak ve ürün tipi listesi dönüşü yapilacak
        Axios({
            method: 'get',
            url: 'http://localhost:3000/urunliste'
        }).then(response => {
            let data = response.data;
            let newd = [];
            data.forEach(d => newd.push({value: d.id, label: d.tip}))
            newd = new Set(newd);
            this.setState({
                urunler: newd,
            });

        }).catch(err => {
            console.log(err);
        })
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onFormSubmit = event => {
        event.preventDefault();
        //TODO burada sunucuya urun kayit adresine istek yapacak
        if (this.state.sonkullanma !== '' && this.state.giris !== '') {
            //TODO burada sunucuya urun tanimla adresine istek yapacak
            Axios({
                method: 'post',
                url: 'http://localhost:3000/urunkayitekle',
                data: {
                    giris: this.state.giris,
                    sonkullanma: this.state.sonkullanma,
                    adet: this.state.adet,
                    secilen: this.state.secilen,
                }
            }).then(response => {

            }).catch(err => console.log(err));
        } else {
            alert("Formu göndermeden önce giriş tarihi ve son kullanmayı giriniz.");
        }
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