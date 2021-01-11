import React, { Component } from 'react';
import axios from 'axios';

class Verify extends Component {
    constructor(props) {
        super(props)

        this.state = {
            verified: false
        }
    }

    verification = () => {
        const url = new URLSearchParams(this.props.location.search);
        const token = url.get('token');

        axios.get('http://localhost:8000/training/verification', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response);
                this.setState({
                    verified: true
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() { // call verification here
        this.verification();
    }

    render() {
        return (  /// return verfied here
            <div>
                {
                    this.state.verified
                        ?
                        <h1>User Account Created</h1>
                        :
                        null
                }
            </div>
        );
    }
}

export default Verify
