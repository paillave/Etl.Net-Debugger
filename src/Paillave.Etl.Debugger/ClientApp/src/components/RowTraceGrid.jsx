import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { formatDate } from '../tools/dataAccess';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import InfiniteGrid from './InfiniteGrid';

const styles = theme => ({
    rowIcon: {
        marginLeft: 20,
        marginRight: 20,
    }
});

class ReactVirtualizedTable extends React.PureComponent {
    getRowCount() {
        if (!this.props.selectedNode || !this.props.traces[this.props.selectedNode.nodeName]) return 0;
        return this.props.traces[this.props.selectedNode.nodeName].length;
    }
    handleGetRowData(index) {
        if (!this.props.selectedNode || !this.props.traces[this.props.selectedNode.nodeName]) return {};
        return this.props.traces[this.props.selectedNode.nodeName][index];
    }
    handleRowClick(data) {
        this.props.showTraceDetails(data);
    }
    render() {
        const { classes } = this.props;

        return <InfiniteGrid style={{ width: '100%' }} height={600}
            rowCount={this.getRowCount.bind(this)()}
            onGetRowData={this.handleGetRowData.bind(this)}
            onRowClick={this.handleRowClick.bind(this)}
            selectedData={this.props.traceDetails.selectedTrace}
            columns={[
                {
                    width: 50,
                    label: "",
                    dataKey: 'traceIcon',
                    cellRenderer: ({ rowData }) => {
                        if (rowData.content.level === 1) return (<ErrorOutlinedIcon className={classes.rowIcon} />);
                        else
                            switch (rowData.content.type) {
                                case "RowProcessStreamTraceContent": return (<DoneOutlinedIcon className={classes.rowIcon} />);
                                case "CounterSummaryStreamTraceContent": return (<DoneAllOutlinedIcon className={classes.rowIcon} />);
                            }
                    }
                },
                {
                    width: 90,
                    label: 'Row #',
                    dataKey: 'position',
                    cellDataGetter: ({ rowData }) => rowData.content.position,
                    align: 'right',
                },
                {
                    width: 200,
                    flexGrow: 1.0,
                    label: 'Date Time',
                    cellDataGetter: ({ rowData }) => formatDate(rowData.dateTime),
                    dataKey: 'dateTime',
                },
            ]} />
    }
}

export default withStyles(styles)(ReactVirtualizedTable);
