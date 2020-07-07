
var assert = require('assert');
var Bag = require('../src/components/Player.js');


describe('Player', function () {

    describe('trade()', function () {

        it('should get back as many as submit', function () {

        this.hand.trade([1,2]);

        assert.equal(this.hand.getCount(), 6);
        });

        it('should give back none of the tiles that were submitted', function () {

        var originalContents = this.hand.tiles.slice(0);
        this.hand.trade([0,1]);
        var newContents = this.hand.tiles.slice(0);

        var overlap = originalContents.filter(value => newContents.includes(value));

        assert.equal(overlap.length, 4);
        });

        it('should throw exception when we try to trade more than it has', function () {
        assert.throws(function(){this.hand.trade([0,1,2,3,4])}, Error);
        });

        it('should allow us to trade in all it has', function () {

        this.hand.trade([0,1,2,3]);
        assert.equal(this.hand.getCount(), 6);
        });
    });
});