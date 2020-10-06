
var UACommands = {
    topMenuNav: function () {
        this
            .click('@men')
            .waitForElementPresent('body')
            .verify.containsText('@departmentHeader', 'Men')
            .click('@women')
            .waitForElementPresent('body')
            .verify.containsText('@departmentHeader', 'Women')
            .click('@kids')
            .waitForElementPresent('body')
            .verify.containsText('@departmentHeader', 'KIDS')
            .click('@shoes')
            .waitForElementPresent('body')
            .verify.containsText('@departmentHeader', 'Shoes')
            .click('@sports')
            .waitForElementPresent('body')
            .verify.containsText('@subcategory', 'Sports')
            .click('@outlet')
            .waitForElementPresent('body')
            .verify.containsText('@subcategory', 'Outlet')
    },
    newArrivals: function (data) {
        this
        .click(data.category)
        .pause(2000)
        .waitForElementVisible('body')
        .verify.containsText('@subcategory', data.heading)
        .api.back()
        .waitForElementVisible('body')
        


    },
    searchTest: function (data) {
        this
            .setValue('@search', data)
            .click('@searchButton')
            .waitForElementVisible('@resultScreen')
            .verify.containsText('@resultScreen', data)
        return this
    },
    filterTest: function () {
        this
            .setValue('@search', "hoodie")
            .click('@searchButton')
            .waitForElementVisible('@resultScreen')
            .pause(2000)
            .waitForElementPresent('@gender')
            .click('@gender')
            .pause(2000)
            .waitForElementPresent('@mensFilter')
            .click('@mensFilter')
            .pause(2000)
            .click('@color')
            .waitForElementVisible('@redFilter')
            .click('@redFilter')
            .pause(2000)
            .waitForElementPresent('@size')
            .click('@size')
            .pause(2000)
            .waitForElementPresent('@xlFilter')
            .click('@xlFilter')
            .pause(2000)
            .waitForElementPresent('@sizeRange')
            .click('@sizeRange')
            .waitForElementVisible('@tallFilter')
            .click('@tallFilter')
            .pause(2000)
            .click('@collection')
            .waitForElementVisible('@armourFleeceFilter')
            .click('@armourFleeceFilter')
            .pause(2000)
            .click('@productResult')
            .pause(2000)
            .waitForElementVisible('body')
            .verify.containsText('@genderList', "Men")
            .verify.containsText('@sizeList', "XL")
            .verify.containsText('@rangeList', "TALL")
            .verify.containsText('@collectionCheck', "Armour")
            .assert.visible('@redCheck')

    },

    wishlistTest: function (data) {
        let wishProduct
        var self = this
        this
            .setValue('@search', data)
            .click('@searchButton')
            .waitForElementVisible('@resultScreen')
            .click('@productResult')
            .getText('@productTitle', result => {
                wishProduct = result.value
                self
                    .click('@wishlistAdd')
                    .pause(3000)
                    .click('@wishlistLink')
                    .waitForElementVisible('@wishlistResults')
                    .verify.containsText('@wishlistResults', wishProduct)
                    .click('@removeWishlist')
                    .assert.not.elementPresent('@wishlistResults')



            })

    },
    addToBagTest: function () {
        let addProduct
        var self = this
        this
            .setValue('@search', "shorts")
            .click('@searchButton')
            .waitForElementVisible('@resultScreen')
            .click('@productResult')
            .getText('@productTitle', result => {
                addProduct = result.value
                self
                    .waitForElementVisible('@xlSelect')
                    .click('@xlSelect')
                    .pause(4000)
                    .click('@addBag')
                    .pause(1000)
                    .click('@bagNav')
                    .waitForElementVisible('@bagResults')
                    .verify.containsText('@bagResults', addProduct)
                    .getText('@oldSize', result => {
                        let oldSize = result.value

                    self
                    .waitForElementVisible('@bagEdit')
                    .click('@bagEdit')
                    .pause(2000)
                    .waitForElementVisible('@xxlSelect')
                     self 
                    .click('@xxlSelect')
                    .click('@bagUpdate')
                    .waitForElementVisible('@bagResults')
                    .expect.element('@bagResults').text.to.not.contain (oldSize)
                    self
                    .click('@bagRemove')
                    .waitForElementVisible('@confirmRemove')
                    .click('@confirmRemove')
                    .verify.containsText('@emptyBag', "You have no items in your bag.")

                    })
                })
                

    },
    promoTest: function () {
        var self = this
        this
            .setValue('@search', "shorts")
            .click('@searchButton')
            .waitForElementVisible('@resultScreen')
            .click('@productResult')
            .pause(2000)
            .useXpath()
            .verify.visible({ selector: '(//a[@aria-label="size"])[1]', suppressNotFoundErrors: true }, function (results) {
                let visible = results
                if (visible === true) {
                    self

                        .waitForElementVisible('@xlSelect')
                        .click('@xlSelect')
                        .useCss()
                        .pause(2000)
                        .click('@quantitySelect')
                        .click('@quantity3')
                        .pause(2000)
                        .waitForElementVisible('@addBag')
                        .click('@addBag')
                }
                else {
                    self
                        .pause(2000)
                        .click('@bagAdd')
                }
            })
            .pause(2000)
            .click('@bagNav')
            .waitForElementVisible('@bagResults')
            .getText('@productPrice', result => {
                let price = result.value.slice(1)
                console.log(price)
                if (price > 59.99) {
                    console.log(price)
                    console.log('Promo Eligible')
                        .verify.containsText('@shipping', "Free")
                }
                else {
                    console.log(price)
                    console.log("not eligible")
                    self
                    .pause(2000)
                    .useCss()
                    .expect.element('.hide-shipping-discount').present
                }

            })

    },
    sortLow: function () {
        var self = this
        this
            .setValue('@search', "shorts")
            .click('@searchButton')
            .waitForElementVisible('@resultScreen')
            .click('@sortFilter')
            .click('@lowToHigh')
            .waitForElementVisible('@resultScreen')
            .pause(2000)
            .getText('@actualPrice1', result => {
                let price1 = result.value.slice(1)
                console.log(price1)
                self
             .getText('@actualPrice2', result => {
                        let price2 = result.value.slice(1)
                        console.log(price2)
                        self
                        .verify.ok(price1<=price2)
                        if (price1 <= price2) { 
                        console.log("Sorting Correct") }
                        else {
                        console.log("Sorting Error")
                        }
                        
                    })
                    



            })
    },
    sortHigh: function () {
        var self = this
        this
            .setValue('@search', "shirt")
            .click('@searchButton')
            .waitForElementVisible('@resultScreen')
            .click('@sortFilter')
            .click('@highToLow')
            .waitForElementVisible('@resultScreen')
            .pause(3000)
            .getText('@listPrice1', result => {
                let price1 = result.value.slice(1)
                console.log(price1)
                self
             .getText('@listPrice2', result => {
                        let price2 = result.value.slice(1)
                        console.log(price2)
                        self
                        .verify.ok(price1>=price2)
                        if (price1 >= price2) { 
                        console.log("Sorting Correct") }
                        else {
                        console.log("Sorting Error")
                        }
                        
                    })
                    



            })
    }
}


