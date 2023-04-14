import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import {useEffect} from "react";

export default function SingleArticle({auth, article}) {
    const user = usePage().props.auth.user;
    const {data, setData, post, processing, errors, reset} = useForm({
    });


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{article.title}</h2>}
        >
            <Head title={article.title}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h1>Статья: {article.title}</h1>
                        <a href={route('anotherProfile', article.user_id)}>Автор: {article.name}</a>
                        <br/>
                        <a href={route('getArticlesByUDC', article.udc)}>УДК: {article.udc}</a>
                        <br/>
                        <a href={route('download', article.id)}>Скачать файл</a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
