document.addEventListener("DOMContentLoaded", fetchData);

async function fetchData() {
  try {
    const postResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
    const userResponce = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!postResponse.ok || !userResponce.ok) {
      throw new Error("Network response was not ok");
    }


    const postData = await postResponse.json();
    const userData = await userResponce.json();

    displayData(postData, userData);
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
}

function displayData(posts, users) {
  const dataContainer = document.getElementById("data-container");

  posts.forEach((post) => {
    const user = users.find(user => user.id === post.userId);

    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>Author:${user.name}</p>
      <p>${post.body}</p>
    `;
    dataContainer.appendChild(postElement);
  });
}
