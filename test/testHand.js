import { strict as assert } from 'assert';
import Hand from '../src/components/Hand.js';

beforeEach(function(){
  this.fullHand = new Hand([1,2,3,4,5,6]);
  this.halfHand = new Hand([1,2,3]);
  this.emptyHand = new Hand();
});

describe('Hand', function(){

  describe('getCount()', function(){

    it('should return proper tile count', function(){
      assert.equal(this.fullHand.getCount(), 6);
      assert.equal(this.halfHand.getCount(), 3);
      assert.equal(this.emptyHand.getCount(), 0);
    });

  });

  describe('addTile()', function(){

    it('should throw error if you add tile when already at max size', function(){
      this.fullHand.addTile(7);
    });

    it('should bump size by one if you add validly', function(){
      this.halfHand.addTile(9);
      assert.equal(this.halfHand.getCount(), 4);
    });

    it('should have addition appear in hand', function(){
      this.halfHand.addTile(9);
      assert(this.halfHand.getTiles().includes(9))
    });

  });

  describe('addManyTiles()', function(){

    it('should throw error if you add tile when already at max size', function(){
      this.fullHand.addManyTiles([7, 8]);
    });

    it('should bump size by number added', function(){
      this.halfHand.addManyTiles([7, 8]);
      assert.equal(this.halfHand.getCount(), 5);
    });

    it('should have addition appear in hand', function(){
      this.halfHand.addManyTiles([7, 8]);
      assert(this.halfHand.getTiles().includes(7));
      assert(this.halfHand.getTiles().includes(8));
    });

  });

  describe('returnTile()', function() {

    it('should gives you the element you specify', function() {
       assert.strictEqual(this.fullHand.returnTile(3), 4);
    });

    it('should should shrink in size by one', function() {
      this.fullHand.returnTile(3);
      assert.strictEqual(this.fullHand.getCount(), 5);
    });

    it('should throw an error if you ask for an index that is too high', function() {
      assert.throws(function(){
        let tile = this.fullHand.returnTile(6);
      }, Error);
    });

    it('should throw an error if you ask for an index that is too low', function() {
      assert.throws(function(){
        let tile = this.fullHand.returnTile(-1);
      }, Error);
    });

  });

});
