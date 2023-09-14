document.addEventListener("DOMContentLoaded", () => {
    const buscar = document.getElementById("buscar");
    const cepInput = document.getElementById("cep");
    const resultado = document.getElementById("resultado");

    buscar.addEventListener("click", () => {
        const cep = cepInput.value.replace(/\D/g, "");

        if (cep.length !== 8) {
            resultado.innerHTML = "CEP invalído. 🚨";
            return;
        }

        fetch(`http://localhost:3000/buscar-cep/${cep}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('CEP não encontrado.');
                }
                return response.json();
            })
            .then((data) => {
                if (data.erro) {
                    resultado.innerHTML = "CEP não encontrado.";
                } else {
                    resultado.innerHTML = `
                <strong>Logradouro:</strong> ${data.logradouro}<br>
                <strong>Bairro:</strong> ${data.bairro}<br>
                <strong>Cidade/UF:</strong> ${data.localidade}/${data.uf}<br>
                `
                };
            })
            .catch((error) => {
                resultado.innerHTML = "Erro na busca do CEP. 🚨";
            });
    });
});