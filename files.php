<?php
session_start(); // Inicia a sessão para controle de autenticação

// Lista branca de diretórios permitidos
$diretorios_permitidos = [
    __DIR__,                      // Diretório do script
    realpath('/files'),           // Exemplo no Windows
    realpath('/var/www/uploads')  // Exemplo no Linux
];

// Lista de diretórios protegidos por senha (use caminhos absolutos)
$diretorios_protegidos = [
    realpath(__DIR__ . '/AppCodigo') => hash('sha256', '5025Admin@'), // Exemplo: pasta "protegido1" com senha "senha123"
    realpath(__DIR__ . '/AppDataSnap') => hash('sha256', '5025Admin@'), 
    realpath(__DIR__ . '/AppEquipeHTNFront') => hash('sha256', '5025Admin@'), 
    realpath(__DIR__ . '/Apps') => hash('sha256', '5025Admin@'), 
    realpath(__DIR__ . '/intranet') => hash('sha256', '5025Admin@'), 
    realpath(__DIR__ . '/photos') => hash('sha256', '5025Admin@'), 
    realpath(__DIR__ . '/uploads-arquivos') => hash('sha256', '5025Admin@'), 
    // Linhas de teste localhost 
    realpath(__DIR__ . '/Apps') => hash('sha256', '5025Admin@'), 
    realpath(__DIR__ . '/Assets') => hash('sha256', '5025Admin@'), 
    realpath(__DIR__ . '/Downloads') => hash('sha256', '5025Admin@'), 
    realpath(__DIR__ . '/HTML') => hash('sha256', '5025Admin@'), 
    realpath(__DIR__ . '/Windows') => hash('sha256', '5025Admin@'), 
    realpath(__DIR__ . '/teste') => hash('sha256', '5025Admin@'), 
];

// Obtém o diretório atual
$diretorio_atual = isset($_GET['dir']) ? realpath($_GET['dir']) : __DIR__;

// Verifica se o diretório está na lista permitida
$permitido = true;
foreach ($diretorios_permitidos as $permitido_dir) {
    if (strpos($diretorio_atual, $permitido_dir) === 0) {
        $permitido = true;
        break;
    }
}

if (!$permitido) {
    die("Acesso negado!");
}

// Verifica se o diretório é protegido por senha
if (array_key_exists($diretorio_atual, $diretorios_protegidos)) {
    // Se a sessão não estiver autenticada, pede senha
    if (!isset($_SESSION['autenticado'][$diretorio_atual])) {
        if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['senha'])) {
            if (hash('sha256', $_POST['senha']) === $diretorios_protegidos[$diretorio_atual]) {
                $_SESSION['autenticado'][$diretorio_atual] = true;
                header("Location: ?dir=" . urlencode($diretorio_atual)); // Recarrega autenticado
                exit;
            } else {
                echo "<p style='color: red; font-family:sans-serif; text-align: center;'>Senha incorreta!</p>";
            }
        }

        // Formulário de senha
        echo "<h4 style='color: black; font-family:sans-serif; text-align: center; font-size: 50px; margin-top: 100px; color: white; background-color: #4CAF50; padding: 20px; border-radius: 20px;'>🔐 Diretório Protegido</h4>";
        echo "<p style='color: black; font-family:sans-serif; text-align: center; font-size: 35px;'>Digite a senha para acessar este diretório:</p>";
        echo "<form method='post' style='display: flex; justify-content: center; padding: 20px;'>";
        echo "<input style='color: black; outline: none; padding: 30px 35px; border-radius: 20px; border: 1px solid #4CAF50; font-size: 35px; color: #4CAF50; font-weight: bold;' type='password' name='senha' placeholder='🔑 Digite sua senha:' required>";
        echo "<button type='submit' style='margin-top: 10px; margin: 10px; background-color: #4CAF50; border: none; border-radius: 10px; cursor: pointer; padding: 20px 45px; font-size: 30px; color: white;'>Acessar</button>";
        echo "</form>";
        exit;
    }
}

