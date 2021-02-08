import { strict as assert } from 'assert';
import Tile from '../src/components/Tile.js';
import TileSequence from '../src/components/TileSequence.js';
import TileSequenceBuilder from '../src/components/TileSequenceBuilder.js';

describe('TileSequence', function () {

  describe('instantiation', function(){

    // it('should throw error if you try to instantiate with less than 2 tiles', function(){
      
    //   assert.throws(()=>{
    //     let t1 = new Tile
    //     let sequence = new TileSequence()
    //   }, Error);
    // })

  });

  describe('isIllegal()', function(){
    
  })

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

});
