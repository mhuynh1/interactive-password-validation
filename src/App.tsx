import * as React from 'react';
import { Component } from 'react';
import Password from 'react-better-password';
import './index.css';

interface IState {
  password: string,
  rules: {}
}

class App extends Component<{}, IState> {
  public state = {
    password: "",
    rules: {
      isEightChars: false,
      isNumber: false,
      isSpecialChars: false,
      isUppercase: false,
    }
  };

  public handlePw = (password: string) => {
    this.setState({ password }, () => this.validationRules(password));
  };

  public validationRules = (password: any) => {
    const pwTest = password.split("");
    const specialChars = /[! @#$%^&*()_+\-=\[\]{};':`~"\\|,.<>\/?]/;

    const rules = {
      isEightChars: pwTest.length >= 8,
      isNumber: pwTest.some((char: any) => parseInt(char, 10) >= 0),
      isSpecialChars: pwTest.some((char: any) => specialChars.test(char)),
      isUppercase: pwTest.some(
        (char: any) =>
          char === char.toUpperCase() && isNaN(char) && !specialChars.test(char)
      ),
    };
    this.setState({ rules });
  };

  public renderRules = () => {
    const rules = [
      {
        label: "8 Characters",
        labelWidth: 110,
        rule: "isEightChars",
      },
      {
        label: "1 Special Character",
        labelWidth: 170,
        rule: "isSpecialChars",
      },
      {
        label: "1 Uppercase Letter",
        labelWidth: 160,
        rule: "isUppercase",
      },
      {
        label: "1 Number",
        labelWidth: 80,
        rule: "isNumber",
      }
    ];

    return rules.map((r, i) => (
      <li
        key={i}
        className={`rule rule${i + 1} ${this.state.rules[r.rule] && "valid"}`}
      >
        <div className="label">{r.label}</div>
        <div
          className="strikeLine"
          style={{
            width: `${this.state.rules[r.rule] ? `${r.labelWidth}px` : 0}`
          }}
        />
      </li>
    ));
  };

  public render() {
    const isValid = Object.keys(this.state.rules).every(
      r => this.state.rules[r] === true
    );
    return (
      <div className="App">
        <div className="container">
          <header>
            <i className="fas fa-arrow-left" />
            <div>
              <h1 className="title">Set a Password</h1>
              <p className="subtitle">Must contain at least:</p>
            </div>
          </header>
          <main className="main">
            <div className="leftLine" />
            <ul className="rulesList">
              {this.renderRules()}
              <div className={isValid ? "valid" : ''}>
                <i className="fas fa-check-circle" />
              </div>
            </ul>
          </main>
          <form>
            <Password className="password" value={this.state.password} onChange={this.handlePw}  placeholder="set a password"/>
          </form>
        </div>
        <button className={isValid ? "saveBtn valid" : "saveBtn"} type="button">
          <strong>Save</strong>
        </button>
      </div> // <!-- end App-->
    );
  }
}

export default App;
