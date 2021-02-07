import { strict as assert } from 'assert';
import Bag from '../src/components/Bag.js';
var bag;
function resetBag(){
  bag = new Bag([1,2,3,4,5,6,7,8,9,10]);
}

beforeEach(function(){
  resetBag();
});

describe('Bag', function () {

  describe('drawTiles()', function () {
    it('should return different tiles at random', function () {
      var different = false;
      var lastDraw = null;
      for(let i = 0; i < 10; i++){
        resetBag();
        var thisDraw = bag.drawTiles(1)[0];
        if(i>0 && lastDraw !== thisDraw){
          different = true;
        }
        lastDraw = thisDraw;
      }
      assert(different);
    });

    it('should return an array', function () {
      assert(Array.isArray(bag.drawTiles()));
    });

    it('should return array length 3 when called with arg 3', function () {
      var drawnTiles = bag.drawTiles(3);
      assert.equal(drawnTiles.length, 3);
    });

    it('should get smaller by 3 when called with arg 3', function () {
      let count = bag.getCount();
      bag.drawTiles(3);
      let newCount = bag.getCount();
      assert.equal(count-newCount, 3);
    });

    it('should return empty array when called with no args', function () {
      assert.equal(bag.drawTiles().length, 0);
    });

    it('should throw exception when we try to draw more than it has', function () {
      assert.throws(function(){bag.drawTiles(1000)}, Error);
    });
  });

  describe('tradeTiles(tiles)', function () {

    it('should return as many as supplied', function(){
      let tradeIns = [11, 12, 13];
      let count = bag.getCount();
      let draw = bag.tradeTiles(tradeIns);
      let newCount = bag.getCount();
      assert.equal(count, newCount);
    });

    it('should return none of the same as supplied', function(){
      let tradeIns = [11, 12, 13];
      console.log(bag.tiles);
      let draws = bag.tradeTiles(tradeIns);
      console.log(bag.tiles);
      let overlap = tradeIns.filter(value => draws.includes(value));
      assert.equal(overlap.length, 0);
    });

    it('should not allow trading in more than bag contains', function(){
      let bag = new Bag([1,2,3]);
      let tradeIns = [4,5,6,7];
      
      assert.throws(function(){
        draws = bag.tradeTiles(tradeIns);
      }, Error);
    });

  });

});
