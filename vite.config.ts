import {defineConfig} from 'vite';
// import legacy from '@vitejs/plugin-legacy';
import RubyPlugin from 'vite-plugin-ruby';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
    plugins: [
        RubyPlugin(),
        FullReload(['config/routes.rb', 'app/views/**/*', 'app/javascript/stylesheets/*']),
        // legacy({
        //     targets: ['defaults', 'not IE 11']
        // })
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
});
