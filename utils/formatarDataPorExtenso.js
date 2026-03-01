// Função para formatar data por extenso.
 
export function formatarDataPorExtenso(data) {
    try {
        // Se for string, tenta converter para Date
        if (typeof data === "string" || typeof data === "number") {
            data = new Date(data);
        }

        // Valida se é uma data válida
        if (!(data instanceof Date) || isNaN(data.getTime())) {
            throw new Error("Data inválida");
        }

        // Array com nomes dos meses em português
        const meses = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ];

        const dia = data.getDate();
        const mes = meses[data.getMonth()];
        const ano = data.getFullYear();

        return `${dia} de ${mes} de ${ano}`;
    } catch (erro) {
        return `Erro: ${erro.message}`;
    }
}