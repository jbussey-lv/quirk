var assert = require('assert');
var Bag = require('../src/components/Bag.js');

var mockTiles = [1,2,3,4,5,6,7,8,9,10];

var bag = new Bag(mockTiles);


describe('Bag', function () {

  describe('drawTiles()', function () {
    it('should return an array', function () {
      assert(Array.isArray(bag.drawTiles()));
    });

    it('should return array length 3 when called with arg 3', function () {
      assert.equal(bag.drawTiles(3).length, 3);
    });

    it('should return empty array when called with no args', function () {
      assert.equal(bag.drawTiles().length, 0);
    });

    it('should throw exception when we try to draw more than it has', function () {
      assert.throws(function(){bag.drawTiles(1000)}, Error);
    });


  });
});
