import 'dotenv/config';
import postgres from 'postgres';
import http from 'http';
import { neon } from '@neondatabase/serverless';

// Inicializa a conexão com o banco de dados usando a variável de ambiente para a URL
export const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
  const result = await sql`SELECT version()`;
  const { version } = result[0];
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(version);
};

http.createServer(requestHandler).listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
