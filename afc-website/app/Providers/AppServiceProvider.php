<?php

namespace App\Providers;

use App\Policies\AdminPanelPolicy;
use App\Policies\FirstUserPolicy;
use App\Policies\SecondUserPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Lang;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // You can register additional services here.
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Define the gates for the different panels.
        Gate::define('viewAdminPanel', [AdminPanelPolicy::class, 'viewAdminPanel']);
        Gate::define('viewFirstUserPanel', [FirstUserPolicy::class, 'viewFirstUserPanel']);
        Gate::define('viewSecondUserPanel', [SecondUserPolicy::class, 'viewSecondUserPanel']);

        // Share common data with Inertia.
        Inertia::share([
            'flash' => function () {
                return [
                    'message' => session('message'),
                    'success' => session('success'),
                ];
            },
            'translations' => function () {
                return Lang::get('messages');
            },
            'locale' => app()->getLocale(),
        ]);
    }
}



// namespace App\Providers;

// use App\Models\Product; // If not used, you may remove this import
// use App\Policies\AdminPanelPolicy;
// use App\Policies\FirstUserPolicy;
// use App\Policies\SecondUserPolicy;
// use Illuminate\Support\Facades\Gate;
// use Illuminate\Support\ServiceProvider;
// use Inertia\Inertia;
// use Illuminate\Support\Facades\Lang;

// class AppServiceProvider extends ServiceProvider
// {
//     /**
//      * Register any application services.
//      */
//     public function register(): void
//     {
//         //
//     }

//     /**
//      * Bootstrap any application services.
//      */
//     public function boot(): void
//     {
//         // Define gates for the admin and user panels.
//         Gate::define('viewAdminPanel', [AdminPanelPolicy::class, 'viewAdminPanel']);
//         Gate::define('viewFirstUserPanel', [FirstUserPolicy::class, 'viewFirstUserPanel']);
//         Gate::define('viewSecondUserPanel', [SecondUserPolicy::class, 'viewSecondUserPanel']);
//         Inertia::share([
//             'translations' => function () {
//                 return Lang::get('messages');
//             },
//             'locale' => function () {
//                 return app()->getLocale();
//             },
//         ]);

//     }
// }





// namespace App\Providers;

// use App\Models\Product; // If not used, you may remove this import
// use App\Policies\AdminPanelPolicy;
// use App\Policies\FirstUserPolicy;
// use App\Policies\SecondUserPolicy;
// use Illuminate\Support\Facades\Gate;
// use Illuminate\Support\ServiceProvider;
// use Inertia\Inertia;
// use Illuminate\Support\Facades\Lang;

// class AppServiceProvider extends ServiceProvider
// {
//     /**
//      * Register any application services.
//      */
//     public function register(): void
//     {
//         //
//     }

//     /**
//      * Bootstrap any application services.
//      */
//     public function boot(): void
//     {
//         // If a locale is set in the session, apply it
//         if (session()->has('locale') && in_array(session('locale'), ['en', 'fa', 'ps'])) {
//             app()->setLocale(session('locale'));
//         }

//         // Define gates for the admin and user panels.
//         Gate::define('viewAdminPanel', [AdminPanelPolicy::class, 'viewAdminPanel']);
//         Gate::define('viewFirstUserPanel', [FirstUserPolicy::class, 'viewFirstUserPanel']);
//         Gate::define('viewSecondUserPanel', [SecondUserPolicy::class, 'viewSecondUserPanel']);

//         // Share translations and locale with Inertia
//         Inertia::share([
//             'translations' => function () {
//                 return Lang::get('messages');
//             },
//             'locale' => app()->getLocale(),
//         ]);
//     }
// }

