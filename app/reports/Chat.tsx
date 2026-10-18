"use client";

import { useState } from "react";
import { IAiChatMessage } from "@/interface/ai_report.interface";
import { useAskAiReportMutation } from "@/service/ai_report.service";
import GButton from "@/components/generic/GButton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";

interface IProps {
  dateRange: { from: string; to: string };
}

const Chat = ({ dateRange }: IProps) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<IAiChatMessage[]>([]);

  const [askAiReport, { isLoading }] = useAskAiReportMutation();

  const handleAskQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentQuestion = question.trim();

    if (!currentQuestion || isLoading) return;

    if (!dateRange.from || !dateRange.to) {
      toast.error("Please apply a date range first.");
      return;
    }

    setQuestion("");

    try {
      const result = await askAiReport({
        question: currentQuestion,
        from: dateRange.from,
        to: dateRange.to,
        history: messages.slice(-10),
      }).unwrap();

      setMessages(previous => [...previous, { role: "user", content: currentQuestion }, { role: "assistant", content: result.answer }]);
    } catch {
      setQuestion(currentQuestion);
      toast.error("Failed to get an answer.");
    }
  };

  const suggestions = ["Which designer has the highest quantity?", "Summarize overall performance.", "Which clients have the most projects?"];

  return (
    <section className="space-y-4 rounded-xl border border-[#449690]/20 p-4 sm:p-6">
      <div>
        <h2 className="text-lg font-semibold">Report Assistant</h2>
        <p className="mt-1 text-sm text-muted-foreground">Ask questions about your reports for the selected date range.</p>
        {dateRange.from && dateRange.to && (
          <p className="mt-2 text-sm text-muted-foreground">
            Date Range: {dateRange.from} to {dateRange.to}
          </p>
        )}
      </div>

      <div className="max-h-105 space-y-3 overflow-y-auto">
        {messages.length === 0 && !isLoading && (
          <div className="rounded-lg border border-dashed p-5 text-center">
            <p className="text-sm text-muted-foreground">Start a conversation about your Seema&apos;s Cloud Talk reports.</p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {suggestions.map(suggestion => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setQuestion(suggestion)}
                  className="rounded-full border px-3 py-1.5 text-xs transition hover:border-[#449690] hover:text-[#449690]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={`${index}-${message.role}`}
            className={`rounded-lg p-3 text-sm leading-7 ${
              message.role === "user" ? "ml-4 bg-[#449690]/10 sm:ml-8" : "mr-4 border border-border/50 bg-muted/50 sm:mr-8"
            }`}
          >
            <p className="mb-2 text-xs font-semibold text-muted-foreground">{message.role === "user" ? "You" : "Seema's Cloud Talk AI"}</p>

            <div
              className="
              break-words
              [&_h1]:mb-3 [&_h1]:mt-5 [&_h1]:text-lg [&_h1]:font-bold
              [&_h2]:mb-2 [&_h2]:mt-5 [&_h2]:text-base [&_h2]:font-semibold
              [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-sm [&_h3]:font-semibold
              [&_p]:my-2
              [&_ul]:my-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5
              [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5
              [&_li]:pl-1
              [&_strong]:font-semibold
              [&_blockquote]:my-3 [&_blockquote]:border-l-2
              [&_blockquote]:border-[#449690] [&_blockquote]:pl-3
              [&_hr]:my-4 [&_hr]:border-border
              [&_a]:text-[#449690] [&_a]:underline
              [&_pre]:my-3 [&_pre]:overflow-x-auto
              [&_pre]:rounded-md [&_pre]:bg-background [&_pre]:p-3
              [&_code]:rounded [&_code]:bg-background
              [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs
              [&_pre_code]:bg-transparent [&_pre_code]:p-0
              [&_table]:w-full [&_table]:my-3 [&_table]:text-xs
              [&_th]:border [&_th]:p-2 [&_th]:text-left
              [&_td]:border [&_td]:p-2
            "
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="mr-4 rounded-lg border border-border/50 bg-muted/50 p-3 sm:mr-8">
            <p className="mb-2 text-xs font-semibold text-muted-foreground">Seema&apos;s Cloud Talk AI</p>
            <p className="animate-pulse text-sm text-muted-foreground">Analyzing your report...</p>
          </div>
        )}
      </div>

      <form onSubmit={handleAskQuestion} className="flex gap-2">
        <input
          value={question}
          onChange={event => setQuestion(event.target.value)}
          placeholder="Ask about designers, clients, or projects..."
          maxLength={2000}
          className="min-w-0 flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-[#449690]"
        />

        <GButton action="submit" type="submit" loading={isLoading} disabled={isLoading || !question.trim()} />
      </form>
    </section>
  );
};

export default Chat;
