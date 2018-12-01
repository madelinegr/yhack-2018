import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';

export default class DashboardHome extends Component {
    render() {
        return (
            <div>
                <h1>
                    Welcome to calmunity!
                </h1>
                <button>
                    <Link to="/journal"> Journal </Link>
                </button>
                <button>
                    <Link to="/chat"> Chat </Link>
                </button>
            </div>
        );
    }
}
