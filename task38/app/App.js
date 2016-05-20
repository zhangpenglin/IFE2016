import './main.scss';
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
                <Table {...this.props}></Table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        head: state.sort.head,
        body: state.sort.body
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



