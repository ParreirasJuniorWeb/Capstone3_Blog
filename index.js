import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import methodOverride from "method-override";

// Funções Auxiliares 
import { separarParagrafos } from "./utils/separarParagrafos.js";
import { formatarDataPorExtenso } from "./utils/formatarDataPorExtenso.js";

const app = express();
const port = 3000;

// Configurações e Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); 
app.use(morgan("dev")); 
app.use(methodOverride("_method"));

// Banco de dados em memória
let posts = []; 
const links = [
    { name: "Tecnologia", link: "/?category=Tecnologia" },
    { name: "Saúde", link: "/?category=Saúde" },
    { name: "Cultura", link: "/?category=Cultura" }
];

// Middleware de Autenticação Básica
function autenticador(req, res, next) {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, senha] = Buffer.from(b64auth, 'base64').toString().split(':');
    if (login === 'admin' && senha === '1234') return next();
    res.set('WWW-Authenticate', 'Basic realm="Admin"');
    res.status(401).send('Acesso negado.');
}

// --- ROTAS PÚBLICAS (VITRINE) ---
app.get("/", (req, res) => {
    const cat = req.query.category;
    const filtered = cat ? posts.filter(p => p.label === cat) : posts;
    res.render("Blog.ejs", { links, posts: filtered, categoriaAtiva: cat });
});

app.get("/post/:id", (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    post ? res.render("post.ejs", { post, links }) : res.redirect("/");
});

// --- ROTAS PROTEGIDAS (ADMIN) ---
app.get("/admin", autenticador, (req, res) => {
    res.render("admin.ejs", { links, posts });
});

app.post("/posts", autenticador, (req, res) => {
    const newPost = {
        id: Date.now().toString(),
        title: req.body.title,
        label: req.body.label || "Geral",
        date: formatarDataPorExtenso(new Date().toISOString()),
        writer: req.body.writer,
        article: separarParagrafos(req.body.article)
    };
    posts.push(newPost);
    res.redirect("/admin");
});

app.put("/posts/:id", autenticador, (req, res) => {
    const index = posts.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        posts[index] = { ...posts[index], ...req.body, article: separarParagrafos(req.body.article) };
    }
    res.redirect("/admin");
});

app.delete("/posts/:id", autenticador, (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect("/admin");
});

// Rota para capturar qualquer endereço não definido (404)
app.use((req, res) => {
    res.status(404).render("404.ejs", { 
        links, 
        url: req.originalUrl 
    });
});

app.listen(port, () => console.log(`Rodando em http://localhost:${port}`));

/*

Rotas Dinâmicas: Você aprendeu a usar parâmetros como :id para exibir conteúdos específicos.

Middlewares: Implementamos o method-override para burlar as limitações do HTML e o morgan para monitorar requisições.

Lógica de Negócio vs. Apresentação: Separamos a visão do leitor (Blog.ejs) da visão gerencial (admin.ejs).

Segurança: Aplicamos um middleware de autenticação básica para proteger as rotas de modificação de dados.

Persistência em Memória: Trabalhamos com manipulação de arrays (métodos push, filter, findIndex) para simular o comportamento de um banco de dados.
*/ 