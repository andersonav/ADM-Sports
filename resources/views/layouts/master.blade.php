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
    <title>ADM Sports</title>
    <link href="{{asset('assets/css/main.css')}}" rel="stylesheet" />
    <link href="{{asset('assets/css/app.css')}}" rel="stylesheet" />
    <link href="{{asset('assets/css/main/dataTables.bootstrap4.min.css')}}" rel="stylesheet" crossorigin="anonymous" />
    <link href="{{asset('assets/css/main/daterangepicker.css')}}" rel="stylesheet" />
    <link rel="icon" type="image/x-icon" href="{{ asset('assets/img/favicon.png') }}" />
</head>

<body class="nav-fixed">

    <nav class="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white" id="sidenavAccordion">
        <!-- Navbar Brand-->
        <!-- * * Tip * * You can use text or an image for your navbar brand.-->
        <!-- * * * * * * When using an image, we recommend the SVG format.-->
        <!-- * * * * * * Dimensions: Maximum height: 32px, maximum width: 240px-->
        <a class="navbar-brand" href="{{route('home')}}">Administrador</a>
        <!-- Sidenav Toggle Button-->
        <button class="btn btn-icon btn-transparent-dark order-1 order-lg-0 mr-lg-2" id="sidebarToggle"><i data-feather="menu"></i></button>
        <!-- Navbar Items-->
        <ul class="navbar-nav align-items-center ml-auto">
            <!-- Navbar Search Dropdown-->
            <!-- User Dropdown-->
            <li class="nav-item dropdown no-caret mr-3 mr-lg-0 dropdown-user">
                <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="javascript:void(0);" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="img-fluid" src="{{ asset('assets/img/illustrations/profiles/sem-foto.jpg') }}" /></a>
                <div class="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                    <h6 class="dropdown-header d-flex align-items-center">
                        <img class="dropdown-user-img" src="{{ asset('assets/img/illustrations/profiles/sem-foto.jpg') }}" />
                        <div class="dropdown-user-details">
                            <div class="dropdown-user-details-name">{{Auth::user()->name}}</div>
                            <div class="dropdown-user-details-email">{{Auth::user()->email}}</div>
                        </div>
                    </h6>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#!">
                        <div class="dropdown-item-icon"><i data-feather="settings"></i></div>
                        Configurações da Conta
                    </a>
                    <a class="dropdown-item" href="{{ route('logout') }}">
                        <div class="dropdown-item-icon"><i data-feather="log-out"></i></div>
                        Sair
                    </a>
                </div>
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav" ng-app="app">
        <div id="layoutSidenav_nav">
            <nav class="sidenav shadow-right sidenav-light">
                <div class="sidenav-menu">
                    <div class="nav accordion" id="accordionSidenav">
                        <!-- Sidenav Menu Heading (Core)-->
                        <div class="sidenav-menu-heading"></div>
                        <!-- Sidenav Accordion (Dashboard)-->
                        <a class="nav-link{{ (request()->is('home*')) ? '' : ' collapsed' }}" href="javascript:void(0);" data-toggle="collapse" data-target="#collapseDashboards" aria-expanded="false" aria-controls="collapseDashboards">
                            <div class="nav-link-icon"><i data-feather="activity"></i></div>
                            Dashboards
                            <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse{{ (request()->is('home*')) ? ' show' : '' }}" id="collapseDashboards" data-parent="#accordionSidenav">
                            <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                                <a class="nav-link{{ (request()->is('home*')) ? ' active' : '' }}" href="{{route('home')}}">
                                    Padrão
                                </a>
                            </nav>
                        </div>
                        <!-- Sidenav Heading (App Views)-->
                        <div class="sidenav-menu-heading">Funcionalidades</div>
                        <!-- Sidenav Accordion (Pages)-->
                        <a class="nav-link{{ (request()->is('admin/cadastros/*')) ? '' : ' collapsed' }}" href="javascript:void(0);" data-toggle="collapse" data-target="#collapseCadastros" aria-expanded="false" aria-controls="collapseCadastros">
                            <div class="nav-link-icon"><i data-feather="grid"></i></div>
                            Cadastros
                            <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse{{ (request()->is('admin/cadastros/*')) ? 'show' : '' }}" id="collapseCadastros" data-parent="#accordionSidenav">
                            <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">

                                <a class="nav-link{{ (request()->is('admin/cadastros/alunos*')) ? ' active' : '' }}">Alunos</a>

                                <a class="nav-link{{ (request()->is('admin/cadastros/clientes*')) ? ' active' : '' }}" href="{{route('clientes')}}">Clientes</a>
                                <a class="nav-link{{ (request()->is('admin/cadastros/fornecedores*')) ? ' active' : '' }}" href="#!">Fornecedores</a>

                                <a class="nav-link{{ (request()->is('admin/cadastros/tipos-documento*')) ? ' active' : '' }}" href="{{route('tiposDocumento')}}">Tipos de Documento</a>

                                <a class="nav-link{{ (request()->is('admin/cadastros/contas-bancarias*')) ? ' active' : '' }}">Contas Bancárias</a>

                                <!-- Nested Sidenav Accordion (Pages -> Account)-->
                                <a class="nav-link{{ (request()->is('admin/cadastros/modulos-conta*')) ? '' : ' collapsed' }}" href="javascript:void(0);" data-toggle="collapse" data-target="#pagesCollapseAccount" aria-expanded="false" aria-controls="pagesCollapseAccount">
                                    Módulos de Conta
                                    <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse {{ (request()->is('admin/cadastros/modulos-conta*')) ? ' show' : '' }}" id="pagesCollapseAccount" data-parent="#accordionSidenavPagesMenu">
                                    <nav class="sidenav-menu-nested nav">
                                        <a class="nav-link{{ (request()->is('admin/cadastros/modulos-conta/tipos*')) ? ' active' : '' }}" href="{{route('tiposModuloConta')}}">Tipos</a>
                                        <a class="nav-link{{ (request()->is('admin/cadastros/modulos-conta/itens*')) ? ' active' : '' }}" href="{{route('tiposModuloContaItens')}}">Itens</a>
                                        <a class="nav-link{{ (request()->is('admin/cadastros/modulos-conta/inicio*')) ? ' active' : '' }}" href="#!">Configurações</a>
                                    </nav>
                                </div>
                            </nav>
                        </div>

                        <a class="nav-link{{ (request()->is('admin/lancamentos*')) ? ' active' : '' }}" href="#!">
                            <div class="nav-link-icon"><i data-feather="clipboard"></i></div>
                            Lançamentos
                        </a>

                        <!-- Sidenav Heading (Addons)-->
                        <div class="sidenav-menu-heading">Relatórios</div>
                        <!-- Sidenav Link (Charts)-->
                        <a class="nav-link{{ (request()->is('admin/relatorios/fluxo-caixa-diario*')) ? ' active' : '' }}" href="#!">
                            <div class="nav-link-icon"><i data-feather="database"></i></div>
                            Fluxo de Caixa Diário
                        </a>
                        <!-- Sidenav Link (Tables)-->
                        <a class="nav-link{{ (request()->is('admin/relatorios/fluxo-caixa-mensal*')) ? ' active' : '' }}" href="#!">
                            <div class="nav-link-icon"><i data-feather="database"></i></div>
                            Fluxo de Caixa Mensal
                        </a>
                        <!-- Sidenav Link (Tables)-->
                        <a class="nav-link{{ (request()->is('admin/relatorios/capital-giro*')) ? ' active' : '' }}" href="#!">
                            <div class="nav-link-icon"><i data-feather="database"></i></div>
                            Capital de Giro
                        </a>
                        <a class="nav-link{{ (request()->is('admin/relatorios/dre*')) ? ' active' : '' }}" href="#!">
                            <div class="nav-link-icon"><i data-feather="database"></i></div>
                            DRE
                        </a>
                    </div>
                </div>
                <!-- Sidenav Footer-->
                <div class="sidenav-footer">
                    <div class="sidenav-footer-content">
                        <div class="sidenav-footer-subtitle">Logado como:</div>
                        <div class="sidenav-footer-title">{{Auth::user()->name}}</div>
                    </div>
                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content" ng-controller="Ctrl as vm">

            @yield('content')

            <footer class="footer mt-auto footer-light">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 small">Copyright &copy; ADM Sports 2021 - Desenvolvido por Anderson Alves</div>
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

    <div class="baloes"></div>

    <div class="carregando-pagina">
        <div class="progress">
            <div class="progress-bar progress-bar-striped bg-red active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <span class="sr-only"></span>
            </div>
        </div>
    </div>

    <script src="{{ asset('assets/js/main/jquery.min.js')}}" crossorigin="anonymous"></script>
    <script src="{{ asset('assets/js/main/sweetalert.js')}}"></script>
    <script src="{{ asset('assets/js/main/functions.js')}}"></script>
    <script src="{{asset('assets/js/vendors.js')}}"></script>

    <script data-search-pseudo-elements src="{{ asset('assets/js/main/all.min.js')}}"></script>
    <script src="{{ asset('assets/js/main/feather.min.js')}}" crossorigin="anonymous"></script>
    <script src="{{ asset('assets/js/main/bootstrap.bundle.min.js')}}" crossorigin="anonymous"></script>
    <script src="{{ asset('assets/js/main/Chart.min.js')}}"></script>
    <script src="{{ asset('assets/js/main/jquery.dataTables.min.js')}}" crossorigin="anonymous"></script>
    <script src="{{ asset('assets/js/main/dataTables.bootstrap4.min.js')}}" crossorigin="anonymous"></script>
    <script src="{{ asset('assets/js/main/moment.min.js')}}"></script>
    <script src="{{ asset('assets/js/main/moment-pt-br.js')}}"></script>
    <script src="{{ asset('assets/js/main/daterangepicker.min.js')}}"></script>
    <!-- <script src="{{ asset('assets/js/main/date-range-picker-demo.js')}}"></script> -->
    <script src="{{ asset('assets/js/main/scripts.js')}}"></script>

    <script src="{{ asset('assets/js/master.js') }}"></script>
    <script src="{{ asset('assets/js/main/angular-input-masks-standalone.min.js') }}"></script>

    @yield('script')

</body>

</html>