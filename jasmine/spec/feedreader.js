/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each have a defined URL', function(){
          for(var i = 0; i<allFeeds.length; i++) {
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url.length).not.toBe(0);
          }
        });

        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each have a defined name', function(){
           for(var i = 0; i<allFeeds.length; i++) {
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name.length).not.toBe(0);
           }
         });
    });


    /* This test suite ensures that the menu is hidden by default and is changing visibility when clicked*/
    describe('The menu', function() {
        /* Test that ensures the menu element is
         * hidden by default.
         */
         it('should be hidden by default', function(){
           expect($('body').hasClass("menu-hidden")).toBe(true);
         });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
          it('should change visibility when clicked', function(){
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* This test suite ensures that the initial entries are added */
    describe('Initial Entries', function(){
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
          */
         beforeEach(function(done){
           loadFeed(0, function(){
             done();
           });
         });

         it('are added', function() {
           expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });
    /* This test suite ensures that when a new feed is loaded the content actually changes */
    describe('New Feed Selection', function(){
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         var feedOne = '';
         var feedTwo = '';
         beforeEach(function(done){
           loadFeed(0, function(){
             feedOne = $('.entry').html();
             done();
           });
           loadFeed(1, function (){
             feedTwo = $('.entry').html();
             done();
           });
         });

         it('works', function() {
           expect(feedOne).not.toBe(feedTwo);
         });
    });
}());
