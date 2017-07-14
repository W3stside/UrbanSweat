import { StyleSheet } from 'aphrodite/no-important';
import {colors, fonts} from './variables.js';

const globalSelectorHandler = (selector, _, generateSubtreeStyles) => {
  if (selector[0] !== '*') {
return null;
  }
  return generateSubtreeStyles(selector.slice(1));
};

const globalExtension = { selectorHandler: globalSelectorHandler };
const extended = StyleSheet.extend([globalExtension]);

function cssGlobal (stylesObj) {
  var globalStyles = {};
  Object.keys(stylesObj)
.forEach( (key) => {
  globalStyles['*' + key] = stylesObj[key];
})
return globalStyles;
}

const preStyles = {
  'html': {
    fontFamily: fonts.font__default,
    height: '100%', width: '100%',
    minHeight: '100%',
    overflowX: 'hidden',
  },
  'body': {
    height: '100%', width: '100%',
    minHeight: '100%', minWidth: 250,
    overflowX: 'hidden',
  },
  '#root': { minHeight: '100%' },
  'a': {
    color: 'black',
    textDecoration: 'none',
    ':hover': {
      color: colors.urb__teal,
      letterSpacing: 1.2,
      fontWeight: 500,
      textDecoration: 'none',
      textShadow: '1px 0 20px rgba(0,0,0,0.25)'
    },

  transition: 'all 0.24s ease-in-out'
  },


  //SCROLLBAR black
  '*': {
    '::-webkit-scrollbar': {
      width: 6,
      backgroundColor: colors.urb__teal,
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: colors.urb__black,
    },
  },


  //TEXT SIZE AND BOLD
  '.hugeH1': {fontSize: 48 },
  '.font16': {fontSize: 16 },
  '.font18': {fontSize: 18 },
  '.font20': {fontSize: 20 },
  '.font22': {fontSize: 22 },
  '.font24': {fontSize: 24 },
  '.font26': {fontSize: 26 },
  '.font28': {fontSize: 28 },
  '.font30': {fontSize: 30 },
  '.font32': {fontSize: 32 },
  //Text %
  '.fontP80': {fontSize: '80%' },
  '.fontP100': {fontSize: '100%' },
  '.fontP120': {fontSize: '120%' },
  '.fontP140': {fontSize: '140%' },
  '.fontP160': {fontSize: '160%' },
  '.fontP180': {fontSize: '180%' },
  '.fontP200':{fontSize: '200%'},
  //Bolding and such
  '.font100': {fontWeight: 100 },
  '.font200': {fontWeight: 200 },
  '.font300': {fontWeight: 300 },
  '.font400': {fontWeight: 400 },
  '.font500': {fontWeight: 500 },
  '.font600': {fontWeight: 600 },
  '.font700': {fontWeight: 700 },
  '.font800': {fontWeight: 800 },
  //italic
  '.italic': {fontStyle: 'italic'},
  //TEXT ALIGNING
  '.textCenter': {textAlign: 'center'},
  '.textLeft': {textAlign: 'left'},
  '.textRight': {textAlign: 'right'},

  //PADDING AND MARGINS
  '.padding5': {padding: 5},
  '.padding5LR': {paddingLeft: 5, paddingRight: 5},
  '.padding5TB': {paddingTop: 5, paddingBottom: 5},
  '.padding10': {padding: 10},
  '.padding10LR': {paddingLeft: 10, paddingRight: 10},
  '.padding10TB': {paddingTop: 10, paddingBottom: 10},
  '.padding15': {padding: 15},
  '.padding15LR': {paddingLeft: 15, paddingRight: 15},
  '.padding15TB': {paddingTop: 15, paddingBottom: 15},
  '.padding25': {padding: 25},
  '.padding25LR': {paddingLeft: 25, paddingRight: 25},
  '.padding25TB': {paddingTop: 25, paddingBottom: 25},
  //MARGINS
  '.margin5': {margin: 5},
  '.margin5LR': {marginLeft: 5, marginRight: 5},
  '.margin5TB': {marginTop: 5, marginBottom: 5},
  '.margin10': {margin: 10},
  '.margin10LR': {marginLeft: 10, marginRight: 10},
  '.margin10TB': {marginTop: 10, marginBottom: 10},
  '.margin15': {margin: 15},
  '.margin15LR': {marginLeft: 15, marginRight: 15},
  '.margin15TB': {marginTop: 15, marginBottom: 15},
  '.margin25': {margin: 25},
  '.margin25LR': {marginLeft: 25, marginRight: 25},
  '.margin25TB': {marginTop: 25, marginBottom: 25},
  '.marginAuto': {margin: 'auto'},
  '.marginTopAuto': {marginTop: 'auto'},
  '.marginLeftAuto': {marginLeft: 'auto'},
  '.marginRightAuto': {marginRight: 'auto'},
  '.marginBottomAuto': {marginBottom: 'auto'},

  //WIDTH AND HEIGHTS
  //widths
  '.fullWidthHeight': {width: '100%', height: '100%'},
  '.width50': {width: '50%'},
  '.width75': {width: '75%'},
  '.width100': {width: '100%'},
  //heights
  '.height75': {height: '75%'},
  '.height100': {height: '100%'},

  //OVERFLOWS
  '.overflowHidden': {overflow: 'hidden'},
  '.overflowXHidden': {overflowX: 'hidden'},
  '.overflowYHidden': {overflowY: 'hidden'},
  '.overflowAuto': {overflow: 'auto'},
  '.overflowXAuto': {overflowX: 'auto'},
  '.overflowYAuto': {overflowY: 'auto'},

  //EFFECTS
  '.boxShadow': { boxShadow: '0px 0px 8px 0.8px rgba(0,0,0,0.03)'},

  //FLEX PROPERTIES
  '.flex': {display: 'flex'},
  '.inlineFlex': {display: 'flex'},
  '.rowWrap': {flexFlow: 'row wrap'},
  '.rowNoWrap': {flexFlow: 'row nowrap'},
  '.colWrap': {flexFlow: 'column wrap'},
  '.colNoWrap': {flexFlow: 'column nowrap'},
  '.jStart': {justifyContent: 'flex-start'},
  '.jCenter': {justifyContent: 'center'},
  '.jAround': {justifyContent: 'space-around'},
  '.jBetween': {justifyContent: 'space-between'},
  '.jEnd': {justifyContent: 'flex-end'},
  '.aStart': {alignItems: 'flex-start'},
  '.aCenter': {alignItems: 'center'},
  '.aStretch': {alignItems: 'stretch'},
  '.aEnd': {alignItems: 'flex-end'},
  '.flex1': {flex: 1},
  '.flex25': {flex: '1 1 25%'},
  '.flex33': {flex: '1 1 33.3333%'},
  '.flex50': {flex: '1 1 50%'},
  '.flex66': {flex: '1 1 66.6667%'},
  '.flex75': {flex: '1 1 75%'},
  '.flex100': {flex: '1 1 100%'},
  //FLEX ORDER
  '.order1': {order: '1'},
  '.order2': {order: '2'},
  '.order3': {order: '3'},
  '.order4': {order: '4'},
  '.order5': {order: '5'},
  '.order6': {order: '6'},
  '.order7': {order: '7'},
  '.order8': {order: '8'},
  '.order9': {order: '9'},
  '.order10': {order: '10'},
  //Flex Item Percentages (Bootstrap-esque) @ all
  '.xsP1': {'@media (max-width: 576px)': {flex: '1 8.33333%'}},
  '.xsP2': {'@media (max-width: 576px)': {flex: '1 16.66667%'}},
  '.xsP3': {'@media (max-width: 576px)': {flex: '1 25%'}},
  '.xsP4': {'@media (max-width: 576px)': {flex: '1 33.33333%'}},
  '.xsP5': {'@media (max-width: 576px)': {flex: '1 41.66667%'}},
  '.xsP6': {'@media (max-width: 576px)': {flex: '1 50%'}},
  '.xsP7': {'@media (max-width: 576px)': {flex: '1 58.33333%'}},
  '.xsP8': {'@media (max-width: 576px)': {flex: '1 66.66667%'}},
  '.xsP9': {'@media (max-width: 576px)': {flex: '1 75%'}},
  '.xsP10': {'@media (max-width: 576px)': {flex: '1 83.33333%'}},
  '.xsP11': {'@media (max-width: 576px)': {flex: '1 91.66667%'}},
  '.xsP12': {'@media (max-width: 576px)': {flex: '1 100%'}},
  //small Media Query
  '.smP1': {'@media (min-width: 576px)': {flex: '1 8.33333%'}},
  '.smP2': {'@media (min-width: 576px)': {flex: '1 16.66667%'}},
  '.smP3': {'@media (min-width: 576px)': {flex: '1 25%'}},
  '.smP4': {'@media (min-width: 576px)': {flex: '1 33.33333%'}},
  '.smP5': {'@media (min-width: 576px)': {flex: '1 41.66667%'}},
  '.smP6': {'@media (min-width: 576px)': {flex: '1 50%'}},
  '.smP7': {'@media (min-width: 576px)': {flex: '1 58.33333%'}},
  '.smP8': {'@media (min-width: 576px)': {flex: '1 66.66667%'}},
  '.smP9': {'@media (min-width: 576px)': {flex: '1 75%'}},
  '.smP10': {'@media (min-width: 576px)': {flex: '1 83.33333%'}},
  '.smP11': {'@media (min-width: 576px)': {flex: '1 91.66667%'}},
  '.smP12': {'@media (min-width: 576px)': {flex: '1 100%'}},
  //Medium Query
  '.mdP1': {'@media (min-width: 768px)': {flex: '1 8.33333%'}},
  '.mdP2': {'@media (min-width: 768px)': {flex: '1 16.66667%'}},
  '.mdP3': {'@media (min-width: 768px)': {flex: '1 25%'}},
  '.mdP4': {'@media (min-width: 768px)': {flex: '1 33.33333%'}},
  '.mdP5': {'@media (min-width: 768px)': {flex: '1 41.66667%'}},
  '.mdP6': {'@media (min-width: 768px)': {flex: '1 50%'}},
  '.mdP7': {'@media (min-width: 768px)': {flex: '1 58.33333%'}},
  '.mdP8': {'@media (min-width: 768px)': {flex: '1 66.66667%'}},
  '.mdP9': {'@media (min-width: 768px)': {flex: '1 75%'}},
  '.mdP10': {'@media (min-width: 768px)': {flex: '1 83.33333%'}},
  '.mdP11': {'@media (min-width: 768px)': {flex: '1 91.66667%'}},
  '.mdP12': {'@media (min-width: 768px)': {flex: '1 100%'}},
  //Large Query
  '.lgP1': {'@media (min-width: 992px)': {flex: '1 8.33333%'}},
  '.lgP2': {'@media (min-width: 992px)': {flex: '1 16.66667%'}},
  '.lgP3': {'@media (min-width: 992px)': {flex: '1 25%'}},
  '.lgP4': {'@media (min-width: 992px)': {flex: '1 33.33333%'}},
  '.lgP5': {'@media (min-width: 992px)': {flex: '1 41.66667%'}},
  '.lgP6': {'@media (min-width: 992px)': {flex: '1 50%'}},
  '.lgP7': {'@media (min-width: 992px)': {flex: '1 58.33333%'}},
  '.lgP8': {'@media (min-width: 992px)': {flex: '1 66.66667%'}},
  '.lgP9': {'@media (min-width: 992px)': {flex: '1 75%'}},
  '.lgP10': {'@media (min-width: 992px)': {flex: '1 83.33333%'}},
  '.lgP11': {'@media (min-width: 992px)': {flex: '1 91.66667%'}},
  '.lgP12': {'@media (min-width: 992px)': {flex: '1 100%'}},
  //Extra Large Query
  '.xlP1': {'@media (min-width: 1200px)': {flex: '1 8.33333%'}},
  '.xlP2': {'@media (min-width: 1200px)': {flex: '1 16.66667%'}},
  '.xlP3': {'@media (min-width: 1200px)': {flex: '1 25%'}},
  '.xlP4': {'@media (min-width: 1200px)': {flex: '1 33.33333%'}},
  '.xlP5': {'@media (min-width: 1200px)': {flex: '1 41.66667%'}},
  '.xlP6': {'@media (min-width: 1200px)': {flex: '1 50%'}},
  '.xlP7': {'@media (min-width: 1200px)': {flex: '1 58.33333%'}},
  '.xlP8': {'@media (min-width: 1200px)': {flex: '1 66.66667%'}},
  '.xlP9': {'@media (min-width: 1200px)': {flex: '1 75%'}},
  '.xlP10': {'@media (min-width: 1200px)': {flex: '1 83.33333%'}},
  '.xlP11': {'@media (min-width: 1200px)': {flex: '1 91.66667%'}},
  '.xlP12': {'@media (min-width: 1200px)': {flex: '1 100%'}},
}
//append '*' ASTERIX
const styles = extended.StyleSheet.create({
  globals: cssGlobal(preStyles)
});

export default extended.css(styles.globals);

//html: {width: 100%; height: 100%; overflow-x: hidden;
//Body: {margin: 0 auto; min-width: 250px; width: 100%; height: 100%;}
//#root{ width: 100%; height: 100%}
