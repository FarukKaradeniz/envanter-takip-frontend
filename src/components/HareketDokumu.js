import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from "axios";

const styles = theme => ({
    root: {
        width: '85%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        maxWidth: 900,
    },
});

function createData(tipId, kayitId, adet, islemTipi, islemZamani) {
    return {tipId, kayitId, adet, islemTipi, islemZamani};
}

class HareketDokumTablo extends React.Component {
    state = {
        data: [],
        durum: ["?", "Ekleme", "Silme", "Güncelleme"]
    };

    componentWillMount() {
        let newData = [];
        Axios({
            method: 'get',
            url: 'http://localhost:3000/hareketdokumu',
        }).then(response => {
            response.data.forEach(data => {
                let item = createData(data.tipId, data.kayitId, data.adet, data.islemTipi, data.islemZamani);
                newData.push(item);
            });
            this.setState({
                data: newData,
            });
            console.log(response);
        }).catch((err) => {
            console.log(err)
        });
    }

    render() {
        return (
            <div>
                <h2>Hareket Dökümü</h2>
                <Paper className={this.props.classes.root}>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ürün Tip ID</TableCell>
                                <TableCell>Ürün Kayıt ID</TableCell>
                                <TableCell>Adet</TableCell>
                                <TableCell>İşlem Tipi</TableCell>
                                <TableCell>İşlem Zamanı</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.tipID}
                                    </TableCell>
                                    <TableCell>{row.kayitID}</TableCell>
                                    <TableCell>{row.adet}</TableCell>
                                    <TableCell>{this.state.durum[row.islemTipi]}</TableCell>
                                    <TableCell>{row.islemZamani}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

            </div>
        );
    }


}

export default withStyles(styles)(HareketDokumTablo);
