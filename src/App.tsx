/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Markdown from 'react-markdown';
import { Bot, FileText, Settings, User, Copy, Loader2, Sparkles, Trash2 } from 'lucide-react';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || '生成過程發生錯誤');
      }
      setOutput(data.result);
    } catch (error: any) {
      setOutput(error.message || '生成過程發生錯誤，請稍後再試。');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] font-sans text-slate-800 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-20 bg-[#1e293b] flex flex-col items-center py-6 gap-8 border-r border-slate-200">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
          AI
        </div>
        <nav className="flex flex-col gap-6">
          <div className="p-3 bg-slate-700/50 rounded-lg text-indigo-300">
            <FileText className="w-6 h-6" />
          </div>
          <div className="p-3 text-slate-400 hover:text-slate-200 cursor-pointer">
            <Settings className="w-6 h-6" />
          </div>
          <div className="p-3 text-slate-400 hover:text-slate-200 cursor-pointer">
            <Bot className="w-6 h-6" />
          </div>
        </nav>
        <div className="mt-auto">
          <div className="w-10 h-10 rounded-full bg-slate-600 border-2 border-slate-500 overflow-hidden">
            <User className="w-full h-full p-2 text-white" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">AI 會議紀錄生成與翻譯工具</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Gemini Pro API 已連接
            </div>
          </div>
        </header>

        {/* Workspace Container */}
        <div className="flex-1 p-4 md:p-6 flex flex-col md:flex-row gap-6 overflow-hidden">
          {/* Input Section */}
          <section className="w-full md:w-5/12 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">會議逐字稿 / 重點筆記</h2>
              <button 
                onClick={() => setInput('')}
                className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                清除內容
              </button>
            </div>
            <div className="flex-1 relative group">
              <textarea 
                className="w-full h-full p-5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-slate-700 leading-relaxed transition-all"
                placeholder="請貼上會議逐字稿或重點筆記內容..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="absolute bottom-4 right-4 text-xs text-slate-400 bg-white/80 px-2 py-1 rounded">
                字數：{input.length}
              </div>
            </div>
            <button 
              onClick={handleGenerate}
              disabled={loading || !input}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              {loading ? '正在生成...' : '生成總結與翻譯'}
            </button>
          </section>

          {/* Output Section */}
          <section className="w-full md:w-7/12 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">AI 處理結果</h2>
              <button 
                onClick={copyToClipboard}
                disabled={!output}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-sm disabled:opacity-50"
              >
                <Copy className="w-4 h-4" />
                一鍵複製
              </button>
            </div>
            <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-8 overflow-y-auto prose prose-slate max-w-none">
              {output ? (
                <Markdown>{output}</Markdown>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 italic">
                  AI 生成的內容將會顯示在這裡...
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

