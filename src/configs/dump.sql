-- Criar o banco de dados
CREATE DATABASE dindin;


-- Criar o tipo ENUM tipo_transacao
CREATE TYPE tipo_transacao AS ENUM('saida', 'entrada');

-- Criar a tabela usuarios
CREATE TABLE usuarios (
    id BIGSERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
);

-- Criar a tabela categorias
CREATE TABLE categorias (
    id BIGSERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
);

-- Inserir as categorias
INSERT INTO categorias (descricao) VALUES
    ('Alimentação'),
    ('Assinaturas e Serviços'),
    ('Casa'),
    ('Mercado'),
    ('Cuidados Pessoais'),
    ('Educação'),
    ('Família'),
    ('Lazer'),
    ('Pets'),
    ('Presentes'),
    ('Roupas'),
    ('Saúde'),
    ('Transporte'),
    ('Salário'),
    ('Vendas'),
    ('Outras receitas'),
    ('Outras despesas');

-- Criar a tabela transacoes
CREATE TABLE transacoes (
    id BIGSERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    valor NUMERIC NOT NULL,
    data DATE NOT NULL,
    categoria_id INT REFERENCES categorias(id),
    usuario_id INT REFERENCES usuarios(id),
    tipo tipo_transacao NOT NULL
);

-- Alterando o tipo de dados da coluna data da tabela transações
-- para timestamp with time zone

ALTER TABLE transacoes
ALTER COLUMN data TYPE timestamp without time zone;


--Alterando o campo valor para receber valores inteiros maiores.
ALTER TABLE transacoes ALTER COLUMN valor TYPE BIGINT;