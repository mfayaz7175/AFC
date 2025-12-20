<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Return a JSON list of [{ name, uri }] for pages whose
     * display-name or keywords contain the query string.
     */
//     public function index(Request $request)
//     {
//         $query = strtolower($request->input('q', ''));

//         // Define searchable pages with rich keywords
//         $pages = [
//             ['name' => 'Dashboard page', 'uri' => 'dashboard', 'keywords' => ['home', 'main', 'dashboard']],
//             ['name' => 'AFC', 'uri' => 'afc', 'keywords' => ['afc', 'afcoin']],
//             ['name' => 'Mint page', 'uri' => 'mint', 'keywords' => ['mint', 'create coin', 'generate token']],
//             ['name' => 'Transfer page', 'uri' => 'transfer', 'keywords' => ['send', 'transfer', 'move coin']],
//             ['name' => 'Approve page', 'uri' => 'approve', 'keywords' => ['approve', 'permission']],
//             ['name' => 'Burn page', 'uri' => 'burn', 'keywords' => ['burn', 'destroy token']],
//             ['name' => 'Transfer From page', 'uri' => 'transferFrom', 'keywords' => ['transfer from', 'send on behalf']],
//             ['name' => 'Allowance page', 'uri' => 'allowance', 'keywords' => ['allowance', 'spending limit']],
//             ['name' => 'Freeze page', 'uri' => 'freeze', 'keywords' => ['freeze', 'lock token']],
//             ['name' => 'Pause page', 'uri' => 'pause', 'keywords' => ['pause', 'halt transactions']],

//             // Settings page with comprehensive keywords
//             ['name' => 'Settings page', 'uri' => 'settings', 'keywords' => [
//                 'settings', 'change password', 'update email', 'account settings', 'edit account',
//                 'security', 'user info', 'change email', 'preferences', 'account info',
//                 'profile settings', 'update profile', 'email change', 'password change', 'login settings',
//                 'security settings', 'authentication', 'account update', 'user settings', 'account'
//             ]],

//             ['name' => 'Notify page', 'uri' => 'notify', 'keywords' => ['notifications', 'notify', 'alerts']],
//             ['name' => 'ICO (Initial Coin Offering) page', 'uri' => 'ico', 'keywords' => ['ico', 'initial coin offering', 'public sale']],
//             ['name' => 'Advanced Features page', 'uri' => 'advance', 'keywords' => ['advanced', 'extra features']],
//             ['name' => 'ChatBot page', 'uri' => 'chat', 'keywords' => ['chatbot', 'chat', 'support']],
//             ['name' => 'Manage References page', 'uri' => 'manageRef', 'keywords' => ['references', 'manage references']],
//             ['name' => 'News page', 'uri' => 'news.index', 'keywords' => ['news', 'latest updates']],
//             ['name' => 'Ads page', 'uri' => 'ad.index', 'keywords' => ['ads', 'advertisements']],
//             ['name' => 'Show Ad page', 'uri' => 'ad.showAd', 'keywords' => ['show ad', 'view ad']],
//             ['name' => 'Help page', 'uri' => 'help', 'keywords' => ['help', 'support', 'faq']],
//             ['name' => 'Privacy Policy page', 'uri' => 'privacyPolicy', 'keywords' => ['privacy', 'policy', 'data']],
//             ['name' => 'Profile page', 'uri' => 'profile.edit', 'keywords' => ['profile', 'edit profile', 'user info']],
//         ];

//         // Filter pages based on keyword match or name match
//         $results = collect($pages)
//             ->filter(function ($page) use ($query) {
//                 $nameMatch = str_contains(strtolower($page['name']), $query);
//                 $keywordMatch = isset($page['keywords']) && collect($page['keywords'])->contains(function ($keyword) use ($query) {
//                     return str_contains(strtolower($keyword), $query);
//                 });
//                 return $nameMatch || $keywordMatch;
//             })
//             ->values()
//             ->all();

