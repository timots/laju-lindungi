"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Sun,
  Moon,
  Trash2,
  Edit,
  Plus,
  RefreshCw,
  Upload,
  Youtube,
  Globe,
  FileText,
  BrainCircuit,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function KnowledgeView({ agentId = "123" }) {
  const [knowledgeItems, setKnowledgeItems] = useState([]);
  const [newItem, setNewItem] = useState({ type: "text", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Fetch knowledge items for the agent
    fetchKnowledgeItems();
  }, [agentId]);

  const fetchKnowledgeItems = async () => {
    setIsLoading(true);
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setKnowledgeItems([
        {
          id: "1",
          type: "website",
          content: "https://example.com",
          source: "Web scraping",
        },
        {
          id: "2",
          type: "text",
          content: "This is some generated text.",
          source: "AI Generation",
        },
        {
          id: "3",
          type: "youtube",
          content: "https://youtube.com/watch?v=dQw4w9WgXcQ",
          source: "YouTube Transcription",
        },
      ]);
    } catch (err) {
      setError("Failed to fetch knowledge items");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async () => {
    setIsLoading(true);
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const id = Math.random().toString(36).substr(2, 9);
      setKnowledgeItems((prev) => [...prev, { ...newItem, id }]);
      setNewItem({ type: "text", content: "" });
    } catch (err) {
      setError("Failed to add knowledge item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    setIsLoading(true);
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setKnowledgeItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to delete knowledge item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = async (id, updatedContent) => {
    setIsLoading(true);
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setKnowledgeItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, content: updatedContent } : item
        )
      );
    } catch (err) {
      setError("Failed to edit knowledge item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Knowledge View for Agent {agentId}
        </h1>
        <div className="flex items-center space-x-2">
          <Sun className="h-6 w-6" />
          <Switch
            checked={theme === "dark"}
            onCheckedChange={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          />
          <Moon className="h-6 w-6" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Knowledge</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="text" className="w-full">
            <TabsList>
              <TabsTrigger value="text">
                <FileText className="w-4 h-4 mr-2" />
                Text
              </TabsTrigger>
              <TabsTrigger value="website">
                <Globe className="w-4 h-4 mr-2" />
                Website
              </TabsTrigger>
              <TabsTrigger value="pdf">
                <Upload className="w-4 h-4 mr-2" />
                PDF
              </TabsTrigger>
              <TabsTrigger value="youtube">
                <Youtube className="w-4 h-4 mr-2" />
                YouTube
              </TabsTrigger>
              <TabsTrigger value="custom">
                <BrainCircuit className="w-4 h-4 mr-2" />
                Custom
              </TabsTrigger>
            </TabsList>
            <TabsContent value="text">
              <Textarea
                placeholder="Enter or generate text..."
                value={newItem.content}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    type: "text",
                    content: e.target.value,
                  })
                }
                className="mb-4"
              />
              <Button
                onClick={() =>
                  setNewItem({
                    ...newItem,
                    content:
                      "This is AI-generated text about " + newItem.content,
                  })
                }
              >
                Generate Text
              </Button>
            </TabsContent>
            <TabsContent value="website">
              <Input
                type="url"
                placeholder="Enter website URL to scrape"
                value={newItem.content}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    type: "website",
                    content: e.target.value,
                  })
                }
                className="mb-4"
              />
              <Button
                onClick={() =>
                  console.log("Scraping website:", newItem.content)
                }
              >
                Scrape Website
              </Button>
            </TabsContent>
            <TabsContent value="pdf">
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setNewItem({ ...newItem, type: "pdf", content: file.name });
                  }
                }}
                className="mb-4"
              />
              <Button
                onClick={() => console.log("Uploading PDF:", newItem.content)}
              >
                Upload PDF
              </Button>
            </TabsContent>
            <TabsContent value="youtube">
              <Input
                type="url"
                placeholder="Enter YouTube video URL"
                value={newItem.content}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    type: "youtube",
                    content: e.target.value,
                  })
                }
                className="mb-4"
              />
              <Button
                onClick={() =>
                  console.log("Transcribing YouTube video:", newItem.content)
                }
              >
                Transcribe Video
              </Button>
            </TabsContent>
            <TabsContent value="custom">
              <Textarea
                placeholder="Enter custom knowledge..."
                value={newItem.content}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    type: "custom",
                    content: e.target.value,
                  })
                }
                className="mb-4"
              />
            </TabsContent>
          </Tabs>
          <Button
            onClick={handleAddItem}
            className="mt-4"
            disabled={!newItem.content || isLoading}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Knowledge Item
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-4 gap-5">
        {knowledgeItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex justify-between items-start p-4">
              <div>
                <h3 className="font-semibold">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </h3>
                <p className="text-sm text-muted-foreground">{item.source}</p>
                <p className="mt-2">{item.content}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleEditItem(
                      item.id,
                      prompt("Edit content:", item.content) || item.content
                    )
                  }
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center">
          <RefreshCw className="h-8 w-8 animate-spin" />
        </div>
      )}
    </div>
  );
}
