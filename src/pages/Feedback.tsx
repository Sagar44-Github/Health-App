import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type FeedbackItem = { name?: string; message: string; date: string };

const Feedback = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [items, setItems] = useState<FeedbackItem[]>([]);

  const storageKey = "user-feedback-items";

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {}
    }
  }, []);

  const saveItems = (list: FeedbackItem[]) => {
    setItems(list);
    localStorage.setItem(storageKey, JSON.stringify(list));
  };

  const submit = () => {
    if (!message.trim()) return;
    const entry: FeedbackItem = {
      name: name.trim() || undefined,
      message: message.trim(),
      date: new Date().toISOString(),
    };
    const next = [entry, ...items];
    saveItems(next);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1500);
    setName("");
    setMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
      <Card className="content-card">
        <CardHeader>
          <CardTitle>Share Your Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            rows={5}
            placeholder="Your feedback helps us improve"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            onClick={submit}
            disabled={!message.trim()}
            className="w-full"
          >
            Submit
          </Button>
          {submitted && (
            <div className="text-sm text-green-600">
              Thank you for your feedback!
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="content-card">
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No feedback yet. Be the first to share.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((f, idx) => (
                <div key={idx} className="p-3 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-sm">
                      {f.name || "Anonymous"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(f.date).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm text-foreground/90">{f.message}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;
