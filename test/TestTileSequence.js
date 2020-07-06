var assert = require('assert');
var TileSequence = require('../src/components/TileSequence.js');
var TileSequenceBuilder = require('../src/components/TileSequenceBuilder.js');

describe('TileSequence', function () {

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
