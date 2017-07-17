import React, {Component} from 'react'

// === APHRODITE CSS
import { StyleSheet, css } from 'aphrodite';

const CategorySelector = ({categoriesSelected, categoriesByCity, catClickStatus, handleCategoryChoice, updateGymInstanceByCityByCat, updateFilteredArrByCat}) => {
    {
      /** Categories column
      * Insert a MAP here of categories available (from current Cities and Gyms loaded)
          > Use .populate() on the current City to grab all Categories and load
      * Create a small column on right that has logos and small text to rep each catSelecta
      * create an Action that onClick will change STATE and change the visible view of Gyms loaded on left
      *
      * When clicking CATEGORY: take ID of CATEGORY and filter state.categoriesByCity to only show
      * GYMINSTANCES that match that chosen CATEGORY ID
      *
      *
      */
    }

    //Cat chosen? No? Then show default else show cats chosen bruh
    const catChooserToRender = () => (
      categoriesSelected.length
      ? categoriesSelected.map(
        (cat, index) =>
          <div className="flex rowWrap aCenter jCenter xsP3 margin5 padding15 font16 font800 italic boxShadow" key={index}>
            <span> {cat.name.toUpperCase()} </span>
            <span
              className="margin10LR font100"
              style={{cursor: 'pointer'}}
              onClick={ () => {handleCategoryChoice(cat)}}
            > x </span>

          </div>
        )
      : <div>Please Select Category Below</div>
    );

    return (
      <div id="catSelectaWrapper" className={"flex xsP3 smP3 mdP3 colNoWrap height100 overflowAuto" + css(styles.scrollBarThinBlack)}>
        {/*Whatever Category the user clicks on in calSelecta, add to the div below*/}
        <div className="flex rowWrap aCenter jCenter padding15 width100" id="selectedCats" style={{minHeight: 97, maxHeight: 97}}>
          {catChooserToRender()}
        </div>
        {/*Take the "categoriesByCity" array from the state object and map here*/}
        <div id="catSelecta" className="flex rowWrap height100">
          {categoriesByCity.map( (cat, index) => {
            return (
              <div
              className={null} key={index} className={css(styles.catDivs) + " flex colNoWrap jCenter aCenter height100 smP6 mdP3 lgP1 margin15"}
              style={{borderRadius: 50}}
              onClick={ () => {handleCategoryChoice(cat)}}
              >
                <h1 className="margin0" style={{font: '800 italic 110% "Helvetica"'}}>{cat.name.toUpperCase()}</h1>
                <img src={cat.icon} style={{width: 50}}/>
              </div>
            )
          })}
        </div>
      </div>
  );
}

const styles = StyleSheet.create({
  catDivs: {
    ':hover': {
      boxShadow: '0px 0px 5px rgba(0,0,0,0.25)',
    },
    ':active': {
      boxShadow: '0px 0px 8px rgba(255,0,0,0.5)',
    },
    cursor: 'pointer',
    minHeight: 120, maxHeight: 120,
    overflow: 'hidden'
  },
})

export default CategorySelector;
