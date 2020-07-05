var assert = require('assert');
var Bag = require('../src/components/Bag.js');
var bag;

beforeEach(() => {
  bag = new Bag([1,2,3,4,5,6,7,8,9,10]);
});

describe('Bag', function () {

  describe('drawTile()', function () {
    it('should draw different tiles at random', function () {
      var different = false;
      var lastDraw = null;
      for(let i = 0; i < 10; i++){

        var thisDraw = bag.drawTile();
        if(i>0 && lastDraw !== thisDraw){
          different = true;
        }
        lastDraw = thisDraw;
      }
      assert(different);
    });
  });

  describe('drawTiles()', function () {

    it('should return an array', function () {
      assert(Array.isArray(bag.drawTiles()));
    });

    it('should return array length 3 when called with arg 3', function () {
      var drawnTiles = bag.drawTiles(3);
      assert.equal(drawnTiles.length, 3);
    });

    it('should return empty array when called with no args', function () {
      assert.equal(bag.drawTiles().length, 0);
    });

    it('should throw exception when we try to draw more than it has', function () {
      assert.throws(function(){bag.drawTiles(1000)}, Error);
    });
  });

  describe('tradeTiles()', function () {

    it('should give back as many as you submit', function () {

      var input = [45,46,47]
      var output = bag.tradeTiles(input);

      assert.equal(input.length, output.length);
    });

    it('should give back none of the tiles that were submitted', function () {

      var originalContents = [1,2,3];
      var smallBag = new Bag(originalContents);

      var input = [4,5,6];
      var output = smallBag.tradeTiles(input);

      var overlap = input.filter(value => output.includes(value))

      assert.equal(overlap.length, 0);
    });

    it('should throw exception when we try to trade more than it has', function () {
      var input = [1,2,3,4,5,6,7,8,9,10,11];
      assert.throws(function(){bag.tradeTiles(input)}, Error);
    });
  });
});
