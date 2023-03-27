//var ghpages = require('gh-pages');
import  ghpages from 'gh-pages';

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/norricorp/directus_examples.git', // Update to point to your repository  
        user: {
            name: 'John Norris', // update to use your name
            email: 'john@norricorp.f9.co.uk' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)