import type { ReactNode } from "react";
import {
    Code,
    Database,
    Globe,
    Server,
    Layout,
    Cpu,
    Cloud,
    GitBranch,
    Layers,
    Smartphone,
    Shield,
    Terminal,
    Zap,
    FileCode,
    Workflow,
    Briefcase,
    Wifi,
    Brain,
    Bot,
    Microscope,
    Atom,
    Blocks,
    Dices,
} from "lucide-react";

export const skillsData = {
    know: [
        {
            name: "Next.js",
            icon: <Globe size={36} />,
        },
        {
            name: "React",
            icon: <Layout size={36} />,
        },
        {
            name: "TypeScript",
            icon: <Code size={36} />,
        },
        {
            name: "Node.js",
            icon: <Server size={36} />,
        },
        {
            name: "Tailwind CSS",
            icon: <Layers size={36} />,
        },
        {
            name: "PostgreSQL",
            icon: <Database size={36} />,
        },
        {
            name: "GraphQL",
            icon: <FileCode size={36} />,
        },
        {
            name: "Docker",
            icon: <Briefcase size={36} />,
        },
        {
            name: "Git",
            icon: <GitBranch size={36} />,
        },
        {
            name: "Jest",
            icon: <Zap size={36} />,
        },
        {
            name: "Redux",
            icon: <Workflow size={36} />,
        },
        {
            name: "Prisma",
            icon: <Database size={36} />,
        },
    ],
    studying: [
        {
            name: "Rust",
            icon: <Cpu size={36} />,
        },
        {
            name: "AWS",
            icon: <Cloud size={36} />,
        },
        {
            name: "GraphQL",
            icon: <Database size={36} />,
        },
        {
            name: "React Native",
            icon: <Smartphone size={36} />,
        },
        {
            name: "Go",
            icon: <Code size={36} />,
        },
        {
            name: "Kubernetes",
            icon: <GitBranch size={36} />,
        },
        {
            name: "Svelte",
            icon: <Zap size={36} />,
        },
        {
            name: "Cybersecurity",
            icon: <Shield size={36} />,
        },
    ],
    future: [
        {
            name: "WebAssembly",
            icon: <Terminal size={36} />,
        },
        {
            name: "Machine Learning",
            icon: <Brain size={36} />,
        },
        {
            name: "AI Development",
            icon: <Bot size={36} />,
        },
        {
            name: "Data Science",
            icon: <Microscope size={36} />,
        },
        {
            name: "Quantum Computing",
            icon: <Atom size={36} />,
        },
        {
            name: "Blockchain",
            icon: <Blocks size={36} />,
        },
        {
            name: "Game Development",
            icon: <Dices size={36} />,
        },
        {
            name: "WebRTC",
            icon: <Wifi size={36} />,
        },
    ],
};
