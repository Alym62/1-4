function findPalindromes() {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;

    fetch(`http://localhost:3000/palindromes?start=${start}&end=${end}`)
        .then((response) => response.json())
        .then((data) => {
            const ul = document.getElementById('palindromes');
            ul.innerHTML = '';
            data.palindromes.forEach((num) => {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(num));
                ul.appendChild(li);
            })
        })
}