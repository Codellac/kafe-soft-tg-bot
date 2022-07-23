import {buildSync} from 'esbuild';

buildSync({
    entryPoints: ['main.ts'],
    platform: 'node',
    target: ['node16'],
    outfile: 'build/bundle.js',
    bundle: true,
    minify: true,
    keepNames: true
});