import React, { Component } from 'react'
export default class Sum extends Component{
  constructor(props) {
    super(props)
    this.state = {sum: 3, a:1, b: 2}

  }
  render() {
    console.log('Sum.render()');
    console.log(this.state.b);
    console.log(this.state.a);
    return (
      <div>
        <input value={this.state.a}
        onChange= {
          (e) => {
            return this.setState({ a: e.target.value});
          }} />
        + <input value={this.state.b}
        onChange= { (e) => {
          return this.setState({
            b: e.target.value
          });
          console.log(e.target.value);
        }} />
        = <span>{this.state.sum}</span>
        <button
          onClick= {() => {
            return this.setState({ sum: Number(this.state.a) + Number(this.state.b) })}}
          >
            Sum
          </button>
        <p/>
      </div>
    )
  }
}
