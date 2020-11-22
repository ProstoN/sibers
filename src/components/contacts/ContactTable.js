import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Link} from "react-router-dom";
import {fetchUsers} from "../FetchUsers";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/styles';

const columnsPaper = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'username', label: 'UserName', minWidth: 170},
    {id: 'email', label: 'Email', minWidth: 170},
    {id: 'phone', label: 'Phone', minWidth: 170},
    {id: 'website', label: 'Website', minWidth: 170}
]

const styles = theme => ({
    root: {
        width: '100%',

    },
    container: {
        maxHeight: "100vh",
        top: "7vh",
        position: 'fixed',
        bottom: 0
    },
    margin: {
        maxHeight: "100vh",
        top: "20vh",
        position: 'fixed',
        bottom: 0
    }
});

//We move the head of the table into a separate function in order to apply sorting to it.
function ContactTableHead(props) {
    const {order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {columnsPaper.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{minWidth: column.minWidth}}
                        sortDirection={orderBy === column.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : 'asc'}
                            onClick={createSortHandler(column.id)}
                        >
                            {column.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

ContactTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

class ContactTable extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            order: "asc",
            orderBy: "name"
        }
    }

    //Create three functions to sort alphabetically
    descendingCompare(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => this.descendingCompare(a, b, orderBy)
            : (a, b) => -this.descendingCompare(a, b, orderBy);
    }

    stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    handleOrder(isAsc){
        const order = isAsc ? 'desc' : 'asc'
        this.setState({
            order: order
        })
    }

    handleOrderBy(property){
        this.setState({
            orderBy: property
        })
    }

    render() {
        fetchUsers()
        const { classes, rows, margin } = this.props;
        const { order, orderBy} = this.state;
        //In the case when we use search, props come to us, and then we use them,
        //otherwise we take data from localStorage
        const fetchedRows = rows !== undefined ? rows : JSON.parse(localStorage.getItem('users'));

        const handleRequestSort = (event, property) => {
            const isAsc = orderBy === property && order === 'asc';
            this.handleOrder(isAsc);
            this.handleOrderBy(property);
        }

        return (
            <Paper className={classes.root}>
                <TableContainer className={margin ? classes.margin : classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <ContactTableHead
                            classes={classes}
                            onRequestSort={handleRequestSort}
                            order={order}
                            orderBy={orderBy}
                            rowCount={fetchedRows.length}
                        />
                        <TableBody>
                            {this.stableSort(fetchedRows, this.getComparator(order, orderBy))
                                .map((row) => {
                                    return (
                                        <TableRow component={Link} to={"/person/" + row.id} hover role="checkbox"
                                                  tabIndex={-1}
                                                  key={row.code}>
                                            {columnsPaper.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        );
    }
}

export default withStyles(styles)(ContactTable)
