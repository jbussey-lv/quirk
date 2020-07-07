var assert = require('assert');
var Bag = require('../src/components/Bag.js');
var Hand = require('../src/components/Hand.js');

beforeEach(function(){
  this.hand = new Hand([1,2,3,4,5,6]);
});

describe('Hand', function(){

  describe('supplyOneSpecific()', function() {

    it('should gives you the element you specify', function() {
       assert.strictEqual(this.hand.supplyOneSpecific(3), 4);
    });

    it('should should shrink in size by one', function() {
      this.hand.supplyOneSpecific(3);
      assert.strictEqual(this.hand.getCount(), 5);
    });

    it('should throw an error if you ask for an index that is too high', function() {
      // this.hand.supplyOneSpecific(3);
      assert.throws(()=>{this.hand.supplyOneSpecific(6);}, Error);
    });

    it('should throw an error if you ask for an index that is too low', function() {
      assert.throws(()=>{this.hand.supplyOneSpecific(-1);}, Error);
    });
  });

  describe('supplyManySpecific()', function() {

    it('should gives you the elements you specify', function() {
      var supplied = this.hand.supplyManySpecific([2,4])
      assert.equal(JSON.stringify(supplied.sort()), JSON.stringify([3,5]));
    });

    it('should give you nothing if you pass in empty array', function(){
      assert.equal(this.hand.supplyManySpecific([]).length, 0);
    });

    it('should should shrink in size by how man drawn', function() {
      this.hand.supplyManySpecific([1,2,3]);
      assert.equal(this.hand.getCount(), 3);
    });

    it('should throw an error if you ask for duplicates', function() {
      assert.throws(()=>{this.hand.supplyManySpecific([1,2,2]);}, Error);
    });

    it('should throw an error if you ask for an index that is out of bounds', function() {
      assert.throws(()=>{this.hand.supplyManySpecific([3,4,5,6]);}, Error);
    });
  });

});
