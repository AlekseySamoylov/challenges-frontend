import ApiClient from "./AppClient";
import * as React from 'react';
import {FormEvent} from "react";
interface Props {}

interface State {
    a: number
    b: number
    user: string
    message: string
    guess: string
}

class ChallengeComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            a: 0, b: 0,
            user: '',
            message: '',
            guess: ""
        }
        this.handleSubmitResult = this.handleSubmitResult.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        ApiClient.challenge().then(
            res => {
                if (res.ok) {
                    res.json().then(json => {
                        this.setState({
                            a: json.factorA,
                            b: json.factorB
                        })
                    })
                } else {
                    this.updateMessage("Can't reach the server")
                }
            }
        )
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const name = e.currentTarget.name
        if (name === "guess") {
            this.setState({
                guess: e.currentTarget.value
            })
        } else if (name === "user") {
            this.setState({
                user: e.currentTarget.value
            })
        }
    }

    handleSubmitResult(event: FormEvent) {
        event.preventDefault()
        ApiClient.sendGuess(this.state.user,
            this.state.a, this.state.b,
            Number(this.state.guess))
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        if (json.correct) {
                            this.updateMessage("Congratulations! Your guess is correct")
                        } else {
                            this.updateMessage("Oops! Your guess " + json.resultAttempt + " is wrong, but keep playing!")
                        }
                    })
                } else {
                    this.updateMessage("Error: server error or not available")
                }
            })
    }

    updateMessage(m: string) {
        this.setState({
            message: m
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Your new challenge is</h3>
                    <h1>
                        {this.state.a} x {this.state.b}
                    </h1>
                </div>
                <form onSubmit={this.handleSubmitResult}>
                    <label>
                        Your alias:
                        <input type="text" max="12"
                               name="user"
                               value={this.state.user}
                               onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Your guess:
                        <input type="text" max="5"
                               name="guess"
                               value={this.state.guess}
                               onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
                <h4>{this.state.message}</h4>
            </div>
        )
    }
}

export default ChallengeComponent