const TileCollection = require('./TileCollection');

class Hand extends TileCollection{

    supplyOneSpecific(tileIndex){

        if(this._isIndexOutOfBounds(tileIndex)){throw new Error('index out of bounds');}
        
        return this.tiles.splice(tileIndex, 1)[0];
    }

    supplyManySpecific(tileIndexes){

        if(this._areIndexesOutOfBounds(tileIndexes)){throw new Error('indexes out of bounds');}

        if(this._areIndexesDuplicated(tileIndexes)){throw new Error('indexes duplicated');}

        return tileIndexes.sort().reverse().map(tileIndex => {
            return this.supplyOneSpecific(tileIndex);
        });
    }

    _isIndexOutOfBounds(tileIndex){
        return this._areIndexesOutOfBounds([tileIndex]);
    }

    _areIndexesOutOfBounds(tileIndexes){
        return Math.max(...tileIndexes) >= this.getCount() ||
               Math.min(...tileIndexes) < 0;

    }

    _areIndexesDuplicated(tileIndexes){
        return (new Set(tileIndexes)).size < tileIndexes.length;
    }

}

module.exports = Hand;