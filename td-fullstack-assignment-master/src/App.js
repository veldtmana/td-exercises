import React, { Component } from 'react';
import { isValid, calculateResult } from './utils';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      results: [],
      validationError: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { valid, error, parsed } = isValid(event.target.value);
    this.setState({
      value: event.target.value,
      valid,
      parsed,
      validationError: error
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { valid, parsed } = this.state;
    if (valid) {
      const { result } = calculateResult(parsed);
      this.setState(prevState => ({
        ...prevState,
        results: [
          { input: parsed, result },
          ...prevState.results
        ],
      }));
    }
  }

  render() {
    const {
      input, value, results, valid, validationError,
    } = this.state;
    return (
      <div className="App">
        <form className="App-form">
          <div className="App-input-row">
            <label htmlFor="values" className="App-input-label">Values:</label>
            <div className="App-input-container">
              <input
                id="values"
                type="text"
                value={value}
                onChange={this.handleChange}
                className={`App-input ${input && !valid ? 'App-input-error' : ''}`}
              />
              {validationError && (
                <p className="App-validation-error">
                  {validationError}
                </p>
              )}
            </div>
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        </form>

        <table className="App-result-table">
          {results.length > 0 && (<thead>
            <tr>
              <th>Input</th>
              <th>Raw result</th>
              <th>Sums</th>
            </tr>
            </thead>)}
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{JSON.stringify(result.input)}</td>
                <td>{JSON.stringify(result.result)}</td>
                <td className="App-result-table-sums"><ol>{result.result.map(({ pA, pB, pSum }) => (
                  <li>{result.input[pA]} + {result.input[pB]} = {result.input[pSum]}</li>
                ))}</ol></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
