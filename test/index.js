/**
 * Created by sm on 10/05/16.
 */

import Minimist from 'minimist';
import Mocha from 'mocha';
import Glob from 'glob';

const argv = Minimist(process.argv.slice(2), {
    alias: {
        c: 'component',
        g: 'grep',
    },
});

const types = argv._;
const globPatterns = {
    unit: `test/**/${argv.component ? argv.component : '*'}.spec.js`,
};

let pattern;

if (types.indexOf('unit') === -1) {
    pattern = Object.keys(globPatterns).map((n) => globPatterns[n]);
} else {
    pattern = types.map((n) => globPatterns[n]);
}

const mocha = new Mocha({
    grep: argv.grep ? argv.grep : undefined,
});

Glob(
    pattern.length > 1 ? `{${pattern.join(',')}}` : pattern[0],
    {},
    (err, files) => {
        files.forEach((file) => mocha.addFile(file));
        mocha.run((failures) => {
            process.on('exit', () => {
                process.exit(failures);
            });
        });
    }
);