"use client";

import { useState } from "react";
import GButton from "@/components/generic/GButton";
import { IAiChatMessage } from "@/interface/ai_report.interface";
import { useAskAiReportMutation } from "@/service/ai_report.service";
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

      <div className="max-h-[420px] space-y-3 overflow-y-auto">
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
            className={`rounded-lg p-3 text-sm leading-6 ${message.role === "user" ? "ml-4 bg-[#449690]/10 sm:ml-8" : "mr-4 bg-muted/50 sm:mr-8"}`}
          >
            <p className="mb-1 font-medium">{message.role === "user" ? "You" : "Seema's Cloud Talk AI"}</p>
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        ))}

        {isLoading && (
          <div className="mr-4 rounded-lg bg-muted/50 p-3 sm:mr-8">
            <p className="mb-1 text-sm font-medium">Seema&apos;s Cloud Talk AI</p>
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
