// script.js

// Συνάρτηση για fetch των posts και εμφάνιση λίστας
async function getPosts() {

  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = 'Φόρτωση...'

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    // Έλεγχος σφάλματος 
    if (!response.ok) throw new Error('Αποτυχία φόρτωσης');

    const posts = await response.json();

    // Function για το element post 
      function createPostElement(post) {
        const div = document.createElement('div');
        div.className = 'post';
        div.textContent = post.title;
        div.onclick = () => {
          document.querySelectorAll('.post').forEach(p => p.classList.remove('active-post'));
          div.classList.add('active-post');
          showDetails(post.id);
        };
        return div;
      }

    // Εμφανίζω τα πρώτα 10 posts στο #posts div με slice
        postsContainer.innerHTML = ''; // Καθαρίζει το div
        posts.slice(0, 10).forEach(post => {
          postsContainer.appendChild(createPostElement(post));
        });

  } catch (error) {
    document.getElementById('posts').innerText = 'Σφάλμα φόρτωσης δεδομένων';
  }
}

// Συνάρτηση για εμφάνιση λεπτομερειών και σχολίων για ένα post
async function showDetails(id) {

  document.getElementById('detailsTitle').style.display = 'flex';

  const detailsDiv = document.getElementById('details');
  detailsDiv.innerHTML = 'Φόρτωση...';

// Άλλαξα λίγο την δομή έτσι ώστε όταν να ελεγχεταί η εγκυ
  try {
        const [postRes, commentsRes] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
          fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        ]);

        if (!postRes.ok || !commentsRes.ok) throw new Error('Αποτυχία φόρτωσης');

        const post = await postRes.json();
        const comments = await commentsRes.json();
      
// Εμφανίζω τα post details και τα comments στο detailsDiv δυναμικά

        detailsDiv.innerHTML = `
              <h3>${post.title}</h3>
              <p>${post.body}</p>
              <h4>Σχόλια:</h4>
            `;
        
        comments.forEach(comment => {
              const commentP = document.createElement('p');
              commentP.className = 'comment';
              commentP.innerHTML = `<strong>${comment.name}:</strong> ${comment.body}`;
              detailsDiv.appendChild(commentP);
            });

  } catch (error) {
    detailsDiv.innerText = 'Σφάλμα φόρτωσης λεπτομερειών';
  }
}

document.addEventListener('DOMContentLoaded', getPosts);
