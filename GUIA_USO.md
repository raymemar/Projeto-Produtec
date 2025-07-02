# Sistema de Edição da Homepage - Guia Rápido

## Como usar o sistema:

### 1. **Login como Administrador**
- Na homepage, role até o final da página
- Clique em "Login Adm" no footer
- Use as credenciais:
  - **Usuário:** `adm-fulano`
  - **Senha:** `12345adm`

### 2. **Após o Login**
- **NÃO há redirecionamento** - você permanece na mesma página
- Uma **barra de administração** aparece no topo da página
- Todos os textos ficam **editáveis** (aparecem com bordas quando você passa o mouse)

### 3. **Editar Textos**
- Clique em qualquer texto da página
- Digite o novo conteúdo
- Pressione Enter para salvar
- ESC para cancelar

### 4. **Editar Galeria "Nossa jornada em fotos"**
- Role até a seção "Nossa jornada em fotos"
- Quando logado como admin, aparece um botão **"+ Adicionar Foto"**
- Clique no botão para abrir o popup

### 5. **Popup de Adicionar Foto**
O popup contém os campos:
- **URL da Imagem:** Cole o link da imagem
- **Título:** Escreva um título para a foto
- **Descrição:** Adicione uma descrição
- **Texto Alt:** (opcional) Para acessibilidade
- **Preview:** A imagem aparece automaticamente quando você cola a URL

### 6. **Ferramentas de Admin**
Na barra de administração no topo:
- **Painel:** Vai para o painel administrativo
- **Backup:** Salva os dados
- **Reset:** Restaura dados padrão
- **Logout:** Sai do modo de edição

### 7. **Persistência**
- Todas as alterações são salvas automaticamente no navegador
- Os dados persistem mesmo após fechar e abrir o navegador

## Tecnologia Implementada:
- ✅ Sistema de autenticação fake
- ✅ Edição inline de textos
- ✅ Galeria editável com popup
- ✅ Preview de imagens
- ✅ Persistência local (localStorage)
- ✅ Barra de ferramentas de admin
- ✅ Design responsivo

## Para executar:
```bash
npm run dev
```

Acesse http://localhost:5173 e teste o sistema!