// Verifica se o usuário está tentando sair de um diretório protegido
if (isset($_GET['../']) && !in_array(realpath($_GET['../']), array_keys($diretorios_protegidos))) {
    // Redireciona o usuário para um pedido de senha, caso o diretório não seja mais protegido
    if (isset($_SESSION['autenticado'][$diretorio_atual])) {
        unset($_SESSION['autenticado'][$diretorio_atual]); // Desloga o usuário
        header("Location: ?dir=" . urlencode($diretorio_atual)); // Redireciona para a página inicial
        exit;
    }
}

// Criar nova pasta
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['nova_pasta'])) {
    $nova_pasta = basename($_POST['nova_pasta']); // Evita caracteres perigosos
    $caminho_nova_pasta = $diretorio_atual . '/' . $nova_pasta;

    if (!file_exists($caminho_nova_pasta)) {
        mkdir($caminho_nova_pasta, 0777 , true); //permissao de cria pasta com permissao 0777 somente leitura e escrita 755
        echo "Pasta criada com sucesso!";
    } else {
        echo "Erro: A pasta já existe.";
    }
}

// Upload de arquivos
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['arquivo'])) {
    $arquivo = $_FILES['arquivo'];
    $destino = $diretorio_atual . '/' . basename($arquivo['name']);

    if (move_uploaded_file($arquivo['tmp_name'], $destino)) {
        echo "Arquivo enviado com sucesso!";
    } else {
        echo "Erro ao enviar arquivo.";
    }
}

// Exclusão de arquivos com senha
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['delete_files']) && isset($_POST['senha'])) {
    $senha_correta = hash('sha256', '5025Admin@');
    
    if (hash('sha256', $_POST['senha']) !== $senha_correta) {
        echo "Senha incorreta!";
        exit;
    }

    foreach ($_POST['delete_files'] as $arquivo) {
        $arquivo_para_excluir = realpath($diretorio_atual . '/' . $arquivo);
        if (strpos($arquivo_para_excluir, $diretorio_atual) === 0 && is_file($arquivo_para_excluir)) {
            unlink($arquivo_para_excluir);
        }
    }

    echo "Arquivos excluídos com sucesso!";
    exit;
}



// Visualização de arquivos
if (isset($_GET['view'])) {
    $arquivo_para_visualizar = realpath($diretorio_atual . '/' . $_GET['view']);
    
    if (strpos($arquivo_para_visualizar, $diretorio_atual) === 0 && is_file($arquivo_para_visualizar)) {
        $mime_type = mime_content_type($arquivo_para_visualizar);
        
        // Tipos de arquivos suportados para visualização
        $tipos_permitidos = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];

        if (in_array($mime_type, $tipos_permitidos)) {
            header("Content-Type: $mime_type");
            readfile($arquivo_para_visualizar);
            exit;
        } else {
            echo "Este tipo de arquivo não pode ser visualizado.";
            exit;
        }
    } else {
        echo "Arquivo não encontrado.";
        exit;
    }
}

// Download de arquivos
if (isset($_GET['download'])) {
    $arquivo_para_download = realpath($diretorio_atual . '/' . $_GET['download']);
    
    if (strpos($arquivo_para_download, $diretorio_atual) === 0 && is_file($arquivo_para_download)) {
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . basename($arquivo_para_download) . '"');
        readfile($arquivo_para_download);
        exit;
    } else {
        echo "Arquivo não encontrado.";
    }
}

// Listagem de arquivos e diretórios
$arquivos = array_diff
(scandir($diretorio_atual), ['.', '.']);

$pastas = [];
$arquivos_lista = [];

// Separar diretórios e arquivos
foreach ($arquivos as $arquivo) {
    $caminho = $diretorio_atual . '/' . $arquivo;
    if (is_dir($caminho)) {
        $pastas[] = $arquivo;
    } elseif (is_file($caminho)) {
        $arquivos_lista[] = $arquivo;
    }
}

?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"/>
    <link rel="shortcut icon" href="https://intranet-hiosaki.com/icons/filebrowser.svg" type="image/x-icon">
    <script src="../src/files/script.js"></script>
    <title>Server | Hiosaki</title>
