@extends('layouts.login')

@section('content')

<main>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 col-sm-11">
                <!-- Social login form-->
                <div class="card my-5">
                    <div class="card-body text-center">
                        <div class="h3 font-weight-light mb-3">Entrar no Sistema</div>

                        <img class="img-fluid" src="{{ asset('assets/img/logo.jpg') }}" style="max-width: 15rem">

                    </div>
                    <hr class="my-0" />
                    <div class="card-body p-5">
                        <!-- Login form-->
                        <form method="POST" action="{{ route('login') }}">

                            {{ csrf_field() }}

                            <!-- Form Group (email address)-->
                            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                <label class="text-gray-600 small" for="email">Email:</label>
                                <input class="form-control" type="email" placeholder="" aria-label="Email" aria-describedby="email" name="email" value="{{ old('email') }}" required autofocus />

                                @if ($errors->has('email'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                                @endif
                            </div>
                            <!-- Form Group (password)-->
                            <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                <label class="text-gray-600 small" for="password">Senha</label>
                                <input class="form-control" type="password" placeholder="" aria-label="Senha" aria-describedby="password" name="password" required />

                                @if ($errors->has('password'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                                @endif
                            </div>
                            <!-- Form Group (login box)-->
                            <div class="form-group d-flex align-items-center justify-content-center mb-0">
                                <button type="submit" class="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

@endsection
