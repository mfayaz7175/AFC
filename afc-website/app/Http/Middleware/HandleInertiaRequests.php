<?php

namespace App\Http\Middleware;

use App\Models\Notify;
use App\Models\SupportEmail;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Middleware;
use Illuminate\Support\Facades\App;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    // public function handle($request, Closure $next) {
    //     Inertia::share([
    //         'sharevalue' => 'share message',
    //     ]);
    //     return $next($request);
    // }



    public function share(Request $request): array
    {

        // Determine the locale:
        if ($request->user() && $request->user()->locale) {
            $locale = $request->user()->locale;
        } elseif ($request->session()->has('locale')) {
            $locale = $request->session()->get('locale');
        } else {
            $locale = config('app.locale');
        }
        
        // Set the locale for the current request
        App::setLocale($locale);


        $user = auth()->user();
        if($user){
            $unreadNotifis = DB::table('notifies')
            ->whereNotIn('id',function($query)
                use ($user){
                    $query->select('notif_id')
                            ->from('notifycount')
                            ->where('by_user', $user->id);
                })->count();
        }else{
            $unreadNotifis = 0;
        }
        return array_merge(parent::share($request), [
            'm' => $unreadNotifis,
            'auth' => [
                'user' => $request->user(),
                'can'  => [
                    'viewAdminPanel' => $request->user() ? $request->user()->can('viewAdminPanel') : false,
                    'viewFirstUserPanel' => $request->user() ? $request->user()->can('viewFirstUserPanel') : false,
                    'viewSecondUserPanel' => $request->user() ? $request->user()->can('viewSecondUserPanel') : false,
                ],
            ],
            'csrf_token' => csrf_token(),
            'unreadSupportCount' => $request->user() && $request->user()->can('viewAdminPanel')
                ? SupportEmail::where('read', false)->count()
                : 0,
                'locale'             => $locale,
                'availableLocales'   => ['en', 'fa', 'ps'],
               
        ]);
    }
}