</head>
<body>
    <h2>Navegue pelos Arquivos</h2>

    <p class="arquivo1"><strong>Diretório atual:</strong> 
    <?php echo $diretorio_atual; ?></p>
    
    <div class="bar">
    <h3>Criar Nova Pasta</h3>
    <form action="" method="post">
        <input class="criar" type="text" name="nova_pasta" placeholder="Nome da pasta" required>
        <button class="criar-btn" type="submit">Criar</button>
    </form>
    <form id="delete-form" method="post">
    <input class="criar" type="password" name="senha" placeholder="Digite a senha" required>
    <button class="criar-btn" type="submit">
    <i class="bi bi-trash"></i>
    </button>
</form>
    <h3>Upload de Arquivo</h3>
    <form id="upload-form" action="" method="post" enctype="multipart/form-data">
        <label for="upload-arquivo" class="upload-label"><i class="bi bi-cloud-arrow-up"></i></label>
        <input id="upload-arquivo" class="upload" type="file" name="arquivo" required>
        <button type="button" class="btn-upload" onclick="abrirModal()">Enviar</button>
    </form>
</div>
    <!-- Link para voltar um diretório -->
    <?php if ($diretorio_atual !== __DIR__): ?>
        <p><a href="?dir=<?php echo urlencode(dirname($diretorio_atual)); ?>">⬆ Voltar</a></p>
    <?php endif; ?>

    <ul>
<!-- Listando diretórios primeiro -->
<?php foreach ($pastas as $pasta): ?>
    <?php
    $caminho_pasta = $diretorio_atual . '/' . $pasta;
    $data_modificacao = date("d/m/Y H:i:s", 
     filemtime($caminho_pasta));
    ?>
    <li class="diretorio">
        <a href="?dir=<?php echo urlencode($caminho_pasta); ?>">📁 <?php echo $pasta; ?></a>
        <span class="txt"> - Você editou em: <?php echo $data_modificacao; ?></span>
        <span class="txt2"> -  <?php echo $data_modificacao; ?></span>
    </li> <style>
      .txt{
        font-size: 16px;
        color: black;
      }
      .txt2{
        display: none;
      }
    </style>
<?php endforeach; ?>

<!-- Listando arquivos depois -->


<ul>
<?php foreach ($arquivos_lista as $arquivo): ?>
    <?php $caminho_arquivo = $diretorio_atual . '/' . $arquivo; ?>
    <li class="btn-dir">
        <input type="checkbox" class="file-checkbox" value="<?php echo $arquivo; ?>">
        <p class="arquivo">📄 <?php echo $arquivo; ?></p>
        <a href="?view=<?php echo urlencode($arquivo); ?>&dir=<?php echo urlencode($diretorio_atual); ?>"><i class="bi bi-eye-fill"></i></a>
        <a href="?download=<?php echo urlencode($arquivo); ?>&dir=<?php echo urlencode($diretorio_atual); ?>"><i class="bi bi-cloud-download"></i></a>
    </li>
<?php endforeach; ?>
</ul>

<script>
document.getElementById('delete-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let selectedFiles = document.querySelectorAll('.file-checkbox:checked');
    if (selectedFiles.length === 0) {
        alert('Nenhum arquivo selecionado para exclusão.');
        return;
    }

    let formData = new FormData(this);
    selectedFiles.forEach(file => {
        formData.append('delete_files[]', file.value);
    });

    fetch('', { method: 'POST', body: formData })
        .then(response => response.text())
        .then(result => {
            alert(result);
            location.reload();
        });
});
</script>

    </ul>
 <!-- Modal de senha -->
 <div id="senha-modal" class="modal">
        <div class="modal-content">
            <h4>Digite a senha para continuar</h4>
            <input type="password" id="senha" placeholder="Senha">
            <button onclick="verificarSenha()">Confirmar</button>
        </div>
    </div>

</body>
</html>

