<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="Controle de Caixa para ADM Sports" />
    <meta name="author" content="Anderson Alves Bezerra" />
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Erro</title>
    <link href="{{asset('assets/css/main/main.css')}}" rel="stylesheet" />
    <link rel="icon" type="image/x-icon" href="{{ asset('assets/img/favicon.png') }}" />
    <script src="{{asset('assets/js/vendors.js')}}"></script>
</head>

<body class="">

    <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <div id="layoutError_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-6">
                                <div class="text-center mt-4">
                                    <img class="img-fluid p-4" style="max-width: 50% !important;" src="{{ asset('assets/img/pdv/error.png') }}" alt="" />
                                    <h3>Erro {{$codeError}}</h3>
                                    <p class="lead">{{$message}}</p>
                                    <a class="text-arrow-icon" href="{{route('home')}}">
                                        <i class="ml-0 mr-1" data-feather="arrow-left"></i>
                                        Retornar para página inicial
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <div id="layoutAuthentication_footer">
            <footer class="footer mt-auto footer-dark">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 small">Copyright &copy; ADM Sports - Desenvolvido por Anderson Alves</div>
                        <div class="col-md-6 text-md-right small">
                            <a href="#!">Política de Privacidade</a>
                            &middot;
                            <a href="#!">Termos &amp; Condições</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>

</body>

</html>