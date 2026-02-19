// @ts-ignore
import "./App.css";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/accordion";
import { Button } from "./components/button";
import { Copy } from "lucide-react";
import { Toaster } from "./components/sonner";
import { toast } from "sonner";
function App() {
  const [clipboardText, setClipboardText] = useState<string[]>([]);

  async function readTheClipboard() {
    const text = await window.api?.readClipboard();
    console.log("Clipboard:", text);
    setClipboardText((prev) => {
      if (prev.includes(text)) return prev;
      return [...prev, text];
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      readTheClipboard();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Updated:", clipboardText);
    <Toaster />;
  }, [clipboardText]);

  function copyText(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log(text);
      toast.success("Copied!", {
        style: {
          background: "#111827",
          color: "#10b981",
          border: "1px solid #1f2937",
        },
        duration: 1000,
      });
    });
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <Toaster position="top-center" richColors expand />
      <div className="w-full max-w-md space-y-4">
        <Accordion
          type="single"
          collapsible
          className="max-w-lg rounded-lg"
          defaultValue="billing"
        >
          {[...clipboardText].reverse().map((item) => (
            <AccordionItem key={item} value={item}>
              <AccordionTrigger>
                <div className="flex flex-row justify-between items-center ">
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-5 mr-5 hover: bg-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyText(item);
                    }}
                  >
                    <Copy />
                  </Button>
                  <p>{item?.substring(0, 35)} </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p>{item}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default App;
