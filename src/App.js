import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Hello world!</p>
          <TextAnalysis />
        </header>
      </div>
    );
  }
}

export default App;


class TextAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      categories: "",
      entities: [],
    };
  }

  componentDidMount() {
     let text = "i've been depressed for most of my teenage years, i'm 19 now and i've been feeling worse than ever for the last couple of months due to some internal issues, I do believe i'll resolve these issues with myself one day, but i'm scared i'll keep feeling this way... It's like there's no point in anything. Anything. I can't see how any of this can be worth it. I also keep fearing the day of my death, even if it's far far away. I'm scared that when it comes to the end i'll look back and not see the point of it all. I know that once I resolve these issues I have right now there'll just come others and i'm scared...";

      const postParameters = {
     "document": {
      "content": text,
      "type": "PLAIN_TEXT"
     },
     "features": {
      "classifyText": true,
      "extractDocumentSentiment": true,
      "extractEntities": true,
      "extractEntitySentiment": true,
      "extractSyntax": false
     }
    }

    fetch('https://language.googleapis.com/v1/documents:annotateText?key=AIzaSyBnfMYcFxnIFu_X33YEPkbY95yP0IUwdbc', {    
        method: 'POST',
        //mode: 'CORS',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postParameters),
        })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            categories: result.categories[0].name,
            entities: result.entities,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, categories, entities } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <div>Res: {categories}</div>;
    }
  }
}
