import React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import Axios from 'axios';

import '../styles/UrunListe.css';


let counter = 0;
function createData(tip, marka, model, giris, son, adet) {
    counter += 1;
    return { id: counter, tip, marka, model, giris, son, adet};
}
// üstteki kısım prod'a geçince kaldırılacak

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'id', numeric: true, disablePadding: true, label: 'ID' },
    { id: 'tip', numeric: false, disablePadding: false, label: 'Tip' },
    { id: 'marka', numeric: false, disablePadding: false, label: 'Marka' },
    { id: 'model', numeric: false, disablePadding: false, label: 'Model' },
    { id: 'giris', numeric: false, disablePadding: false, label: 'Depoya Giriş Tarihi' },
    { id: 'son', numeric: false, disablePadding: false, label: 'Son Kullanma Tarihi' },
    { id: 'adet', numeric: true, disablePadding: false, label: 'Adet' },
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

//Table head style
const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} adet ürün seçildi
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        Ürün Listesi
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Sil">
                        <IconButton aria-label="Delete">
                            <DeleteIcon onClick={props.deleteClicked} />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <div/>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '85%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        maxWidth: 900,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'id',
        selected: [], //selected datas
        data: [],
        page: 0,
        rowsPerPage: 5,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    deleteClicked = () => {
        console.log(this.state.selected);
        //TODO burada silme işlemi database'e gönderilecek ve state güncellenecek
        Axios({
            method: 'post',
            url: 'http://localhost:3000/urunsil',
            data: {
                sil: this.state.selected,
            }
        }).then(response => {
            // if (response.status < 300) {
            let data = this.state.data;
            let selected = this.state.selected;
            let newData = [];
            data.forEach(d => {
                let bool = false;
                selected.forEach(s => {
                    if (s === d.id) {
                        bool = true;
                    }
                });
                if (!bool) {
                    newData.push(d);
                }
            });
            console.log(newData);
            this.setState({
                data: newData,
                selected: [],
            });
            // }
        }).catch(err => {
            console.log(err);
        });
    };

    componentWillMount() {
        // TODO burada urunliste'ye istek yapilacak ve state'deki data kısmı güncellenecek
        let newData = [];
        newData.push(
            createData('Cupcake', 305, 3.7, 67, 4.3, 13),
            createData('Donut', 452, 25.0, 51, 4.9, 1),
            createData('Eclair', 262, 16.0, 24, 6.0, 1),
            createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 2));
        this.setState({data: newData});
        Axios({
            method: 'get',
            url: 'http://localhost:3000',
        }).then(response => {
            // response.data.forEach(data => {
            //     let item = createData(data.tip, data.marka, data.model, data.giris, data.sonkullanma, data.adet);
            //     newData.push(item);
            // });
            // this.setState({
            //     data: newData,
            //     selected: [],
            // });
            console.log(response);
        }).catch((err) => {
            console.log(err)
        });
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} deleteClicked={this.deleteClicked} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell align="right" component="th" scope="row" padding="none">
                                                {n.id}
                                            </TableCell>
                                            <TableCell>{n.tip}</TableCell>
                                            <TableCell>{n.marka}</TableCell>
                                            <TableCell>{n.model}</TableCell>
                                            <TableCell className={classNames("text-center")}>{n.giris}</TableCell>
                                            <TableCell className={classNames("text-center")}>{n.son}</TableCell>
                                            <TableCell className={classNames("text-center")}>{n.adet}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}


export default withStyles(styles)(EnhancedTable);