//         return response()->json($results);
//     }
// }
public function index(Request $request)
{
    $query = strtolower(trim($request->input('q', '')));

    // Return early if the query is empty
    if ($query === '') {
        return response()->json([]);
    }

    $pages = [
        ['name' => 'Dashboard page', 'uri' => 'dashboard', 'keywords' => ['home', 'main', 'dashboard', 'خانه', 'داشبورد']],
        ['name' => 'AFC', 'uri' => 'afc', 'keywords' => ['afc', 'afcoin', 'ای اف سی', 'ای اف کوین']],
        ['name' => 'Mint page', 'uri' => 'mint', 'keywords' => ['mint', 'create coin', 'generate token', 'ایجاد سکه', 'ساخت توکن']],
        ['name' => 'Transfer page', 'uri' => 'transfer', 'keywords' => ['send', 'transfer', 'move coin', 'انتقال', 'ارسال سکه']],
        ['name' => 'Approve page', 'uri' => 'approve', 'keywords' => ['approve', 'permission', 'تایید', 'اجازه']],
        ['name' => 'Burn page', 'uri' => 'burn', 'keywords' => ['burn', 'destroy token', 'سوزاندن', 'از بین بردن']],
        ['name' => 'Transfer From page', 'uri' => 'transferFrom', 'keywords' => ['transfer from', 'send on behalf', 'ارسال از طرف']],
        ['name' => 'Allowance page', 'uri' => 'allowance', 'keywords' => ['allowance', 'spending limit', 'مقدار مجاز', 'محدودیت']],
        ['name' => 'Freeze page', 'uri' => 'freeze', 'keywords' => ['freeze', 'lock token', 'قفل', 'فریز']],
        ['name' => 'Pause page', 'uri' => 'pause', 'keywords' => ['pause', 'halt transactions', 'توقف', 'مکث']],

        ['name' => 'Settings page', 'uri' => 'settings', 'keywords' => [
            'settings', 'change password', 'update email', 'account settings', 'edit account',
            'security', 'user info', 'change email', 'preferences', 'account info',
            'profile settings', 'update profile', 'email change', 'password change', 'login settings',
            'security settings', 'authentication', 'account update', 'user settings', 'account',
            'تنظیمات', 'تغییر رمز عبور', 'ایمیل جدید', 'حساب کاربری', 'ویرایش حساب',
            'امنیت', 'اطلاعات کاربر', 'پروفایل', 'تنظیمات امنیتی'
        ]],

        ['name' => 'Notify page', 'uri' => 'notify', 'keywords' => ['notifications', 'notify', 'alerts', 'اعلان‌ها', 'اطلاعیه']],
        ['name' => 'ICO (Initial Coin Offering) page', 'uri' => 'ico', 'keywords' => ['ico', 'initial coin offering', 'public sale', 'عرضه اولیه', 'فروش عمومی']],
        ['name' => 'Advanced Features page', 'uri' => 'advance', 'keywords' => ['advanced', 'extra features', 'ویژگی‌های پیشرفته']],
        ['name' => 'ChatBot page', 'uri' => 'chat', 'keywords' => ['chatbot', 'chat', 'support', 'چت', 'ربات گفتگو', 'پشتیبانی']],
        ['name' => 'Manage References page', 'uri' => 'manageRef', 'keywords' => ['references', 'manage references', 'ارجاعات', 'مدیریت ارجاع']],
        ['name' => 'News page', 'uri' => 'news.index', 'keywords' => ['news', 'latest updates', 'اخبار', 'به‌روزرسانی']],
        ['name' => 'Ads page', 'uri' => 'ad.index', 'keywords' => ['ads', 'advertisements', 'تبلیغات']],
        ['name' => 'Show Ad page', 'uri' => 'ad.showAd', 'keywords' => ['show ad', 'view ad', 'نمایش تبلیغ']],
        ['name' => 'Help page', 'uri' => 'help', 'keywords' => ['help', 'support', 'faq', 'راهنما', 'پشتیبانی']],
        ['name' => 'Privacy Policy page', 'uri' => 'privacyPolicy', 'keywords' => ['privacy', 'policy', 'data', 'حریم خصوصی', 'سیاست']],
        ['name' => 'Profile page', 'uri' => 'profile.edit', 'keywords' => ['profile', 'edit profile', 'user info', 'پروفایل', 'ویرایش پروفایل', 'اطلاعات کاربر']],
    ];

    $results = collect($pages)->filter(function ($page) use ($query) {
        $nameMatch = str_contains(strtolower($page['name']), $query);

        $keywordMatch = isset($page['keywords']) &&
            collect($page['keywords'])->contains(function ($keyword) use ($query) {
                return str_contains(strtolower($keyword), $query);
            });

        return $nameMatch || $keywordMatch;
    })->values();

    return response()->json($results);
}

}
