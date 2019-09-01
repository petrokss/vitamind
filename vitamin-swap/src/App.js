import React from 'react';
import './App.css';
import { transformLine, makeAllWhite } from './functions/vitaminsSwap';
import ShapeFigure from './functions/ShapeFigure';

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

  getPointsByEdges = edge => {
    let points;
    if (edge === 3) {
      points="100 40, 160 160, 40 160";
    } else if(edge === 4) {
      points="40 40, 160 40, 160 160, 40 160";
    } else if(edge === 5) {
      points="100 40, 160 80, 140 140, 60 140, 40 80";
    } else if(edge === 6) {
      points="80 40, 120 40, 160 80, 160 120, 120 160, 80 160, 40 120, 40 80";
    } else {
      console.error('from triangle to hexagon');
    }
    return points;
  }

  getColor = color => {
    return color === "W" ? "white" : color === "B" ? "black" : "grey"
  }

  drawFigures = (rawLine) => {
    const vitline = transformLine(rawLine);
    vitline.forEach(vitamin => {
      const points = this.getPointsByEdges(vitamin.edges);
      const color = this.getColor(vitamin.color);
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
    const { vitaminsLine, steps } = this.state;

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Vitamin lines:
            <input type="text" value={this.state.input} onChange={this.handleChange} />
          </label>
          <input type="submit" value="draw figures" />
        </form>
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
            onClick={() => this.showSteps(this.state.input)}
            disabled={!this.state.input}
          >
            Show all steps
          </button>
          {steps.length ?
            <div>
              <button
                onClick={() => {
                  this.setState({ steps: [], input: "", vitaminsLine: [],})
                }}
              >
                Clear steps
              </button>
              {steps.map((step, key) => <p key={key}>{step.edges} from {step.from} to {step.color}</p>)}
            </div>
          : null}
        </div>
      </div>
    );
  }
}