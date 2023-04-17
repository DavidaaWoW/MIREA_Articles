import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import {router} from '@inertiajs/react'

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import {useEffect} from "react";
import DangerButton from "@/Components/DangerButton";

export default function MyArticles({auth, articles}) {
    const user = usePage().props.auth.user;
    const {data, setData, post, processing, errors, reset} = useForm({
        result: '',
        id: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('changeArticleStatus'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Мои статьи</h2>}
        >
            <Head title="My Articles"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {
                            articles.map((article) => {
                                return (
                                    <div>
                                        <span>{article.title}</span>
                                        <a href={route('download', article.id)}>Скачать файл</a>
                                        <br/>
                                        <form onSubmit={submit}>

                                            <DangerButton onClick={
                                                (e) => {setData({result: 'declined', id: article.id})}
                                            }>Отклонить</DangerButton>
                                            <PrimaryButton onClick={
                                                (e) => {setData({result: 'accepted', id: article.id})}
                                            }>Принять</PrimaryButton>
                                        </form>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
