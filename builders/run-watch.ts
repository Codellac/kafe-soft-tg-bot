import {build} from 'esbuild';

build({
    entryPoints: ['server.ts'],
    platform: 'node',
    target: ['node16'],
    outfile: 'build/bundle.js',
    bundle: true,
    watch: {
        onRebuild(error, result) {
            if (error) console.error('watch build failed:', error);
            else console.log('watch build succeeded:', result?.errors, result?.warnings);
        }
    }
}).then(_ => {
    console.log('...watching');
});