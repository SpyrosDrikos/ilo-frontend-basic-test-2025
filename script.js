// script.js

// Συνάρτηση για fetch των posts και εμφάνιση λίστας
async function getPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    // TODO: Εμφανίστε τα πρώτα 10 posts στο #posts div
  } catch (error) {
    document.getElementById('posts').innerText = 'Σφάλμα φόρτωσης δεδομένων';
  }
}

// Συνάρτηση για εμφάνιση λεπτομερειών και σχολίων για ένα post
async function showDetails(id) {
  const detailsDiv = document.getElementById('details');
  detailsDiv.innerHTML = '';
  try {
    const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await postRes.json();
    const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    const comments = await commentsRes.json();
    // TODO: Εμφανίστε τα post details και τα comments στο detailsDiv
  } catch (error) {
    detailsDiv.innerText = 'Σφάλμα φόρτωσης λεπτομερειών';
  }
}

document.addEventListener('DOMContentLoaded', getPosts);
