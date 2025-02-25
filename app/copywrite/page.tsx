"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { LoaderCircle, Send } from "lucide-react";

export default function Home() {
  const [output, setOutput] = useState<string | null>(null);
  const [type, setType] = useState<string>("");
  const [blog, setBlog] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async (data: { type: string; blog: string }) => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setOutput(result);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AI Insurance Copywriter</CardTitle>
          <CardDescription>
            Generate professional insurance-related content with AI assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Content Type</label>
            <Select onValueChange={setType} value={type}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newsletter">Newsletter</SelectItem>
                <SelectItem value="blog">Blog Article</SelectItem>
                <SelectItem value="social">Social Media Post</SelectItem>
                <SelectItem value="email">Email Campaign</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Topic</label>
            <Textarea
              placeholder="Enter the topic or subject matter you want to write about..."
              value={blog}
              onChange={(e) => setBlog(e.target.value)}
              className="min-h-24"
            />
          </div>

          <Button
            onClick={() => handleGenerate({ type, blog })}
            disabled={!type || !blog || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Generate Copy
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={output} readOnly className="min-h-48" />
          </CardContent>
          <CardFooter className="justify-end space-x-2">
            <Button variant="outline">Edit</Button>
            <Button onClick={handleCopy}>
              {isCopied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
