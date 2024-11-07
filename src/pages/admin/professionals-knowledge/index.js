"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";

// This would typically come from an API or database
const knowledgeAreas = [
  {
    id: 1,
    title: "Natural Language Processing",
    description: "Understanding and generating human language",
    tags: ["NLP", "Language Models", "Text Analysis"],
  },
  {
    id: 2,
    title: "Computer Vision",
    description: "Interpreting and analyzing visual information from the world",
    tags: ["Image Recognition", "Object Detection", "Face Recognition"],
  },
  {
    id: 3,
    title: "Machine Learning",
    description: "Algorithms and statistical models for task performance",
    tags: ["Supervised Learning", "Unsupervised Learning", "Deep Learning"],
  },
  {
    id: 4,
    title: "Robotics",
    description: "Design, construction, and use of robots",
    tags: ["Robot Control", "Path Planning", "Sensor Fusion"],
  },
  {
    id: 5,
    title: "Speech Recognition",
    description: "Converting spoken language into text",
    tags: ["Audio Processing", "Phonetics", "Language Models"],
  },
  {
    id: 6,
    title: "Expert Systems",
    description: "AI systems that emulate decision-making of a human expert",
    tags: ["Knowledge Base", "Inference Engine", "Rule-Based Systems"],
  },
];

export default function KnowledgePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredKnowledge = knowledgeAreas.filter(
    (area) =>
      area.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Agents Knowledge Base</h1>
      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search knowledge areas..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredKnowledge.map((area) => (
          <Link key={area.id} href={`${router.asPath}/${area.id}`}>
            <Card className="cursor-pointer">
              <CardHeader>
                <CardTitle>{area.title}</CardTitle>
                <CardDescription>{area.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {area.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {filteredKnowledge.length === 0 && (
        <p className="text-center text-muted-foreground mt-6">
          No knowledge areas found matching your search.
        </p>
      )}
    </div>
  );
}
