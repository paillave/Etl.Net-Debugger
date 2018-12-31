import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InfiniteGrid from "./InfiniteGrid";

const styles = theme => ({
    rowIcon: {
        marginLeft: 20,
        marginRight: 20,
    }
});

class ProcessGridVisualization extends React.Component {

    handleRowClick(node) {
        if (this.props.onSelectJobNode)
            this.props.onSelectJobNode(node);
    }
    getRowCount() {
        if (!this.props.nodes) return 0;
        return this.props.nodes.length;
    }
    handleGetRowData(index) {
        return this.props.nodes[index];
    }

    handleGetRowClasses(node) {

    }

    render() {
        return <InfiniteGrid style={{ width: '100%' }} height={600}
            rowCount={this.getRowCount.bind(this)()}
            onGetRowData={this.handleGetRowData.bind(this)}
            onRowClick={this.handleRowClick.bind(this)}
            onGetRowClasses={this.handleGetRowClasses.bind(this)}
            selectedData={this.props.selectedNode}
            columns={[
                {
                    width: 90,
                    label: "",
                    dataKey: 'icon',
                    cellRenderer: ({ rowData }) => {
                        return;
                    }
                },
                {
                    width: 200,
                    flexGrow: 1.0,
                    label: "Name",
                    dataKey: 'name',
                    cellDataGetter: ({ rowData }) => rowData.nodeName
                },
                {
                    width: 200,
                    flexGrow: 1.0,
                    label: 'Type',
                    dataKey: 'type',
                    cellDataGetter: ({ rowData }) => rowData.typeName,
                },
                {
                    width: 120,
                    label: 'Issued rows',
                    dataKey: 'rowCount',
                    cellDataGetter: ({ rowData }) => rowData.rowCount,
                    align: 'right',
                },
                {
                    width: 120,
                    label: 'Issued errors',
                    dataKey: 'errorCount',
                    cellDataGetter: ({ rowData }) => rowData.errorCount,
                    align: 'right',
                },
                // {
                //     width: 200,
                //     flexGrow: 1.0,
                //     label: 'Date Time',
                //     cellDataGetter: ({ rowData }) => formatDate(rowData.dateTime),
                //     dataKey: 'dateTime',
                // },
            ]} />
    }
}

// ApplicationToolBar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
//   onSwitchDrawer: PropTypes.func.isRequired,
// };

export default withStyles(styles)(ProcessGridVisualization);
