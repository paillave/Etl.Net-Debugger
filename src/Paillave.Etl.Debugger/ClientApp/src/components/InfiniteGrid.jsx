import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';

const styles = theme => ({
    table: {
        fontFamily: theme.typography.fontFamily,
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    tableRow: {
        cursor: 'pointer',
        // height: 30
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableRowSelected: {
        backgroundColor: theme.palette.grey[300],
    },
    tableCell: {
        flex: 1,
        // height: 30
        // marginTop:5,
        // marginBottom:5,
    },
    noClick: {
        cursor: 'initial',
    },
    rowIcon: {
        marginLeft: 20,
        marginRight: 20,
    }
});

class MuiVirtualizedTable extends React.PureComponent {
    getRowClassName(val) {
        const { index } = val;
        const { classes, rowClassName, onRowClick, onIsSelectedData, rowGetter, onGetRowClasses } = this.props;
        const rowData = rowGetter({ index });
        let customRowClassNames;
        if (rowData && onGetRowClasses)
            customRowClassNames = onGetRowClasses(rowData);
        let selectedClass;
        if (rowData && onIsSelectedData && onIsSelectedData(rowData))
            selectedClass = classes.tableRowSelected;
        return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        }, customRowClassNames, selectedClass);
    };
    cellRenderer = ({ cellData, columnIndex = null }) => {
        const { columns, classes, rowHeight, onRowClick } = this.props;
        return (
            <TableCell
                component="div"
                className={classNames(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={(columnIndex != null && columns[columnIndex].align) || 'left'}
            >
                {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
        const { headerHeight, columns, classes, sort } = this.props;
        const direction = {
            [SortDirection.ASC]: 'asc',
            [SortDirection.DESC]: 'desc',
        };

        const inner =
            !columns[columnIndex].disableSort && sort != null ? (
                <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
                    {label}
                </TableSortLabel>
            ) : (
                    label
                );

        return (
            <TableCell
                component="div"
                className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].align || "left"}
            >
                {inner}
            </TableCell>
        );
    };

    render() {
        const { classes, columns, ...tableProps } = this.props;
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        className={classes.table}
                        height={height}
                        width={width}
                        {...tableProps}
                        rowClassName={this.getRowClassName.bind(this)}
                    >
                        {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
                            let renderer;
                            if (cellContentRenderer != null) {
                                renderer = cellRendererProps =>
                                    this.cellRenderer({
                                        cellData: cellContentRenderer(cellRendererProps),
                                        columnIndex: index,
                                    });
                            } else {
                                renderer = this.cellRenderer;
                            }

                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={headerProps =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classNames(classes.flexContainer, className)}
                                    cellRenderer={renderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            cellContentRenderer: PropTypes.func,
            dataKey: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowClassName: PropTypes.string,
    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    sort: PropTypes.func,
};

MuiVirtualizedTable.defaultProps = {
    headerHeight: 40,
    rowHeight: 35,
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

class ReactVirtualizedTable extends React.PureComponent {
    handleGetRowData({ index }) {
        if (this.props.onGetRowData)
            return this.props.onGetRowData(index);
    }
    handleRowClick(event) {
        if (this.props.onRowClick)
            this.props.onRowClick(event.rowData);
    }
    handleGetRowClasses(rowData) {
        if (this.props.onGetRowClasses)
            return this.props.onGetRowClasses(rowData);
    }
    handleIsSelectedData(rowData) {
        if (this.props.onIsSelectedData)
            return this.props.onIsSelectedData(rowData);
    }
    render() {
        const { classes, height, columns, rowCount, selectedData } = this.props;
        return <Paper style={{ height, width: '100%' }}>
            <WrappedVirtualizedTable
                // selectedIndex={this.getSelectedIndex.bind(this)()}
                rowCount={rowCount}
                onIsSelectedData={this.handleIsSelectedData.bind(this)}
                onGetRowClasses={this.handleGetRowClasses.bind(this)}
                rowGetter={this.handleGetRowData.bind(this)}
                onRowClick={this.handleRowClick.bind(this)}
                columns={columns}
            />
        </Paper>;
    }
}

export default withStyles(styles)(ReactVirtualizedTable);
