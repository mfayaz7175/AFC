import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FiSend, FiMessageCircle, FiClock, FiCopy, FiRefreshCw } from "react-icons/fi";
import { usePage } from "@inertiajs/react";
import Header from "./BlurHeader";
import Footer from "@/Components/News/Footer";
import { useTranslation } from "react-i18next";

const API_KEY = "AIzaSyDqlZJ7zNj_m0rsaWZUmD50850PjgO-ct8";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const ChatBot = () => {
  const { auth } = usePage().props;
  const { t } = useTranslation();

  const [messages, setMessages] = useState([
    { text: t("chatbot.initialMessage"), sender: "bot", timestamp: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState("");
  const [history, setHistory] = useState([
    { role: "model", parts: [{ text: t("chatbot.initialMessage") }] }
  ]);

  useEffect(() => {
    fetch("/docs/7th_Semester_Work_Report.txt")
      .then((res) => res.text())
      .then((text) => setContext(text))
      .catch((err) => console.error("Error loading AFCoin file:", err));
  }, []);

  const getBotResponse = async (userInput) => {
    setIsTyping(true);
    try {
      const newHistory = [...history, { role: "user", parts: [{ text: userInput }] }];

      const systemMessage = `You are **AFC Chat Bot**, the official assistant for AFCoin. You respond based **only** on the AFCoin content loaded in memory. You are not allowed to use or refer to any external sources.

🌐 **Language Support:**
- Detect the user's language automatically (**English**, **Persian (فارسی)**, or **mixed**) and respond in the same or matching format.
- If the message contains both English and Persian, you may respond using both languages in a helpful way.
- Always be polite, clear, and user-friendly in the language the user prefers.

📋 **Your Behavior Guidelines:**

1. **Identity Questions:**
   If asked "Who are you?" or "تو کی هستی؟":
   - English: "I am AFC Chat Bot."
   - Persian: "من ربات گفت‌وگوی AFC هستم."

2. **General Knowledge Requests:**
   If asked "What do you know?" or "در مورد چه معلومات داری؟":
   - Respond with a **brief overview** of AFCoin’s features and functionality from the context.

3. **Unrelated Questions:**
   If the question is not related to AFCoin:
   - English: "I’m sorry, but I don’t have information on that."
   - Persian: "متأسفم، اما درباره این موضوع اطلاعاتی ندارم."

4. **Repeated Questions:**
   If the user repeats the same question:
   - Change your wording slightly, like:
     - English: "Sure! Here's that again:"
     - Persian: "حتماً، دوباره توضیح می‌دهم:"

5. **Tone and Style:**
   - Be concise, confident, friendly.
   - Never mention documents, files, or external sources.
   - Do not say “based on memory” or “based on the document” — just answer naturally.

6. **Understanding User Intent:**
   If user asks "What are you looking for?" or similar:
   - Reply: "You can search users, coins, transactions, pages, news, or anything on the platform."

7. **Location of Features:**
   If user asks where to find something (e.g., "Where do I change my password?" / "کجا رمز عبور را تغییر دهم؟"):
   - Just say: "Search for it in the search bar."
   - Examples:
     - English: "To change your password, type 'Change password' in the search bar."
     - Persian: "برای تغییر رمز عبور، عبارت 'تغییر رمز عبور' را در نوار جستجو وارد کنید."

8. **Universal Search Guide / راهنمای جامع جستجو**

📍 **English**
You can find any page or feature by typing keywords in the search bar.
Search supports both **English** and **Persian** keywords.

**Examples:**
- Change password
- Transfer coins
- Mint tokens
- Notifications
- Account settings
- News and updates
- Help and support
- Privacy policy
- Chatbot

📍 **فارسی**
می‌توانید با وارد کردن کلمات کلیدی در نوار جستجو، هر صفحه یا ویژگی را پیدا کنید.
جستجو از هر دو زبان **انگلیسی** و **فارسی** پشتیبانی می‌کند.

**مثال‌ها:**
- تغییر رمز عبور
- انتقال سکه
- ساخت توکن
- اعلان‌ها
- تنظیمات حساب
- اخبار و به‌روزرسانی‌ها
- راهنما و پشتیبانی
- سیاست حفظ حریم خصوصی
- چت‌بات

Just type your question or keywords, and click on the results to open the page.
کافی است سوال یا عبارت مرتبط را تایپ کرده و روی نتایج کلیک کنید.

9. **Rephrasing Answers:**
   When the same question is asked again, change your wording while keeping the answer the same.

10. **Short Location Responses:**
   When the user asks only for where to find something, respond with a **short, direct location answer**.

11. **Mixed-language Support:**
   - If the user's message contains both English and Persian, respond in a helpful way that matches their usage.
   - Examples:
     - User: "چطور coin انتقال بدم؟"
       Bot: "برای انتقال سکه، در نوار جستجو بنویسید 'Transfer coins'."

12. **Stick to Instructions:**
   - Always follow the above rules.
   - Never refer to knowledge or topics outside of the AFCoin platform.

Context (truncated):
${context.slice(0, 3000)}`;

      const contents = [
        { role: "user", parts: [{ text: systemMessage }] },
        ...newHistory
      ];

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents })
      });

      const data = await res.json();
      if (data.candidates && data.candidates.length > 0) {
        const reply = data.candidates[0].content.parts[0].text;
        setHistory([...newHistory, { role: "model", parts: [{ text: reply }] }]);
        return reply;
      } else {
        console.warn("Unexpected response from Gemini:", data);
        return t("chatbot.error_contact");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return t("chatbot.error_contact");
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, sender: "user", timestamp: new Date() }]);
    setInput("");
    const botText = await getBotResponse(input);
    setMessages(prev => [...prev, { text: botText, sender: "bot", timestamp: new Date() }]);
  };

  const handleClear = () => {
    setMessages([{ text: t("chatbot.initialMessage"), sender: "bot", timestamp: new Date() }]);
    setHistory([{ role: "model", parts: [{ text: t("chatbot.initialMessage") }] }]);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleRegenerate = async (idx) => {
    const prev = messages[idx - 1];
    if (!prev || prev.sender !== "user") return;
    setIsTyping(true);
    const newText = await getBotResponse(prev.text);
    setMessages(msgs => msgs.map((m, i) => i === idx ? { ...m, text: newText, timestamp: new Date() } : m));
    setIsTyping(false);
  };

  return (
    <AuthenticatedLayout>
      <Header title={t("chatbot.header")} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <FiMessageCircle className="text-3xl text-white/90 p-2 bg-white/10 rounded-xl backdrop-blur-sm" />
              <div>
                <h2 className="text-2xl font-bold">{t("chatbot.header")}</h2>
                <p className="text-sm opacity-80">{t("chatbot.powered_by AFC Team")}</p>
              </div>
            </div>
            <button onClick={handleClear} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
              {t("chatbot.clearButton")}
            </button>
          </div>
          <div className="chat-window h-[500px] p-6 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
                <div className={`relative max-w-[85%] flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.sender === "bot" && <FiMessageCircle className="text-lg text-white p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />}
                  <div className={`p-4 rounded-2xl ${msg.sender === "bot" ? "bg-white/10 border border-white/20" : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}>
                    <div className="flex items-center gap-2 mb-2 text-sm opacity-80">
                      <FiClock />
                      <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <button onClick={() => handleCopy(msg.text)} className="ml-auto"><FiCopy /></button>
                      {msg.sender === "bot" && idx > 0 && messages[idx - 1].sender === "user" && (
                        <button onClick={() => handleRegenerate(idx)}><FiRefreshCw /></button>
                      )}
                    </div>
                    <div>{msg.text}</div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/20 p-4 rounded-2xl">{t("chatbot.typing")}</div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-4 p-4 border-t border-white/20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chatbot.placeholder")}
              className="flex-grow p-3 rounded-xl bg-black/50 border border-white/20 text-white"
            />
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl">
              <FiSend />
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </AuthenticatedLayout>
  );
};

export default ChatBot;
