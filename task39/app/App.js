import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './action/index'
import Table from './table'
class App extends Component {

    constructor(props) {
        super(props)

    }


    render() {

        return (
            <div>
                <div style={{height:'300px',width:'100px'}}></div>
                <Table {...this.props}></Table>
                <div style={{height:'1600px',width:'100px'}}></div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        head: state.sort.get('head'),
        body: state.sort.get('body')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)



