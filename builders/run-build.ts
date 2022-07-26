import {buildSync} from 'esbuild';

buildSync({
    entryPoints: ['server.ts'],
    platform: 'node',
    target: ['node16'],
    outfile: 'build/bundle.js',
    bundle: true,
    minify: true,
    keepNames: true
});