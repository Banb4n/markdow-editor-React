// Ici on code notre App
import React from 'react';
import { render } from 'react-dom';
// CSS
import './style/css/bootstrap.min.css';
import './index.css';
// Js perso
import { sampleText } from './sampleText.js';
import marked from 'marked';


class App extends React.Component {

    state = {
        text: sampleText,
    };
    componentWillMount() {
        const text = localStorage.getItem('text');
        if(text) {
            this.setState({ text })
        }
    }
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('text', nextState.text);
    }

    
    updateText = (event) => {
        const text = event.target.value;
        this.setState({ text })
    }
    renderText = (text) => {
        const renderText = marked(text, {sanitize: true});
        return { __html: renderText };
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <textarea 
                            className="form-control" 
                            cols="45" 
                            rows="35" 
                            value={this.state.text}
                            onChange={(e) => this.updateText(e)}>
                        </textarea>
                    </div>
                    <div className="col-sm-6">
                        <h1>Résultat</h1>
                        <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
                    </div>
                </div>
            </div>
        )
    }
}

render(
    <App />,
    document.getElementById('root')
);

