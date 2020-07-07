var assert = require('assert');
var TileSequence = require('../src/components/TileSequence.js');
var TileSequenceBuilder = require('../src/components/TileSequenceBuilder.js');

describe('TileSequence', function () {

  beforeEach(function(){

  })

  // describe('gridToSquences', function(){

  //   it('should return 6 seuqnces for tic-tac-toe full', function(){

  //     var grid = [[1,1,1],[1,1,1],[1,1,1]];

  //     assert.equal(TileSequence.getSequencesFromGrid(grid).length, 6);
  //   });

  //   it('should return 5 seuqnces for tic-tac-toe X', function(){

  //     var grid = [[1,null,1],[null,1,null],[1,null,1]];

  //     assert.equal(TileSequence.getSequencesFromGrid(grid).length, 6);
  //   });

  // });

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

    it('should return false if just one square', function () {

      var tileSequence = (new TileSequenceBuilder())
                            .addTile('red', 'square')
                             .build();

      assert.strictEqual(tileSequence.isIllegal(), false);
    });

    it('should return false if NO tiles', function () {

      var tileSequence = (new TileSequenceBuilder())
                             .build();

      assert.strictEqual(tileSequence.isIllegal(), false);
    });

  });
});
