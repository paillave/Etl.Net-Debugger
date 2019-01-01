import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InfiniteGrid from "./InfiniteGrid";
import Tooltip from '@material-ui/core/Tooltip';
import { Import, Export, CropSquare, ArrowExpandRight, ArrowCollapseRight } from 'mdi-material-ui';
// https://materialdesignicons.com/

const styles = theme => ({
    rowIcon: {
        marginLeft: 20,
        marginRight: 20,
    },
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
        const { classes } = this.props;
        return classes.tableRowLinked;
    }

    handleIsSelectedData(node) {
        if (this.props.selectedNode)
            return node.nodeName === this.props.selectedNode.nodeName;
        return false;
    }

    render() {
        const { links, selectedNode, classes } = this.props;
        return <InfiniteGrid style={{ width: '100%' }} height={600}
            rowCount={this.getRowCount.bind(this)()}
            onGetRowData={this.handleGetRowData.bind(this)}
            onRowClick={this.handleRowClick.bind(this)}
            onGetRowClasses={this.handleGetRowClasses.bind(this)}
            onIsSelectedData={this.handleIsSelectedData.bind(this)}
            columns={[
                {
                    width: 80,
                    label: "",
                    dataKey: 'linkIcon',
                    cellRenderer: ({ rowData }) => {
                        if (!selectedNode || !links) return;
                        if (rowData.nodeName === selectedNode.nodeName) {
                            return <Tooltip title="Selection">
                                <CropSquare className={classes.rowIcon} />
                            </Tooltip>
                        }
                        for (let index = 0; index < links.length; index++) {
                            const link = links[index];
                            if (link.sourceNodeName === selectedNode.nodeName && link.targetNodeName === rowData.nodeName) {
                                return <Tooltip title="Target of selection">
                                    <Export className={classes.rowIcon} />
                                </Tooltip>;
                            }
                            if (link.targetNodeName === selectedNode.nodeName && link.sourceNodeName === rowData.nodeName) {
                                return <Tooltip title="Source of selection">
                                    <Import className={classes.rowIcon} />
                                </Tooltip>;
                            }
                        }
                        return;
                    }
                },
                {
                    width: 80,
                    label: "",
                    dataKey: 'positionIcon',
                    cellRenderer: ({ rowData }) => {
                        if (!links) return;
                        let isRootSource = true;
                        let isFinalTarget = true;
                        for (let index = 0; index < links.length; index++) {
                            const link = links[index];
                            if (link.sourceNodeName === rowData.nodeName) isFinalTarget = false;
                            if (link.targetNodeName === rowData.nodeName) isRootSource = false;
                        }
                        if (isFinalTarget) {
                            return <Tooltip title="Final target">
                                <ArrowCollapseRight className={classes.rowIcon} />
                            </Tooltip>;
                        }
                        if (isRootSource) {
                            return <Tooltip title="Root source">
                                <ArrowExpandRight className={classes.rowIcon} />
                            </Tooltip>;
                        }
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
                    cellDataGetter: ({ rowData }) => rowData.typeName.replace(/([a-z])([A-Z])/g, '$1 $2'),
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
