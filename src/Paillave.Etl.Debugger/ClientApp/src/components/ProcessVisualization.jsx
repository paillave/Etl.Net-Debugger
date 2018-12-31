import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ProcessChartVisualization from "./ProcessChartVisualization";
import ProcessGridVisualization from "./ProcessGridVisualization";

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "500",
    },
});

class ProcessVisualization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    handleChange(event, value) {
        if (this.props.onModeChanged) {
            this.props.onModeChanged(value === 0 ? "S" : "G")
        }
        else {
            this.setState({ value });
        }
    };

    handleChangeIndex(index) {
        if (this.props.onModeChanged) {
            this.props.onModeChanged(index === 0 ? "S" : "G")
        }
        else {
            this.setState({ value: index });
        }
    };

    handleSelectJobNode(node) {
        if (this.props.onSelectJobNode)
            this.props.onSelectJobNode(node);
    }

    handleSelectJobLink(node) {
        if (this.props.onSelectJobLink)
            this.props.onSelectJobLink(node);
    }

    render() {
        const { classes, theme, nodes, links, sizeGuid, mode, selectedNode } = this.props;
        let selectedTab;
        if (this.props.onModeChanged) {
            selectedTab = mode === "S" ? 0 : 1;
        }
        else {
            selectedTab = this.state.value;
        }
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={selectedTab}
                        onChange={this.handleChange.bind(this)}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth>
                        <Tab label="Sankey Chart" />
                        <Tab label="Grid" />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={selectedTab}
                    onChangeIndex={this.handleChangeIndex.bind(this)}>
                    <TabContainer dir={theme.direction}>
                        <ProcessChartVisualization
                            nodes={nodes}
                            links={links}
                            onSelectJobNode={this.handleSelectJobNode.bind(this)}
                            onSelectJobLink={this.handleSelectJobLink.bind(this)}
                            sizeGuid={sizeGuid} />
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <ProcessGridVisualization
                            nodes={nodes}
                            onSelectJobNode={this.handleSelectJobNode.bind(this)} 
                            selectedNode={selectedNode}/>
                    </TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ProcessVisualization);