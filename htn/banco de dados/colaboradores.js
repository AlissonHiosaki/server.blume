    // exibição de xml ou js na webpage
    const colaboradores = [
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/Aline.jpg',
            categoria: ['idc'],
            status: 'ATIVO',
            nome: 'ALINE COELHO',
            matricula: '43915',
            cargo: 'OPERADORA DE LOJA',
            setor: 'CAIXA/CREDIARIO',
            dataAdmissao:'29/01/2024',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/alisson.jpeg',
            categoria: ['vm', 'lideres'],
            status: 'ATIVO',
            nome: 'ALISSON HIOSAKI ',
            matricula: '39633 ',
            cargo: 'VISUAL MERCHANDISING ',
            setor: 'VITRINE ',
            dataAdmissao:'26/01/2022 ',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/profile.png',
            categoria: ['idc'],
            status: 'AFASTADA',
            nome: 'APARECIDA CARIOCA ',
            matricula: '42850 ',
            cargo: 'OPERADORA DE LOJA ',
            setor: 'CAIXA/CREDIARIO ',
            dataAdmissao:'01/11/2023',
        },
        {
            foto: 'assets/photos/profile.png',
            categoria: ['vendas'],
            status: 'FERIAS',
            nome: 'CAMILA SALUSTIANO ',
            matricula: '26144 ',
            cargo: 'VENDEDORA ',
            setor: 'VENDAS ',
            dataAdmissao:'26/11/2014 ',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/profile.png',
            categoria: ['idc'],
            status: 'ATIVO',
            nome: 'CRISTIANE BENTO',
            matricula: '45113',
            cargo: 'OPERADORA DE LOJA',
            setor: 'CAIXA/CREDIARIO',
            dataAdmissao:'05/11/2024',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/profile.png',
            categoria: ['vendas'],
            status: 'ATIVO',
            nome: 'EDUARDA GUIMARAES',
            matricula: '44775',
            cargo: 'VENDEDORA',
            setor: 'VENDAS',
            dataAdmissao:'05/09/2024',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/Elis.jpg',
            categoria: ['vendas'],
            status: 'ATIVO',
            nome: 'ELIS PAULA',
            matricula: '42170',
            cargo: 'VENDEDORA',
            setor: 'VENDAS',
            dataAdmissao:'29/05/2023',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/Ester.jpg',
            categoria: ['vendas'],
            status: 'ATIVO',
            nome: 'ESTER LIMA',
            matricula: '43546',
            cargo: 'VENDEDORA',
            setor: 'VENDAS',
            dataAdmissao:'05/12/2023',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/Gabriel.jpg',
            categoria: ['idc'],
            status: 'ATIVO',
            nome: 'GABRIEL SIPRAKI',
            matricula: '41818',
            cargo: 'OPERADOR DE LOJA',
            setor: 'CAIXA/CREDIARIO',
            dataAdmissao:'08/03/2023',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/gabriela.png',
            categoria: ['idc'],
            status: 'ATIVO',
            nome: 'GABRIELA CAMARGO',
            matricula: '42526',
            cargo: 'OPERADORA DE LOJA',
            setor: 'CAIXA/CREDIARIO',
            dataAdmissao:'01/09/2023',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/profile.png',
            categoria: ['idc'],
            status: 'ATIVO',
            nome: 'JANAINA PESSOA',
            matricula: '44986',
            cargo: 'OPERADORA DE LOJA',
            setor: 'CAIXA/CREDIARIO',
            dataAdmissao:'',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/profile.png',
            categoria: ['vendas'],
            status: 'ATIVO',
            nome: 'JASIELE CORDEIRO',
            matricula: '44786',
            cargo: 'VENDEDORA',
            setor: 'VENDAS',
            dataAdmissao:'10/09/2024',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/jessica.jpeg',
            categoria: ['idc','lideres'],
            status: 'AFASTADA',
            nome: 'JESSICA THOMAZ',
            matricula: '21121',
            cargo: 'ANALISTA ADMINISTRATIVO',
            setor: 'ADMINISTRACAO',
            dataAdmissao:'26/11/2012',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/profile.png',
            categoria: ['estoque'],
            status: 'ATIVO',
            nome: 'JOAO SANTOS',
            matricula: '44420',
            cargo: 'ASSISTENTE DE OPERACOES',
            setor: 'ESTOQUE',
            dataAdmissao:'11/06/2024',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/profile.png',
            categoria: ['estoque'],
            status: 'ATIVO',
            nome: 'LAVINIA SEVERINO', 
            matricula: '44456',
            cargo: 'ASSISTENTE DE OPERACOES',
            setor: 'ESTOQUE',
            dataAdmissao:'02/07/2024',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/profile.png',
            categoria: ['vendas'],
            status: 'ATIVO',
            nome: 'LENITA PLACIDO',
            matricula: '42046',
            cargo: 'VENDEDORA',
            setor: 'VENDAS',
            dataAdmissao:'26/04/2023',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/profile.png',
            categoria: ['vendas'],
            status: 'ATIVO',
            nome: 'LEONARDO PEREIRA',
            matricula: '44688',
            cargo: 'VENDEDOR',
            setor: 'VENDAS',
            dataAdmissao:'20/08/2024',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/Maira.jpg',
            categoria: ['estoque'],
            status: 'ATIVO',
            nome: 'MAIRA ANDRADE',
            matricula: '43619',
            cargo: 'ASSISTENTE DE OPERACOES',
            setor: 'ESTOQUE',
            dataAdmissao:'06/12/2023',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/matheus.jpeg',
            categoria: ['gestores'],
            status: 'ATIVO',
            nome: ' MATHEUS DO NASCIMENTO',
            matricula: '44433',
            cargo: 'GERENTE JUNIOR',
            setor: 'GESTORES',
            dataAdmissao:'23/11/2020',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/Mirela.png',
            categoria: ['idc'],
            status: 'ATIVO',
            nome: 'MIRELA FERREIRA',
            matricula: '44790',
            cargo: 'OPERADORA DE LOJA',
            setor: 'CAIXA/CREDIARIO',
            dataAdmissao:'10/09/2024',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/profile.png',
            categoria: ['vendas'],
            status: 'ATIVO',
            nome: 'NAYRIANE ROCHA',
            matricula: '43901',
            cargo: 'VENDEDORA',
            setor: 'VENDAS',
            dataAdmissao:'24/01/2024',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/Rhyan.jpg',
            categoria: ['vendas'],
            status: 'FERIAS',
            nome: 'RHYAN LEMOS',
            matricula: '42066',
            cargo: 'VENDEDOR',
            setor: 'VENDAS',
            dataAdmissao:'27/04/2023',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/profile.png',
            categoria: ['vendas'],
            status: 'ATIVO',
            nome: 'SAMIRA DOS SANTOS',
            matricula: '44414',
            cargo: 'VENDEDORA',
            setor: 'VENDAS',
            dataAdmissao:'10/06/2024',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/sergio.jpg',
            categoria: ['gestores'],
            status: 'ATIVO',
            nome: 'SERGIO MUZIOL',
            matricula: '40926',
            cargo: 'GERENTE',
            setor: 'GESTORES',
            dataAdmissao:'12/05/2017',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/victor.jpeg',
            categoria: ['estoque','lideres'],
            status: 'FERIAS',
            nome: 'VICTOR SILVA',
            matricula: '32036',
            cargo: 'ANALISTA DE OPERACOES',
            setor: 'ESTOQUE',
            dataAdmissao:'06/07/2017',
        },
        {
            foto: 'https://alissonhiosaki.github.io/server.blume/htn/fotos colaboradores/profile.png',
            categoria: ['vendas'],
            status: 'ATIVO',
            nome: 'WARLEY OLIVEIRA',
            matricula: '38777',
            cargo: 'VENDEDOR',
            setor: 'VENDAS',
            dataAdmissao:'16/11/2021',
        },

    ];

   