module.exports = {
    url: 'https://www.underarmour.com',
    commands: [UACommands],
    elements: {
        //men, kids, women, shoes,  hunting
        departmentHeader: '#cm-placement-primary',
        // includes sports and outlet
        subcategory: '.b-plp_header-category_heading',
        // Search testing
        search: 'input[name="q"]',
        searchButton: 'button[name="search-button"]',
        resultScreen: '.l-plp-products_container',
        // Top Menu
        men: '#men',
        women: '#women',
        kids: '#kids',
        shoes: '#footwear',
        sports: '#sport',
        outlet: '#outlet',
        // New Arrivals
        shopMen: {
            selector: '(//a[@href="/en-us/c/mens/new-arrivals/"])[1]',
            locateStrategy: 'xpath'},
     shopWomen: {
            selector: '//a[contains(text(),"Shop Women")]',
            locateStrategy: 'xpath'},
     shopBoys: {
            selector: '//a[contains(text(),"Shop Boys")]',
            locateStrategy: 'xpath'},
    shopGirls: {
            selector: '//a[contains(text(),"Shop Girls")]',
            locateStrategy: 'xpath'},
        
        //Filters
        sideBar: '.l-plp-sidebar-filter',
        gender: {
            selector: '//div[@aria-controls="refinement-gender"]',
            locateStrategy: 'xpath'
        },
        mensFilter: 'a[data-analytics-plp-filter-value="Mens"]',
        color: {
            selector: '//div[@aria-controls="refinement-color"]',
            locateStrategy: 'xpath'
        },
        redFilter: 'a[data-analytics-plp-filter-value="Red"]',
        size: {
            selector: '//div[@aria-controls="refinement-size"]',
            locateStrategy: 'xpath'
        },
        xlFilter: 'a[data-analytics-plp-filter-value="XL"]',
        sizeRange: {
            selector: '//div[@aria-controls="refinement-size-range"]',
            locateStrategy: 'xpath'
        },
        tallFilter: 'a[data-analytics-plp-filter-value="Tall"]',
        collection: {
            selector: '//div[@aria-controls="refinement-collection"]',
            locateStrategy: 'xpath'
        },
        armourFleeceFilter: 'a[data-analytics-plp-filter-value="Armour Fleece"]',
        //Product Result Filters
        productResult: {
            selector: '(//*[@class="b-tile-images_container"])[3]',
            locateStrategy: 'xpath'
        },
        genderList: '.b-breadcrumbs-list',
        colorList: 'div[data-attr="color"]',
        sizeList: '#size-3',
        rangeList: '#length-2',
        collectionCheck: '.b-product_name-wording',
        redCheck: {
            selector: '(//a[@title="Red-600"])[1]',
            locateStrategy: 'xpath',
        },
        // Wishlist testing
        xlSelect: {
            selector: '(//a[@aria-label="size"])[1]',
            locateStrategy: 'xpath'
        },

        xxlSelect: {
            selector: '(//a[@aria-label="size"])[2]',
            locateStrategy: 'xpath'},
        wishlistAdd: '.b-product_name-fav_button',
        wishlistLink: 'a[aria-label="Add to Wish List"]',
        productTitle: {
            selector: '//h1[@class="b-product_name-wording"]',
            locateStrategy: 'xpath'
        },
        wishlistResults: '.b-wishlist-grid_view',
        removeWishlist: 'button[aria-label="remove"]',
        // Bag Functionality
        addBag: {
            selector: '(//button[@class="js-add-to-cart g-button_base g-button_tertiary b-add_to_bag-cta"])[1]',
            locateStrategy: 'xpath'
        },
        bagResults: '.b-cartlineitem',
        bagNav: '.b-header_minicart-icon',
        bagEdit: 'a[data-cmp="editBasketProduct"]',
        bagUpdate: '.js-update-cart-product-global',
        bagRemove: 'button[data-cmp="removeProductModal"]',
        oldSize: {
            selector: '//p[contains(text(),"Size")]',
            locateStrategy: 'xpath'
        },
        confirmRemove: {
            selector: '(//button[contains(text(),"Remove Item")])[2]',
            locateStrategy: 'xpath'
        },
        emptyBag: {
            selector: '(//div[@class="b-cart-inner-content_left"])[1]',
            locateStrategy: 'xpath'
        },
        // Promotion
        productPrice: {

            selector: '(//div[@class="b-productcard_total_price line-item-total-price"]) [1] ',
            locateStrategy: 'xpath'
        },
        shipping: {
            selector: '//span[@class="text-right shipping-cost bfx-price bfx-total-shipping"]',
            locateStrategy: 'xpath'
        },
        bagAdd: {
            selector: '(//button[contains(text(),"Add to Bag")])[1]',
            locateStrategy: 'xpath'
        },
        //Sorting
        actualPrice1: {
            selector: '(//span[@class="b-price-value highlighted bfx-price m-actual"])[1]',
            locateStrategy: 'xpath'
        },
        actualPrice2: {
            selector: '(//span[@class="b-price-value highlighted bfx-price m-actual"])[2]',
            locateStrategy: 'xpath'
        },
        lowToHigh: {
            selector: '//li[@class="select-option price-low-high"]',
            locateStrategy: 'xpath'
        },

        highToLow: {
            selector: '//li[@class="select-option price-high-low"]',
            locateStrategy: 'xpath'
        },
        listPrice1: {
            selector: '(//*[@class="b-price"])[1]',
            locateStrategy: 'xpath'},
        listPrice2: {
            selector: '(//*[@class="b-price"])[2]',
            locateStrategy: 'xpath'},
        
        
        sortFilter: '.g-selectric',
        quantitySelect: '#quantity-1',
        quantity3:{
            selector: '(//select/option[@value="3"])[1]',
            locateStrategy: 'xpath'},
        

    }
}