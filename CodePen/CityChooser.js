class CityChooser extends React.Component {
  render () {

    return (
      <div>
        <div className="container-fluid">
          <div className="row text-center">

            <div className="col-xs-12">
               <Logo styleName={logoStyle}/>
            </div>

          </div>
        </div>

        <div className="container-fluid citychooser">
          <div className="row text-center">

            <div className="col-xs-12">
              <Header name="Choose Your City" styleName={cityChooserHeader}/>
            </div>

            <div className="col-sm-4">
              <CitySquare>
                <BackgroundPic />
                <Header name="PARIS" styleName={smallCityChooserHeader}/>
                <MovingOptions activities={activities} styleName={movingOptionsStyle}/>
              </CitySquare>
            </div>

            <div className="col-sm-4">
              <CitySquare>
                <BackgroundPic image={"http://minimalblogs.com/wp-content/uploads/IMG_6224.jpg"}/>
                <Header name="AMSTERDAM" styleName={smallCityChooserHeader} />
                <MovingOptions activities={activities} styleName={movingOptionsStyle}/>
              </CitySquare>
            </div>


            <div className="col-sm-4">
              <CitySquare>
                <BackgroundPic image={"https://farm6.static.flickr.com/5581/14036964225_40dbb3e429_b.jpg"}/>
                <Header name="COPENHAGEN" styleName={smallCityChooserHeader}/>
                <MovingOptions activities={activities} styleName={movingOptionsStyle}/>
              </CitySquare>
            </div>

            <div className="col-sm-4">
              <CitySquare>
                <BackgroundPic image={"https://c1.staticflickr.com/3/2049/2442825439_0ce24be7db_o.jpg"}/>
                <Header name="BRUSSELS" styleName={smallCityChooserHeader}/>
                <MovingOptions activities={activities} styleName={movingOptionsStyle}/>
              </CitySquare>
            </div>

            <div className="col-sm-4">
              <CitySquare>
                <BackgroundPic image={"https://mir-s3-cdn-cf.behance.net/project_modules/1400/f8c8c845227921.5829f6ff5a2f0.jpg"}/>
                <Header name="BERLIN" styleName={smallCityChooserHeader}/>
                <MovingOptions activities={activities} styleName={movingOptionsStyle}/>
              </CitySquare>
            </div>

            <div className="col-sm-4">
              <CitySquare>
                <BackgroundPic image={"https://static1.squarespace.com/static/55c5a739e4b0d93b6174fb9e/573ac25d2b8dde95f0ee1a40/573b9c7907eaa096db954ede/1463524544831/DSCF9868-Edit-1-3.jpg"}/>
                <Header name="LONDON" styleName={smallCityChooserHeader}/>
                <MovingOptions activities={activities} styleName={movingOptionsStyle}/>
              </CitySquare>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

class Logo extends React.Component {

  static propTypes () {
    imageLogo: React.PropType.string
  }

  render() {
    return <img src={this.props.imageLogo} style={this.props.styleName}/>;
  }
}

//Logo Style
var logoStyle = {
  'margin' : '8%',
  'width' : '30vh'
}
//End logo Style

//Logo Defaults
  Logo.defaultProps = {
    imageLogo: "http://www.pngall.com/wp-content/uploads/2016/06/Nike-Logo-Free-PNG-Image.png"
  }
//end

class BackgroundPic extends React.Component {

  static propTypes () {
    image: React.PropType.string
  }

  render() {
    return (
      <div style={{height: '100%', overflow:'hidden'}}>
        <img src={this.props.image} style={{position: 'absolute', zIndex: '-9999', opacity: '1', minHeight: '100%', maxWidth: '100%',left: 0, bottom: 0, filter: 'brightness(60%)'}}/>
      </div>
      );
  }
}

//BackgroundPic default Prop
  BackgroundPic.defaultProps = {
    image: "http://architectureimg.com/wp-content/uploads/2016/11/modern-eiffel-tower-computer-bild-wettbewerb-french-paris-high-grey-wallpaper-background-free-1600x1080.jpg"
  }
//End above

class Header extends React.Component {

  static propTypes () {
    styleName: React.PropType.object
  }

  render() {
    return <p style={this.props.styleName} >{this.props.name}</p>;
  }
}
//styles object again
  var cityChooserHeader = {
    'fontSize': '120%',
    'position': 'static',
    'zIndex': '1',
    'color' : 'black',
    'margin': '0 0 40px 0'
  }
  var smallCityChooserHeader = {
    'fontSize': '170%',
    'margin': '15px 0 0 0',
    'position': 'static',
    'zIndex': '5'
  }
  var movingOptionsHeader = {
    'fontSize': '125%',
    'lineHeight': 0.5,
    'position': 'static',
    'zIndex': '5'
  }
//end styles object

//internal city squares
class CitySquare extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{width: '100%', position: 'relative', overflow: 'hidden', height: 'auto', padding: '15%'}}>
        {this.props.children}
      </div>
    );
  }
}

function MovingOptions (props) {

  const activities = props.activities;
  const listActivities = activities.map ( (activity) => <li>{activity}</li> );

  return (
    <ul style={props.styleName}>
      {listActivities}
    </ul>
   );
}

//styling
var movingOptionsStyle = {
  'listStyle': 'none',
  'color': 'white',
  'paddingLeft': '0',
  'margin': '0',
  'fontSize': '71.1%',
  'fontStyle': 'italic',
  'lineHeight': 1
};

const activities = ['YOGA', 'WEIGHTLIFTING', 'CROSSFIT', 'DANCE' , 'BOXING' , '...MORE'];

ReactDOM.render( <CityChooser />,
document.getElementById('root'))
