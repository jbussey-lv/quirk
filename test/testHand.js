var assert = require('assert');
var Bag = require('../src/components/Bag.js');
var Hand = require('../src/components/Hand.js');

beforeEach(function(){
  this.hand = new Hand([1,2,3,4,5,6]);
});

describe('Hand', function () {

  describe('supplyOne()', function() {

    it('should gives you the element you specify', function() {
       assert.strictEqual(this.hand.supplyOne(3), 4);
    });

    it('should should shrink in size by one', function() {
      this.hand.supplyOne(3);
      assert.strictEqual(this.hand.getCount(), 5);
    });

    it('should throw error if you ask for an index that is out of bounds', function(){
      // assert.throws(function(){this.hand.supplyOne(-1);}, Error);
      assert.throws(function(){this.hand.supplyOne(1);}, Error);
    });
  });



});
