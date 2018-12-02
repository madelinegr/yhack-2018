import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Entry = (props) => {
    console.log(props);
    let posts = props.location.state.posts;
    let entry_num = props.match.params.number;
    return (
        <div>
          <h1>Entry #{entry_num}</h1>
          <p>{posts[entry_num - 1].content}</p>
          <Link to={{ pathname: '/journal', state: {posts: posts}}}>Back to Journal</Link>
        </div>
      )
}

export default Entry;