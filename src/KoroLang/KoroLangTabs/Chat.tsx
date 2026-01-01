"use client";

import React from 'react'

import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from "../../components/ui/shadcn-io/ai/conversation";

import { ChatStatus, generateText } from 'ai';
import { Message, MessageContent } from "../../components/ui/shadcn-io/ai/message";
import {
    PromptInput,
    PromptInputTextarea,
    PromptInputSubmit,
} from "../../components/ui/shadcn-io/ai/prompt-input";
import { Response } from "../../components/ui/shadcn-io/ai/response";
import { useState } from "react";
import { openaiClient } from '../../openaiClient';


type MensajeChat = {
    emisor: "user" | "assistant" | "system";
    contenido: string;
}

const Chat = () => {
    const [input, setInput] = useState("");
    const [inputDisabled, setInputDisabled] = useState(false);
    const [messages, setMessages] = useState<MensajeChat[]>([]);
    const [status, setStatus] = useState<ChatStatus | undefined>("ready");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!input.trim()) return;

        const userMessage: MensajeChat = {
            emisor: "user",
            contenido: input,
        };

        setMessages(prev => [...prev, userMessage]);
        setStatus('submitted');
        setInputDisabled(true);
        
        try {
            const {output_text} = await openaiClient.responses.create({
                model: "gpt-5-nano",
                input: input
            });

            const assistantMessage: MensajeChat = {
                emisor: "assistant",
                contenido: output_text
            }
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { emisor: "assistant", contenido: "Sorry! I am not available at this moment" }]);
        } finally {
            setStatus('ready');
            setInput("");
            setInputDisabled(false);
        }
    }

    return (
        <div className="flex flex-col gap-10 p-6 w-full h-full overflow-y">
            <h1 className="text-2xl font-bold">Chat</h1>
            <div className='h-full flex flex-col justify-around'>
                <Conversation className="relative w-full" >
                    <ConversationContent>
                        {messages.map(message => (
                            <Message from={message.emisor}>
                                <MessageContent>
                                    {message.contenido}
                                </MessageContent>
                            </Message>
                        ))}
                    </ConversationContent>
                    <ConversationScrollButton />
                </Conversation>
                <PromptInput onSubmit={handleSubmit} className=" border-1 mt-4 items-center flex">
                    <PromptInputTextarea
                        value={input}
                        disabled={inputDisabled}
                        placeholder="Say something..."
                        onChange={(e) => setInput(e.currentTarget.value)}
                    />
                    <PromptInputSubmit className='mr-3' status={status} disabled={status !== 'ready'} />
                </PromptInput>
            </div>
        </div>
    )
}

export default Chat