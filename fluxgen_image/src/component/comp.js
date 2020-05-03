import React from 'react';
import ReactDOM from 'react-dom';
import img from '../img.jpg';
//import './comp.css';
import { TextField } from '@material-ui/core';

class Comp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: '',
            y: '',
            xarr: '',
            yarr: '',
            image: props.img,
            value: '',

        }
    }
    async componentDidMount() {
        try {
            await this.getfromApi()
        }
        catch (err) {

        }
        console.log(document.getElementById('name').getBoundingClientRect())
        const { x, y } = ReactDOM.findDOMNode(this.refs['image']).getBoundingClientRect()
        console.log(ReactDOM
            .findDOMNode(this.refs['image'])
            .getBoundingClientRect()); //outputs <h3> coordinates
        let xarr = [];
        let yarr = [];
        this.props.arr.forEach(ele => {
            xarr.push(parseInt(ele[0]));
            yarr.push(parseInt(ele[1]));
        })
        this.setState({
            x: x,
            y: y,
            xarr: xarr,
            yarr: yarr
        });
        console.log(this.props.arr);
    }
    getfromApi = async () => {
        let myheaders = {
            "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODgyNTQ3NjAsInB1YmxpY19pZCI6IjU1ZDRjOWJkLTVjN2ItNGZmOC04ZTZiLTU0ZTM3MGEwYjEyMCJ9.LIGJEMtRoAymRjeQHg0yn0k0iIHwTi5rN5YKFeSxRME"
        }
        try {
            var valuee = []
            await fetch(`http://54.244.196.27/aquagen/v1/industries/DEMO1/units`, {
                method: 'GET',
                headers: myheaders
            })
                .then(response => response.json())
                .then(energy1 => {
                    console.log(energy1.data)
                    var i
                    for (i = 0; i < energy1.data.length; i++) {
                        valuee.push(energy1.data[i].category)
                    }
                })
            this.setState({ value: valuee })
            console.log(this.state.value)
        } catch (err) {
            console.log(err.message);
        }
    }
    render() {
        let items = [];
        console.log(this.state.xarr.length)
        let i;
        for (i = 0; i < this.state.xarr.length; i++) {
            var valuee = this.state.value[i]
            let tempx = parseInt(this.state.x) + this.state.xarr[i];
            let tempy = this.state.y + this.state.yarr[i];
            console.log(tempx + ' ' + tempy);
            items.push(
                <TextField
                    id="filled-basic"
                    label="Filled"
                    variant="filled"
                    style={{ position: "absolute", left: tempx, top: tempy }}
                    value={valuee}
                    size="10" />)
        }
        return (
            <div>
                {items}
                {this.state.image && (<img
                    src={this.state.image}
                    alt="logo"
                    id="name"
                    onClick={this.func}
                    style={{ "pointer-events": "all" }}
                    ref='image'
                    className="App-logo image-stack__item image-stack__item--bottom"></img>)}
            </div>
        )
    }
}

export default Comp;