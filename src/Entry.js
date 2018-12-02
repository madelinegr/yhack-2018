import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Entry = (props) => {
    console.log(props);
    return (
        <div>
          <h1>(Entry #)</h1>
          <Link to='/journal'>Back to Journal</Link>
        </div>
      )
}

export default Entry;