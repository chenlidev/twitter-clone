"use client";

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {usePathname, useRouter} from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem, FormLabel,
} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {TweetValidation} from "@/lib/validations/tweet";
import {composeTweet} from "@/lib/actions/tweet.actions";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";

interface Props {
    userId: string;
    userImage: string;
    onClose?: () => void;
}

function PostTweet({ userId, userImage, onClose }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const form = useForm<z.infer<typeof TweetValidation>>({
        resolver: zodResolver(TweetValidation),
        defaultValues: {
            tweet: "",
            accountId: userId,
        },
    });

    const onSubmit = async (values: z.infer<typeof TweetValidation>) => {
        try {
            await composeTweet({
                text: values.tweet,
                author: userId,
                path: pathname,
            });

            // Reset the form fields to default values
            form.reset({
                tweet: '',
                accountId: userId,
            });

            router.push("/");
            onClose && onClose();
        } catch (error) {
            console.error("Failed to post tweet:", error);
            // Handle the error appropriately
        }
    };

    const [isInputEmpty, setIsInputEmpty] = useState(true);

    // Update the state based on the input field's content
    useEffect(() => {
        setIsInputEmpty(form.watch('tweet').length === 0);
    }, [form.watch('tweet')]);

    return (
        <Form {...form}>
            <form
                className='flex gap-3 items-center'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                    <FormField
                        control={form.control}
                        name='tweet'
                        render={({ field }) => (
                            <FormItem className='flex flex-grow items-center gap-3'>
                                <FormLabel className='relative h-11 w-11 flex-shrink-0'>
                                    <Image
                                        src={userImage || '/assets/default-profile.png'}
                                        alt='current_user'
                                        layout='fill'
                                        className='rounded-full'
                                    />
                                </FormLabel>
                                <FormControl className='flex-grow border-none bg-transparent'>
                                    <Input
                                        type='text'
                                        {...field}
                                        placeholder="What's happening?"
                                        className='text-dark-1 outline-none'
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                <Button
                    type='submit'
                    className={`sm:text-sm rounded-2xl ${isInputEmpty ? 'bg-gray-500 cursor-default' : 'bg-primary-500 cursor-pointer'}`}
                    disabled={isInputEmpty}
                >
                    Post
                </Button>

            </form>
        </Form>
    );
}

export default PostTweet;
