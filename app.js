// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const port = 7000;

// app.set('view engine', 'pug');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

// // Dummy data for demonstration purposes
// const researchPapers = [
//   { title: 'Paper 1', author: 'Author 1', link: 'link1.pdf' },
//   { title: 'Paper 2', author: 'Author 2', link: 'link2.pdf' },
// ];

// app.get('/', (req, res) => {
//   res.render('index', { researchPapers });
// });

// app.get('/about', (req, res) => {
//   res.render('about', { researchPapers });
// });


// app.get('/login', (req, res) => {
//   res.render('login');
// });
 
// app.get('/register', (req, res) => {
//   res.render('register');
// });

// app.get('/news', (req, res) => {
//   res.render('news');
// });


// app.get('/dashboard', (req, res) => {
//   res.render('dashboard', { researchPapers });
// });

// app.post('/login', (req, res) => {
//   // Implement login logic
//   const { username, password } = req.body;
//   // Check username and password
//   // Redirect to dashboard or show an error
//   res.redirect('/dashboard');
// });

// app.post('/register', (req, res) => {
//   // Implement registration logic
//   const { username, password, email } = req.body;
//   // Create user account
//   // Redirect to login or show an error
//   res.redirect('/login');
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7000;

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Dummy data for demonstration purposes
let researchPapers = [
  { title: 'Paper 1', author: 'Author 1', link: 'link1.pdf' },
  { title: 'Paper 2', author: 'Author 2', link: 'link2.pdf' },
];

app.get('/', (req, res) => {
  res.render('index', { researchPapers });
});

app.get('/about', (req, res) => {
  res.render('about', { researchPapers });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/news', (req, res) => {
  res.render('news');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', { researchPapers });
});

app.post('/login', (req, res) => {
  // Implement login logic
  const { username, password } = req.body;
  // Check username and password
  // Redirect to dashboard or show an error
  res.redirect('/dashboard');
});

app.post('/register', (req, res) => {
  // Implement registration logic
  const { username, password, email } = req.body;
  // Create user account
  // Redirect to login or show an error
  res.redirect('/login');
});

// New route to handle viewing a research paper
app.get('/view/:id', (req, res) => {
  const paperId = req.params.id;
  const paper = researchPapers.find(p => p.id === paperId);

  if (paper) {
    res.render('view-paper', { paper });
  } else {
    res.status(404).send('Paper not found');
  }
});

// New route to handle downloading a research paper
app.get('/download/:id', (req, res) => {
  const paperId = req.params.id;
  const paper = researchPapers.find(p => p.id === paperId);

  if (paper) {
    res.download(paper.link, `${paper.title}.pdf`);
  } else {
    res.status(404).send('Paper not found');
  }
});

// New route to render the form for adding a new research paper
app.get('/add-paper', (req, res) => {
  res.render('add-paper');
});

// New route to handle adding a new research paper
app.post('/add-paper', (req, res) => {
  const { title, author, link } = req.body;
  const newPaper = { id: generateUniqueId(), title, author, link };
  researchPapers.push(newPaper);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function generateUniqueId() {
  return new Date().getTime();
}
