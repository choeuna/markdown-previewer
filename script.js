const Toolbar = (props) => {
  return (
    <div className='toolbar'>
      <i className="far fa-laugh"/> 
      {props.toolbarText}
      <i className={props.icon} onClick={props.onClick}/>
    </div>
  );
};

// editor functional comp
const Editor = (props) => {
  return (
    <textarea id='editorText' onChange={props.onChange}></textarea>
  );
};

// previewer functional comp
const Previewer = (props) => {
  return (<div id='previewerDisplay'> </div>);
};

// app class component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textField: '',
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
    // 0 - editor wrapper classes
    // 1 - editor toolbar icon
    // 2 - previewer wrapper classes
    // 3 - previewer icon
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
          <Editor />
        </div>
        
        <div id='previewerWrapper' className={classes[2]}>
          <Toolbar
            toolbarText='Previewer'
            icon={classes[3]}
            onClick={this.handlePreviewerMax}/>
        </div>
      </div>
    );
  }
}

// use marked library to set inner html

ReactDOM.render(<App />, document.getElementById('app'));