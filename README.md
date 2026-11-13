# Anagrama Live — RDM Studio

Jogo independente do site RDM Studio. `index.html` é o tabuleiro/cena do OBS; `painel.html` é o painel Host. O código e a lista própria de puzzles ficam neste repositório.

## Publicação

O site esperado é `https://462juvino.github.io/ANAGRAMA_RDM/`. A Page deste repositório precisa usar `main` e a pasta raiz (`/`). Os arquivos são estáticos; não exigem build nem segredo de API no deploy.

## Conexões

- TikTok: TikFinity local em `127.0.0.1:21213`; se indisponível, tenta o fallback em nuvem com o usuário TikTok indicado no painel.
- YouTube: Streamer.bot local em `127.0.0.1:8080`, ouvindo `Message` e `SuperChat`. TikTok e YouTube podem funcionar separadamente ou juntos.
- Deixe a página do jogo aberta no computador dos conectores e use o link de cena do painel como Browser Source do OBS.
- O painel permite mapear, opcionalmente, um nome exato de presente TikTok e um valor mínimo de Super Chat para adicionar tempo/revelar letra/revelar palavra. Essas ações ficam desligadas por padrão; o valor é comparado na moeda enviada pelo Streamer.bot, sem conversão.

O banco em `puzzles.js` é próprio; `engine.js` valida as letras e suas quantidades. A tela ignora palavras repetidas e processa a fila sequencialmente, com 1,5 segundo entre tentativas. Não foram copiados puzzles, textos ou identidade visual do Coquetel.
