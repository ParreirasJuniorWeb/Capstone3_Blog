// Funções Auxíliares 

// Função para separação de textos em parágrafos.

export function separarParagrafos(texto) {
    try {
        if (typeof texto !== "string") {
            throw new TypeError("O parâmetro deve ser uma string.");
        }

        // Remove espaços extras no início e fim
        const textoLimpo = texto.trim();

        if (textoLimpo.length === 0) {
            return [];
        }

        // Divide por quebras de linha ou por ponto final seguido de espaço
        const paragrafos = textoLimpo
            .split(/\r?\n|\.(?=\s+[A-ZÀ-Ú])/g) // regex para \n, \r\n ou ponto final antes de letra maiúscula
            .map(p => p.trim()) // remove espaços extras
            .filter(p => p.length > 0); // remove entradas vazias

        return paragrafos;
    } catch (erro) {
        console.error("Erro ao separar parágrafos:", erro.message);
        console.log("Erro ao separar parágrafos:", erro.message);
        return [];
    }
}