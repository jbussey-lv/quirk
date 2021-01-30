var assert = require('assert');
var Bag = require('../src/components/Bag.js');
var bag;

beforeEach(() => {
  bag = new Bag([1,2,3,4,5,6,7,8,9,10]);
});

describe('Bag', function () {

  describe('supply()', function () {
    it('should supply different tiles at random', function () {
      var different = false;
      var lastDraw = null;
      for(let i = 0; i < 10; i++){

        var thisDraw = bag.supplyManyRandomTiles(1)[0];
        if(i>0 && lastDraw !== thisDraw){
          different = true;
        }
        lastDraw = thisDraw;
      }
      assert(different);
    });
  });

  describe('supplyManyRandomTiles()', function () {

    it('should return an array', function () {
      assert(Array.isArray(bag.supplyManyRandomTiles()));
    });

    it('should return array length 3 when called with arg 3', function () {
      var drawnTiles = bag.supplyManyRandomTiles(3);
      assert.equal(drawnTiles.length, 3);
    });

    it('should return empty array when called with no args', function () {
      assert.equal(bag.supplyManyRandomTiles().length, 0);
    });

    it('should throw exception when we try to draw more than it has', function () {
      assert.throws(function(){bag.drawTiles(1000)}, Error);
    });
  });


});
