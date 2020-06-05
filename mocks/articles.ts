interface Article {
    title: string,
    cover: string,
    text: string,
    tags: string[]
}

const articles: Article[] = [{
    title: 'The Anatomy of a Tablist Component in Vanilla JavaScript Versus React',
    cover: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
    text: 'If you follow the undercurrent of the JavaScript community, there seems to be a divide as of late. It goes back over a decade. Really, this sort of strife has always been. Perhaps it is human nature.',
    tags: ['es6', 'javascript']
},
{
    title: 'The Cost of Javascript Frameworks',
    cover: 'https://tailwindcss.com/img/card-top.jpg',
    text: 'I expect this post from Tim Kadlec to be quoted in every performance conference talk for the next few years.',
    tags: ['es6', 'javascript', 'react']
},
{
    title: 'Getting JavaScript to Talk to CSS and Sass',
    cover: 'https://static.toiimg.com/photo/72975551.cms',
    text: 'JavaScript and CSS have lived beside one another for upwards of 20 years. And yet it’s been remarkably tough to share data between them.',
    tags: ['es6', 'javascript', 'css', 'sass']
},
{
    title: 'A Guide to Handling Browser Events',
    cover: 'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F191120053137-03-milky-way-images-australia.jpg',
    text: 'In this post, Sarah Chima walks us through how we can work with browser events, such as clicking, using JavaScript.',
    tags: ['es6', 'javascript', 'browser']
},
{
    title: 'Building an Images Gallery using PixiJS and WebGL',
    cover: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
    text: 'Sometimes, we have to go a little further than HTML, CSS, and JavaScript to create the UI we need, and instead use other resources, like SVG, WebGL, canvas, and others.',
    tags: ['es6', 'javascript', 'WebGL', 'project']
},
{
    title: 'How to Create an Animated Countdown Timer With HTML, CSS and JavaScript',
    cover: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg',
    text: 'Have you ever needed a countdown timer on a project?',
    tags: ['es6', 'javascript', 'css', 'project']
},
{
    title: 'Understanding Async Await',
    cover: 'https://pbs.twimg.com/media/D83KU2eUwAAMgaX.jpg',
    text: 'When writing code for the web, eventually you’ll need to do some process that might take a few moments to complete. ',
    tags: ['es6', 'javascript', 'async', 'await']
},
{
    title: 'let vs. const',
    cover: 'https://www.sciencealert.com/images/2020-04/pillars_of_creation_in_infrared_2020_nasa.jpg',
    text: 'There are multiple ways to declare variables in JavaScript.',
    tags: ['es6', 'javascript']
}, {
    title: 'The Anatomy of a Tablist Component in Vanilla JavaScript Versus React',
    cover: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
    text: 'If you follow the undercurrent of the JavaScript community, there seems to be a divide as of late. It goes back over a decade. Really, this sort of strife has always been. Perhaps it is human nature.',
    tags: ['es6', 'javascript']
},
{
    title: 'The Cost of Javascript Frameworks',
    cover: 'https://tailwindcss.com/img/card-top.jpg',
    text: 'I expect this post from Tim Kadlec to be quoted in every performance conference talk for the next few years.',
    tags: ['es6', 'javascript', 'react']
},
{
    title: 'Getting JavaScript to Talk to CSS and Sass',
    cover: 'https://static.toiimg.com/photo/72975551.cms',
    text: 'JavaScript and CSS have lived beside one another for upwards of 20 years. And yet it’s been remarkably tough to share data between them.',
    tags: ['es6', 'javascript', 'css', 'sass']
},
{
    title: 'A Guide to Handling Browser Events',
    cover: 'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F191120053137-03-milky-way-images-australia.jpg',
    text: 'In this post, Sarah Chima walks us through how we can work with browser events, such as clicking, using JavaScript.',
    tags: ['es6', 'javascript', 'browser']
},
{
    title: 'Building an Images Gallery using PixiJS and WebGL',
    cover: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
    text: 'Sometimes, we have to go a little further than HTML, CSS, and JavaScript to create the UI we need, and instead use other resources, like SVG, WebGL, canvas, and others.',
    tags: ['es6', 'javascript', 'WebGL', 'project']
},
{
    title: 'How to Create an Animated Countdown Timer With HTML, CSS and JavaScript',
    cover: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg',
    text: 'Have you ever needed a countdown timer on a project?',
    tags: ['es6', 'javascript', 'css', 'project']
},
{
    title: 'Understanding Async Await',
    cover: 'https://pbs.twimg.com/media/D83KU2eUwAAMgaX.jpg',
    text: 'When writing code for the web, eventually you’ll need to do some process that might take a few moments to complete. ',
    tags: ['es6', 'javascript', 'async', 'await']
},
{
    title: 'let vs. const',
    cover: 'https://www.sciencealert.com/images/2020-04/pillars_of_creation_in_infrared_2020_nasa.jpg',
    text: 'There are multiple ways to declare variables in JavaScript.',
    tags: ['es6', 'javascript']
},
{
    title: 'How to Create an Animated Countdown Timer With HTML, CSS and JavaScript',
    cover: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg',
    text: 'Have you ever needed a countdown timer on a project?',
    tags: ['es6', 'javascript', 'css', 'project']
},
{
    title: 'Understanding Async Await',
    cover: 'https://pbs.twimg.com/media/D83KU2eUwAAMgaX.jpg',
    text: 'When writing code for the web, eventually you’ll need to do some process that might take a few moments to complete. ',
    tags: ['es6', 'javascript', 'async', 'await']
},
{
    title: 'let vs. const',
    cover: 'https://www.sciencealert.com/images/2020-04/pillars_of_creation_in_infrared_2020_nasa.jpg',
    text: 'There are multiple ways to declare variables in JavaScript.',
    tags: ['es6', 'javascript']
}, {
    title: 'The Anatomy of a Tablist Component in Vanilla JavaScript Versus React',
    cover: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
    text: 'If you follow the undercurrent of the JavaScript community, there seems to be a divide as of late. It goes back over a decade. Really, this sort of strife has always been. Perhaps it is human nature.',
    tags: ['es6', 'javascript']
},
{
    title: 'The Cost of Javascript Frameworks',
    cover: 'https://tailwindcss.com/img/card-top.jpg',
    text: 'I expect this post from Tim Kadlec to be quoted in every performance conference talk for the next few years.',
    tags: ['es6', 'javascript', 'react']
},
{
    title: 'Getting JavaScript to Talk to CSS and Sass',
    cover: 'https://static.toiimg.com/photo/72975551.cms',
    text: 'JavaScript and CSS have lived beside one another for upwards of 20 years. And yet it’s been remarkably tough to share data between them.',
    tags: ['es6', 'javascript', 'css', 'sass']
},
{
    title: 'A Guide to Handling Browser Events',
    cover: 'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F191120053137-03-milky-way-images-australia.jpg',
    text: 'In this post, Sarah Chima walks us through how we can work with browser events, such as clicking, using JavaScript.',
    tags: ['es6', 'javascript', 'browser']
},]

export default articles
