var assert = require('assert');
var TileSequence = require('../src/components/TileSequence.js');
var TileSequenceBuilder = require('../src/components/TileSequenceBuilder.js');

describe('TileSequence', function () {

  describe('GridToLines()', function(){

    it('should give back six lines for 3x3 array', function(){

      var grid = [[1,2,3],[1,2,3],[1,2,3]];

      var lines = TileSequence.gridToLines(grid);

      assert.equal(lines.length, 6);

    });

    it('should return 2 lines for 1 x 1 array', function(){

      var grid = [[1]];

      var lines = TileSequence.gridToLines(grid);

      assert.equal(lines.length, 2);

    });

    it('should give back proper result for 2 x 2 array', function(){

      var grid = [[1,2],[1,2]];

      var lines = TileSequence.gridToLines(grid);

      var hoped = [[1,2],[1,2],[1,1],[2,2]];

      assert.equal(JSON.stringify(lines), JSON.stringify(hoped));

    });
  });


  describe('gridToSequences()', function(){

    it('should give back three sequences for an H grid', function(){

      var grid = [[1,null,3],[4,5,6],[7,null,9]];

      var sequences = TileSequence.gridToSequences(grid);

      assert.equal(sequences.length, 3);

    });

    it('should give back two sequences for an T grid', function(){

      var grid = [[1,2,3],[null,5,null],[7,8,9]];

      var sequences = TileSequence.gridToSequences(grid);

      assert.equal(sequences.length, 3);

    });

    it('should give back two sequences for an + grid', function(){

      var grid = [[null,2,null],[4,5,6],[null,8,null]];

      var sequences = TileSequence.gridToSequences(grid);

      assert.equal(sequences.length, 2);

    });

    it('should give back 5 sequences for a double row', function(){

      var grid = [[1,2,3],[4,5,6],[null,null,null]];

      var sequences = TileSequence.gridToSequences(grid);

      assert.equal(sequences.length, 5);

    });
  });



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
