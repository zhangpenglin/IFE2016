import React, {Component} from 'react'
import  './gallery.scss'

export default class Gallery extends Component {
    constructor(props) {
        super(props)
        this.state = {images: props.images}
    }

    componentWillReceiveProps(props) {
        this.setState({images: props.images})
    }

    renderImages() {
        let funcs = [img0, img1, img2, img3, img4, img5, img6]
        console.log(this.state.images)
        return funcs[this.state.images.length].call(this)

        function img0() {
            return (0)
        }

        function img1() {
            return (1)
        }

        function img2() {
            return (2)
        }

        function img3() {
            return (3)
        }

        function img4() {
            return (4)
        }

        function img5() {
            return (5)
        }

        function img6() {
            return (6)
        }
    }

    render() {
        return (
            <div className="container">
                {this.renderImages()}
            </div>)
    }
}
Gallery.propTypes = {
    images: React.PropTypes.array
}