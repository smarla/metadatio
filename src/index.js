/**
 * Created by pelaym on 2/9/17.
 */

import Metadatio from './core';
import * as Metadata from './metadata';
import * as Data from './data';
// import Exceptions from './exceptions';

const exports = { Metadatio };

for(let metadataItem in Metadata) {
    if(Metadata.hasOwnProperty(metadataItem)) {
        exports[metadataItem] = Metadata[metadataItem];
    }
}

for(let dataItem in Data) {
    if(Data.hasOwnProperty(dataItem)) {
        exports[dataItem] = Data[dataItem];
    }
}

module.exports = exports;