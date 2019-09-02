import React from 'react';
import './App.css';
import { transformLine, makeAllWhite, getColor } from './functions/vitaminsSwap';
import ShapeFigure from './functions/ShapeFigure';
import getPointsByEdges from './functions/getPointsByEdges';
import Steps from './components/Steps';

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      input: "",
      vitaminsLine: [],
      steps: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  handleSubmit(event) {
    this.drawFigures(this.state.input);
    event.preventDefault();
  }

  resetState = () => {
    this.setState({ steps: [], input: "", vitaminsLine: [] })
  }

  drawFigures = (rawLine) => {
    const vitline = transformLine(rawLine);
    vitline.forEach(vitamin => {
      const points = getPointsByEdges(vitamin.edges);
      const color = getColor(vitamin.color);
      vitamin.points = points;
      vitamin.drawColor = color;
    });
    this.setState({ vitaminsLine: vitline });
  }

  showSteps = input => {
    const steps = makeAllWhite(input);

    this.setState({steps});
  }

  render() {
    const { vitaminsLine, steps, input } = this.state;

    return(
      <div className="App">
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <label className="App-header">
              Vitamin lines:
              <input className="input" type="text" value={input} onChange={this.handleChange} placeholder="example: 3B 4B 5B 6B" />
            </label>
            <input className="button" type="submit" value="draw figures" />
          </form>
        </div>
        <div className="vitaminsLine">
            {vitaminsLine && vitaminsLine.map((elem) =>
              <ShapeFigure
                points={elem.points}
                drawColor={elem.drawColor}
                key={elem.edges}
              />)}
        </div>
        <div>
          <button
            className="button"
            onClick={() => this.showSteps(input)}
            disabled={!input}
          >
            Show all steps
          </button>
          {steps.length ?
            <Steps
              resetState={this.resetState}
              steps={steps}
              input={input}
            />
          : null}
        </div>
      </div>
    );
  }
}