<style>
        @media screen and (max-width: 800px) {
            .excluir{
            border: none;
            display: flex;
            padding: 10px 10px;
            width: 70px;
            margin-left: -10px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            outline: none;
        }
        ul {
        list-style-type: none;
        padding: 0;
    }
    .txt{
        display: none;
    }
    .txt2{
        font-size: 14px;
        display: block;
      }
    .btn-dir {
        background: white;
        margin: 5px 0;
        padding: 10px 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
    .diretorio a{
        font-size: 12.5px;
        margin-left: -5px
    }
    .btn-dir a {
        text-decoration: none;
        color: #007bff;
        font-weight: bold;
        font-size: 15px;
        margin-left: 10px;
        transition: all 0.3s ease;
    }

    .btn-dir a:hover {
        text-decoration: underline;
        transform: scale(1.1);
    }
    .arquivo{
        font-size: 15px;
        margin-right: -20px;
        color: black;
    }
    .arquivo1{
        color: #007bff;
        font-size: 12px;
    }
    .arquivo1 > strong{
        color: black;
        font-size: 17px;
    }
    
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 20px;
        padding: 20px 200px;
        width: 90%;

    }
    .criar{
        outline: none;
        padding: 10px 10px;
        border: 1px solid white;
        transition: all 0.3s ease;
    }
    .criar:focus{
        border-block-end: 1px solid #007bff;
        animation-delay: 2ms;
        }
        h3{
            margin-top: 10px;
        }

.upload {
    display: none; /* Esconde o input padrão */
}

.upload-label {
    background: #4CAF50;
    color: white;
    padding: 10px 50px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    transition: background 0.3s ease;
    margin-left: 20px;

}

.upload-label:hover {
    background: #45a049;
}
.btn-upload {
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    margin-left: 50px;
    transition: background 0.3s ease;
}

.btn-upload:hover {
    background: #0056b3;
}

i{
    margin: -2px;
    position: relative;
}

    }
    </style>

<style>
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 20px;
        padding: 20px;
    }
    h4{
        color: #333;
        font-family: sans-serif;
        font-size: 50px;
    }
    h2 {
        color: #333;
        font-family: sans-serif;
    }

    p {
        font-size: 16px;
    }
    .bar{
        display: ;
    }
    .criar{
        outline: none;
        padding: 20px 10px;
        border: 1px solid white;
        transition: all 0.3s ease;
        align-items: center;
        justify-content: center;
    }
    .criar:focus{
        border-block-end: 1px solid #007bff;
        animation-delay: 2ms;
        }
        h3{
            margin-top: 10px;
        }

.upload {
    display: none; /* Esconde o input padrão */
}

.upload-label {
    background: #4CAF50;
    color: white;
    padding: 10px 50px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    transition: background 0.3s ease;
    margin-left: auto;
}

.upload-label:hover {
    background: #45a049;
}
.btn-upload {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    margin-left: 50px;
    transition: background 0.3s ease;
}

.btn-upload:hover {
    background: #0056b3;
}

i{
    margin: -2px;
    position: relative;
}
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        background: white;
        margin: 5px 0;
        padding: 10px;
        border-radius: 5px;
        display: flex;
        align-items: start;
        justify-content: space-between;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    li a {
        text-decoration: none;
        color: #007bff;
        font-weight: bold;
        font-size: auto;
        margin-left: 10px;
        transition: all 0.3s ease;
    }

    li a:hover {
        text-decoration: underline;
        transform: scale(1.1);
    }
    .arquivo{
        font-size: 15px auto;
        display: block;
        justify-content: start;
        justify-items: start;
        color: black;
        align-items: start;
    }
    .arquivo1{
        color: #007bff;
        font-size: 10px;
    }
    .arquivo1 > strong{
        color: black;
        font-size: 15px;
    }

    form {
        margin-top: 20px;
        padding: 10px;
        background: white;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    input[type="file"] {
        padding: 5px;
    }
    .criar-btn{
        background: #28a745;
        color: white;
        border: none;
        padding: 10px;
        width: 55px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    .criar-btn:hover {
        background: #218838;
    }

    .danger {
        color: red;
        font-weight: bold;
    }
     /* Estilização do modal */
     .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .modal input {
            width: 90%;
            padding: 8px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .modal button {
            margin-top: 10px;
            padding: 8px 12px;
            border: none;
            background: #007bff;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }

        .modal button:hover {
            background: #0056b3;
        }
</style>

