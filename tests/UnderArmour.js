//  This test file covers the Under Armour website.  A full version of the test plan is available at https://docs.google.com/document/d/1MnXz1ZK_L5GytxBSfGLMAcJK_G_YdtE2_TqM9UUipGE/edit?usp=sharing

var UAPage={}
var UASearch = require('../testAssets/UASearch')
var UANewArrivals = require('../testAssets/UANewArrivals')

module.exports = {
    beforeEach: browser => {
        UAPage= browser.page.UAPageObject()
        UAPage
        .navigate()
        .waitForElementPresent('body')
    },
    afterEach: browser => {
        UAPage .end()
    },
    // This test goes through all of the departments in the top menu and verifies that they navigate to the correct page
    'Top Menu Navigation': browser => {
        UAPage
        .topMenuNav()
    
    },
    //This test goes through the New Arrivals links and verifies correct navigation
    'New Arrival Navigation': browser => {
        UANewArrivals.forEach(test => {
            UAPage.newArrivals(test)
        })
    },
    //  This test searches an array of search terms and verifies that the results include the term searched
    'Search Functionality': browser => {
        UASearch.forEach(test => {
            UAPage.searchTest(test) 
        }) 
    },
    //  This test filters the test results by gender, color, size, size range, and collection and verifies that the result matches what was filtered for
    'Filter Test': browser => {
        UAPage
        .filterTest()
    },
    // This test checks the ability to add and remove an item from the wishlist/saved items section
    'Wishlist Test': browser => {
        UASearch.forEach(test => {
            UAPage
            .wishlistTest(test)
        })

    },
    // This test verifies the ability to add, edit, and remove from bag.
    'Add to Bag Test': browser => {
        UAPage
        .addToBagTest()
    },
    // This test checks the promotion of free shipping for anything over 60 dollars
    
    'Promotion Test': browser => {
        UAPage
        .promoTest()
    },
    //  This tests the ability to sort search results lowest price to highest price
    'Sort Low to High': browser => {
        UAPage
        .sortLow()
    },
    //  This tests the ability to sort search results from highest to lowest price
    'Sort High to Low': browser => {
        UAPage
        .sortHigh()
    },
    
    

}
