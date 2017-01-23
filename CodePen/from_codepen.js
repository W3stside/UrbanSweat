
class Logo extends React.Component {

  render () {
    return <img src={this.props.logo} style={{width: 400}}/>;
  }
}

class BackgroundPic extends React.Component {

  render () {
    const style = {
      minWidth: '100%',
      position: 'absolute',
      left: 0, right: 0,
      top: 0, bottom: 0,
      transform: 'translate(0%,-30%)',
      zIndex: '-99999'
    }
    return <img src={this.props.image} style={style}/>;
  }
}

class Links extends React.Component {

  render() {
    return (
        <span>
          <a href={this.props.url}>{this.props.name}</a>
        </span>
      );
  }
}

class Home extends React.Component {

  render () {
    var homeBGP = 'https://lh4.googleusercontent.com/CGtzklIGGG1buxfsn0BLKxNkY_H78_RDAUb4vOvlB9rOuuSaM6ziDJ9LtNQEcFxqNxVDsWHwUY5JHD4=w3201-h1584-rw';
    var logo = 'https://lh3.googleusercontent.com/vJ2abCtwujqpa9aXjQl6pE7O7JvcX6fW0CuyBhAeF2GFNEypykUdNnjHxEUP2WnJH7LWQMr9AM4s18c=w3201-h1584-rw';
    
    return (
     <div>
      <BackgroundPic image= "https://lh4.googleusercontent.com/CGtzklIGGG1buxfsn0BLKxNkY_H78_RDAUb4vOvlB9rOuuSaM6ziDJ9LtNQEcFxqNxVDsWHwUY5JHD4=w3201-h1584-rw"/>
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col-xs-12">
               <Logo logo="http://i.imgur.com/EBSWyKp.png"/>
             </div>
          </div>
          <div className="row text-center">
             <div className="col-sm-4">
              <Links name="ENTER" url="#"/>
             </div>
             <div className="col-sm-4">
              <Links name="ABOUT" url="#"/>
             </div>
             <div className="col-sm-4">
              <Links name="CONTACT" url="#"/>
             </div>
           </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
