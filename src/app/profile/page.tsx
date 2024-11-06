"use client";

import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

const profileFormSchema = z.object({
    username: z
        .string()
        .min(2, {
        message: "Username must be at least 2 characters.",
        })
        .max(30, {
        message: "Username must not be longer than 30 characters.",
        }),
    email: z
        .string({
        required_error: "Please select an email to display.",
        })
        .email(),
    bio: z.string().max(160).min(4),
    urls: z
        .array(
        z.object({
            value: z.string().url({ message: "Please enter a valid URL." }),
        })
        )
        .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {

    const { data: session } = useSession();
    if (!session) {
        redirect(authOptions?.pages?.signIn || "/signin")
    }
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
        username: "",
        email: session?.user?.email || "",
        bio: "",
        urls: [{ value: "" }],
        },
    });

    function onSubmit(data: ProfileFormValues) {
        console.log(data);
    }

    return (
        <div className="container mx-auto py-10">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                    <AvatarImage src={session?.user?.image || ""} />
                    <AvatarFallback>
                        {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                    </Avatar>
                    <div>
                    <CardTitle className="text-2xl font-bold">Profile</CardTitle>
                    <CardDescription>
                        Manage your public profile information
                    </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                        <Input placeholder="Your username" {...field} />
                        </FormControl>
                        <FormDescription>
                        This is your public display name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="Your email"
                            type="email"
                            {...field}
                        />
                        </FormControl>
                        <FormDescription>
                        Your email address will be used for notifications.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                        />
                        </FormControl>
                        <FormDescription>
                        Brief description for your profile. URLs are hyperlinked.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit">Update profile</Button>
                </div>
                </form>
            </Form>
            </CardContent>
        </Card>
        </div>
    );
}