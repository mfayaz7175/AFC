<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\EmailCheckController;
use App\Http\Controllers\ManageRefController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\MintController;
use App\Http\Controllers\HelpEntryController;
use App\Http\Controllers\AdController;
use App\Http\Controllers\NotifyController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ICOController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\App;


Route::post('/locale', function (Request $request) {
    $locale = $request->input('locale');

    if (!in_array($locale, ['en', 'fa', 'ps'])) {
        return response()->json(['message' => 'Invalid language'], 400);
    }

    // Store in session
    Session::put('locale', $locale);

    // Store in user preferences if authenticated
    if (auth()->check()) {
        auth()->user()->update(['locale' => $locale]);
    }

    App::setLocale($locale);

    // Use Inertia::location to trigger a full reload
    return Inertia::location(url()->previous());
})->name('locale.switch');

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    Route::get('/afc', fn() => Inertia::render('Afc'))->name('afc');
    Route::get('/mint', [MintController::class, 'index'])->name('mint');
    Route::get('/transfer', fn() => Inertia::render('Smart/JsCode/TransferPage'))->name('transfer');
    Route::get('/approve', fn() => Inertia::render('Smart/JsCode/ApprovePage'))->name('approve');
    Route::get('/burn', fn() => Inertia::render('Smart/JsCode/BurnPage'))->name('burn');
    Route::get('/transferFrom', fn() => Inertia::render('Smart/JsCode/TransferFromPage'))->name('transferFrom');
    Route::get('/allowance', fn() => Inertia::render('Smart/JsCode/AllowancePage'))->name('allowance');
    Route::get('/freeze', fn() => Inertia::render('Smart/JsCode/FreezePage'))->name('freeze');
    Route::get('/pause', fn() => Inertia::render('Smart/JsCode/PausePage'))->name('pause');
    Route::get('/settings', fn() => Inertia::render('Dashboard/Settings'))->name('settings');
    Route::get('/notify', fn() => Inertia::render('Dashboard/Notify'))->name('notify');
    Route::get('/ico', fn() => Inertia::render('Smart/JsCode/Ico'))->name('ico');
    Route::get('/ico/buy', fn() => Inertia::render('Smart/JsCode/ico/BuyAfCoin'))->name('ico.buy');
    Route::post('/ico/store', [ICOController::class, 'store'])->name('ico.store');
    Route::get('/ico/stats', [ICOController::class, 'stats'])->name('ico.stats');
    Route::get('/advance', fn() => Inertia::render('Dashboard/AdvancedFeaturesPage'))->name('advance');
    Route::get('/chat', fn() => Inertia::render('Dashboard/ChatBotPage'))->name('chat');
    Route::get('/manageRef', [ManageRefController::class, 'index'])->name('manageRef');
    Route::get('/privacyPolicy', fn() => Inertia::render('Dashboard/PrivacyPolicy'))->name('privacyPolicy');

    // ######### FOR REFERENCES AND QUESTIONS #########
    Route::middleware('can:viewAdminPanel')->group(function () {
        Route::post('/manage-ref/reference', [ManageRefController::class, 'storeReference'])->name('manage.ref.storeReference');
        Route::delete('/manage-ref/reference/{reference}', [ManageRefController::class, 'destroyReference'])->name('manage.ref.destroyReference');
        Route::put('/manage-ref/reference/{reference}', [ManageRefController::class, 'updateReference'])->name('manage.ref.updateReference');
        Route::post('/manage-ref/question', [ManageRefController::class, 'storeQuestion'])->name('manage.ref.storeQuestion');
        Route::delete('/manage-ref/question/{question}', [ManageRefController::class, 'destroyQuestion'])->name('manage.ref.destroyQuestion');
        Route::put('/manage-ref/question/{question}', [ManageRefController::class, 'updateQuestion'])->name('manage.ref.updateQuestion');
        Route::put('/manage-ref/reference/{reference}/toggle-status', [ManageRefController::class, 'toggleStatus'])->name('manage.ref.toggleStatus');
    });

    // ######### FOR News #########
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::resource('news', NewsController::class)->except(['show']);
        Route::resource('ad',AdController::class)->except(['show']);
        Route::get('/ad/{id}',[AdController::class,'show']);
        Route::get('showAd',[AdController::class,'ShowAd'])->name('ad.showAd');
        Route::get('cardAd',[AdController::class,'CardAd'])->name('ad.cardAd');
        Route::resource('notify', NotifyController::class);
    });
    Route::resource('user', UserController::class);
});

// ####################### For Help_Entries ############################
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/help', [\App\Http\Controllers\HelpEntryController::class, 'index'])->name('help');
    Route::post('/help/entry', [HelpEntryController::class, 'store'])
         ->name('help.entry.store');
});
Route::middleware(['auth', 'can:viewAdminPanel'])->group(function () {
    Route::put('/help/entry/{entry}', [HelpEntryController::class, 'update'])
         ->name('help.entry.update');
    Route::delete('/help/entry/{entry}', [HelpEntryController::class, 'destroy'])
         ->name('help.entry.destroy');
});

// @@@@@@@@@@@@@@@@@@@@ For Tutorials @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/help/tutorials', function () {
        return \App\Models\Tutorial::orderBy('created_at', 'desc')->paginate(6);
    })->name('help.tutorials.index');
});

// Admin-only routes for tutorials
Route::middleware(['auth', 'can:viewAdminPanel'])->group(function () {
    Route::post('/help/tutorial', [\App\Http\Controllers\TutorialController::class, 'store'])->name('help.tutorial.store');
    Route::put('/help/tutorial/{tutorial}', [\App\Http\Controllers\TutorialController::class, 'update'])->name('help.tutorial.update');
    Route::delete('/help/tutorial/{tutorial}', [\App\Http\Controllers\TutorialController::class, 'destroy'])->name('help.tutorial.destroy');
});

// @@@@@@@@@@@@@@@@@@@@ For Contact Support @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// For authenticated users to submit a contact support request
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/help/contact', [\App\Http\Controllers\SupportEmailController::class, 'store'])
         ->name('help.contact.store');
});

// For admin: view and manage support emails
Route::middleware(['auth', 'can:viewAdminPanel'])->group(function () {
    Route::get('/help/emails', [\App\Http\Controllers\SupportEmailController::class, 'index'])
         ->name('help.emails.index');
    Route::delete('/help/email/{email}', [\App\Http\Controllers\SupportEmailController::class, 'destroy'])
         ->name('help.email.destroy');
    Route::put('/help/email/{email}/read', [\App\Http\Controllers\SupportEmailController::class, 'markAsRead'])
         ->name('help.email.markAsRead');
    Route::get('/help/emails/unread-count', [\App\Http\Controllers\SupportEmailController::class, 'unreadCount'])->name('help.emails.unreadCount');
});




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware('can:viewAdminPanel')->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
});
Route::post('/check-email', [EmailCheckController::class, 'checkEmail']);
Route::get('/search', [SearchController::class, 'index']);

Route::get('/global-ads', [AdController::class, 'globalAds']);


require __DIR__.'/auth.php';
