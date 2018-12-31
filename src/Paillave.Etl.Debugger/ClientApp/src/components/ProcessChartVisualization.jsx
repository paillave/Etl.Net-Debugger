import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Sankey from './Sankey';

class ProcessChartVisualization extends React.Component {

    handleNodeClick(node) {
        if (this.props.onSelectJobNode)
            this.props.onSelectJobNode(node);
    }

    handleLinkClick(link) {
        if (this.props.onSelectJobLink)
            this.props.onSelectJobLink(link);
    }

    render() {
        const {
            links,
            nodes,
            sizeGuid
        } = this.props;

        var config = {
            nodeClasses: ["sankey-node-error"],
            linkClasses: ["sankey-link-empty-run", "sankey-link-filled-run"],
            transitionDuration: 200,
            getNodeKey: e => e.nodeName,
            getNodeName: e => `${e.nodeName}:${e.typeName}`,
            getLinkSourceKey: e => e.sourceNodeName,
            getLinkTargetKey: e => e.targetNodeName,
            isNodeClassed: (node, className) => {
                switch (className) {
                    case "sankey-node-error":
                        return !!node.errorCount;
                    default:
                        return false;
                }
            },
            isLinkClassed: (link, className) => {
                switch (className) {
                    case "sankey-link-empty-run":
                        return link.value === 0;
                    case "sankey-link-filled-run":
                        return !!link.value;
                    default:
                        return false;
                }
            },
            getLinkValue: e => {
                if (!e.value) return 1;
                else return e.value;
            },
            margin: { top: 10, left: 10, right: 10, bottom: 10 },
            nodes: {
                draggableX: true,
                draggableY: true
            },
            links: {
                unit: "row(s)"
            },
            tooltip: {
                infoDiv: true,
                labelSource: "Input:",
                labelTarget: "Output:"
            }
        };

        return (
            <Sankey
                config={config}
                nodes={nodes}
                links={links}
                onNodeClick={this.handleNodeClick.bind(this)}
                onLinkClick={this.handleLinkClick.bind(this)}
                sizeGuid={sizeGuid} />
        );
    }
}

// ApplicationToolBar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
//   onSwitchDrawer: PropTypes.func.isRequired,
// };

export default ProcessChartVisualization;
