import React, {Component} from 'react'

// === COMPONENTS
import BackgroundPic from './BackgroundPic'
import Button from './Button'
import CategorySelector from './CategorySelector'
import GymContent from './GymContent'
import HamburgerMenu from './HamburgerMenu'
import Logo from './Logo'
import LoadingGif from './LoadingGif'

// === APHRODITE CSS
import { StyleSheet, css } from 'aphrodite';
import { Gyms } from '../data/gyms/gym.js';


const GymViewerPage = (
    {   categoriesByCity,
        catDataInput,
        catClickStatus,
        categoriesSelected,
        currentCity,
        currentFilteredDataArray,
        fetchingCategories,
        fetchingCities,
        fetchingGymInstances,
        gymInstancesByCity,
        handleCategoryChoice,
        resetCategories,
        routeParams,
        updateFilteredArrByCat,
        updateGymInstanceByCityByCat
    }, props) => {

    //ASync conditional - if currently fetching data, render spinner
    if (fetchingCategories || fetchingCities) {
      return <LoadingGif />
    }

    //Main content
    return (
      <div className="flex colNoWrap fullWidthHeight">
          {/*Top 100% section*/}
          <div className="flex rowNoWrap aStart jCenter mdP2 fullWidthHeight overflowHidden" style={{position: 'relative'}}>
                <HamburgerMenu />
                <BackgroundPic image={currentCity.bgImageURL}/>
                <div className="flex rowWrap jCenter aCenter height100">
                  <Logo customClassName={"xsP12 mdP2"} styleLogo={{maxWidth: '30vh'}}/>
                  <h1 className="flex aCenter jCenter xsP12" style={{font: 'bold italic 320% "Helvetica"', color: 'white'}}>{routeParams.id.toUpperCase()} </h1>
                  <Button className="font18 transition"/> <Button className="font18 transition"/>
                </div>
          </div >

          {/*CatSelecta Column/Row*/}
          <CategorySelector
            categoriesSelected={categoriesSelected}
            resetCategories={resetCategories}
            categoriesByCity={categoriesByCity}
            catClickStatus={catClickStatus}
            handleCategoryChoice={handleCategoryChoice}
            updateFilteredArrByCat={updateFilteredArrByCat}
            updateGymInstanceByCityByCat={updateGymInstanceByCityByCat}
            />

          {/*Bottom 100% section*/}
          <div className="flex rowWrap aCenter jCenter boxShadow2 margin25 padding25" id="gymBottomContent">
              <GymContent
                currentFilteredDataArray={currentFilteredDataArray}
                catDataInput={catDataInput}
                handleCategoryChoice={handleCategoryChoice}
                gymInstancesByCity={gymInstancesByCity}
                />
            </div>
      </div> //end main div
    );
}

export default GymViewerPage
