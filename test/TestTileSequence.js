var assert = require('assert');
var TileSequence = require('../src/components/TileSequence.js');
var TileSequenceBuilder = require('../src/components/TileSequenceBuilder.js');

describe('TileSequence', function () {



  describe('getPoints', function(){

    it('should return three for three color all different shapes', function(){
      var tileSequence = (new TileSequenceBuilder())
                          .addTile('red', 'square')
                          .addTile('red', 'circle')
                          .addTile('red', 'plus')
                          .build();

      assert.equal(tileSequence.getPoints(), 3);
    });

    it('should return zero if there is a mismatch', function(){
      var tileSequence = (new TileSequenceBuilder())
                          .addTile('red', 'square')
                          .addTile('blue', 'circle')
                          .addTile('red', 'plus')
                          .build();

      assert.equal(tileSequence.getPoints(), 0);
    });

    it('should return twelve if you get all one color six different shapes', function(){
      var tileSequence = (new TileSequenceBuilder())
                          .addTile('red', 'square')
                          .addTile('red', 'circle')
                          .addTile('red', 'plus')
                          .addTile('red', 'clover')
                          .addTile('red', 'star')
                          .addTile('red', 'burst')
                          .build();

      assert.equal(tileSequence.getPoints(), 12);
    });

    it('should return twelve if you get six different colors all one shapes', function(){
      var tileSequence = (new TileSequenceBuilder())
                          .addTile('red', 'square')
                          .addTile('blue', 'square')
                          .addTile('green', 'square')
                          .addTile('purple', 'square')
                          .addTile('yellow', 'square')
                          .addTile('orange', 'square')
                          .build();

      assert.equal(tileSequence.getPoints(), 12);
    });

  });


  describe('lineToSquences', function(){

    it('should return zero squences for [null, null, null]', function(){
      var line = [null, null, null];
      assert.equal(TileSequence.lineToSequences(line).length, 0);
    });
    it('should return zero squences for []', function(){
      var line = [];
      assert.equal(TileSequence.lineToSequences(line).length, 0);
    });
    it('should return zero squences for [null]', function(){
      var line = [null];
      assert.equal(TileSequence.lineToSequences(line).length, 0);
    });
    it('should return zero sequences for [1]', function(){
      var line = [1];
      assert.equal(TileSequence.lineToSequences(line).length, 0);
    });
    it('should return zero sequences for [1,null,1,null,1]', function(){
      var line = [1,null,1,null,1];
      assert.equal(TileSequence.lineToSequences(line).length, 0);
    });
    it('should return one sequence for [1,1,1,1,1]', function(){
      var line = [1,1,1,1,1];
      var sequences = TileSequence.lineToSequences(line);
      assert.equal(sequences.length, 1);
    });
    it('should return two sequence for [1,1,1,null,null,1,1,1]', function(){
      var line = [1,1,1,null,null,1,1,1];
      assert.equal(TileSequence.lineToSequences(line).length, 2);
    });
    it('should return two sequence for [1,1,1,null,null,1,1,1]', function(){
      var line = [1,1,1,null,null,1,1,1];
      assert.equal(TileSequence.lineToSequences(line).length, 2);
    });
    it('should return two sequence for [null,1,1,1,null,1,1,null,null]', function(){
      var line = [null,1,1,1,null,1,1,null,null];
      assert.equal(TileSequence.lineToSequences(line).length, 2);
    });

  });

  describe('isIllegal()', function () {

    it('should return true if no pattern', function () {

      var tileSequence = (new TileSequenceBuilder())
                             .addTile('red', 'square')
                             .addTile('blue', 'circle')
                             .build();

      assert(tileSequence.isIllegal());
    });

    it('should return true if any repeats', function () {

      var tileSequence = (new TileSequenceBuilder())
                             .addTile('red', 'square')
                             .addTile('red', 'circle')
                             .addTile('red', 'circle')
                             .build();

      assert(tileSequence.isIllegal());
    });

    it('should return false if all one color, all different shapes', function () {

      var tileSequence = (new TileSequenceBuilder())
                              .addTile('red', 'square')
                              .addTile('red', 'circle')
                              .addTile('red', 'clover')
                              .addTile('red', 'plus')
                              .addTile('red', 'star')
                              .addTile('red', 'burst')
                             .build();

      assert.strictEqual(tileSequence.isIllegal(), false);
    });

    it('should return false if all different colors, all same shapes', function () {

      var tileSequence = (new TileSequenceBuilder())
                            .addTile('red', 'square')
                            .addTile('orange', 'square')
                            .addTile('yellow', 'square')
                            .addTile('green', 'square')
                            .addTile('blue', 'square')
                            .addTile('purple', 'square')
                             .build();

      assert.strictEqual(tileSequence.isIllegal(), false);
    });

    it('should throw an error if just one tile', function () {

      var builder = (new TileSequenceBuilder())
                            .addTile('red', 'square');

      assert.throws(function(){builder.build()}, Error);
    });

    it('should throw an error if no tiles', function () {

      var builder = (new TileSequenceBuilder());

      assert.throws(function(){builder.build()}, Error);
    });

  });
});
