import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/axios';
import { useEffect, useState } from 'react';

interface Prompt {
    id: string
    title: string
    template: string
}

interface PromptSelectedProps {
    onPromptSelected: (template: string) => void
}
export function PromptSelect(props: PromptSelectedProps) {
    const [prompts, setPrompts] = useState<Prompt[] | null>(null)

    useEffect(() => {
        api.get('/prompts').then(response => {
            setPrompts(response.data)
        })
    }, [])

    function handlePromptSelected(promptId: string) {
        const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

        if (!selectedPrompt) return

        props.onPromptSelected(selectedPrompt.template)
    }

    return (
        <Select onValueChange={handlePromptSelected}>
            <SelectTrigger>
                <SelectValue placeholder="Selecione um prompt" />
            </SelectTrigger>
            <SelectContent>
                {prompts?.map((prompt, index) => {
                    return (
                        <SelectItem key={index} value={prompt.id}>
                            {prompt.title}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}