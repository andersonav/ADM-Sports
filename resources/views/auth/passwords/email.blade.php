@extends('layouts.login')

@section('content')
<main>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 col-sm-11">
                <!-- Social forgot password form-->
                <div class="card my-5">
                    <div class="card-body p-5 text-center">
                        <div class="h3 font-weight-light mb-0">Recuperação de Senha</div>
                    </div>
                    <hr class="my-0" />
                    <div class="card-body p-5">

                        @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                        @endif

                        <div class="text-center small text-muted mb-4">Insira seu endereço de e-mail abaixo e enviaremos um link para redefinir sua senha.</div>
                        <!-- Forgot password form-->
                        <form method="POST" action="{{ route('password.email') }}">

                            {{ csrf_field() }}

                            <!-- Form Group (email address)-->
                            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                <label class="text-gray-600 small" for="email">Email</label>
                                <input class="form-control form-control-solid" type="email" placeholder="" aria-label="Email" aria-describedby="email" name="email" value="{{ old('email') }}" required autofocus />

                                @if ($errors->has('email'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                                @endif
                            </div>
                            <!-- Form Group (reset password button)    -->
                            <div class="form-group mb-0">

                                <button type="submit" class="btn btn-primary">
                                    Enviar Email
                                </button>
                            </div>
                        </form>
                    </div>
                    <hr class="my-0" />
                    <div class="card-body px-5 py-4">
                        <div class="small text-center">
                            <a href="{{ route('login') }}">Voltar para Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
@endsection