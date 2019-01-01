import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import RowTraceGrid from '../containers/RowTraceGrid';
import NodeTracesHeaders from "../containers/NodeTracesHeaders";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TraceDetails from "../containers/TraceDetails";
import Divider from "@material-ui/core/Divider";
import ProcessChartVisualization from "./ProcessChartVisualization";
import ProcessVisualization from "./ProcessVisualization";

const drawerWidth = 600;

const styles = theme => ({
  root: {
    display: "flex",
    overflow: "hidden"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth - theme.spacing.unit * 3,
    position: "unset",
    marginLeft: theme.spacing.unit * 3
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }
});


class Application extends React.Component {
  handleNodeClick(node) {
    this.props.selectJobNode(node);
  }
  handleModeChanged(mode) {
    this.props.setVisualizationMode(mode);
  }
  render() {
    const {
      classes,
      theme,
      processDefinition: {
        streamToNodeLinks: links,
        nodes
      },
      traceDetails: { show: showDrawer },
      sizeGuid,
      visualizationMode,
      selectedNode
    } = this.props;

    return (<React.Fragment>
      {/* <ProcessChartVisualization
        nodes={nodes}
        links={links}
        onSelectJobNode={this.handleNodeClick.bind(this)}
        // onSelectJobLink={this.handleLinkClick.bind(this)}
        sizeGuid={sizeGuid} /> */}
      <ProcessVisualization
        mode={visualizationMode}
        nodes={nodes}
        links={links}
        onModeChanged={this.handleModeChanged.bind(this)}
        onSelectJobNode={this.handleNodeClick.bind(this)}
        selectedNode={selectedNode}
        // onSelectJobLink={this.handleLinkClick.bind(this)}
        sizeGuid={sizeGuid} />
      <NodeTracesHeaders />
      <div className={classes.root}>
        <div className={classNames(classes.content, { [classes.contentShift]: showDrawer })}>
          <RowTraceGrid />
        </div>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={showDrawer}
          classes={{ paper: classes.drawerPaper }}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.props.hideTraceDetails}>
              {theme.direction === "rtl" ? (<ChevronLeftIcon />) : (<ChevronRightIcon />)}
            </IconButton>
            <Typography variant="h6">
              Trace details
            </Typography>
          </div>
          <Divider />
          <TraceDetails />
        </Drawer>
      </div>
    </React.Fragment>);
  }
}

export default withStyles(styles, { withTheme: true })(Application);
