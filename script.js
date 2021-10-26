
console.log("Connected to script");

const Toolbar = (props) => {
  return (
    <div className='toolbar'>
      <i className="fas fa-paw"/> 
      {props.toolbarText}
      <i className={props.icon} onClick={props.onClick}/>
    </div>
  );
};

// editor functional comp
const Editor = (props) => {
  return (
    <textarea id='editor' onChange={props.onChange}>{props.text}</textarea>
  );
};

// previewer functional comp
const Previewer = (props) => {
  return (<div id='preview' dangerouslySetInnerHTML={{__html: marked(props.markdown)}}></div>);
};

// app class component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textField: props.fillText,
      editorMaximized: false,
      previewerMaximized: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMax = this.handleEditorMax.bind(this);
    this.handlePreviewerMax = this.handlePreviewerMax.bind(this);
  }
  
  // handleChange to textarea
  handleChange(e) {
    this.setState({
      textField: e.target.value
    });
  }

  // handle minimize/maximize of windows
  handleEditorMax() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  } 
  handlePreviewerMax() {
    this.setState({
      previewerMaximized: !this.state.previewerMaximized
    });
  }
  render() {
    // 0 - editor wrap classes, 1 - editor icon, 2 - previewer wrap classes, 3 - previewer icon
    const classes = this.state.editorMaximized ?
          ['editorWrapper maximize', 'fas fa-compress-alt', 'previewerWrapper hide', ''] :
            (this.state.previewerMaximized ?
              ['editorWrapper hide', '', 'previewerWrapper maximize', 'fas fa-compress-alt'] :
              ['editorWrapper', 'fas fa-expand-alt', 'previewerWrapper', 'fas fa-expand-alt']);
    
    return (
      <div id='wrapper'>
        <div id='editorWrapper' className={classes[0]}>
          <Toolbar 
            toolbarText='Editor'
            icon={classes[1]}
            onClick={this.handleEditorMax}/>
          <Editor text={this.state.textField} onChange={this.handleChange}/>
        </div>
        
        <div id='previewerWrapper' className={classes[2]}>
          <Toolbar
            toolbarText='Previewer'
            icon={classes[3]}
            onClick={this.handlePreviewerMax}/>
          <Previewer markdown={this.state.textField} />
        </div>
      </div>
    );
  }
}

const fillText = `# This is my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://flexboxfroggy.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![A golden retriever puppy](https://www.freeiconspng.com/thumbs/dog-png/dog-png-30.png 'Woof!') 
`;

ReactDOM.render(<App fillText={fillText}/>, document.getElementById('app'));