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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 Form">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h1>Статья: {article.title}</h1>
                        <a href={route('anotherProfile', article.user_id)}>Автор: {article.name}</a>
                        <br/>
                        <a href={route('getArticlesByUDC', article.udc)}>УДК: {article.udc}</a>
                        <br/>
                        <p>Индексируемость: {article.indexability}</p>
                        <br/>
                        <p>Место публицации:{article.publication_place}</p>
                        <br/>
                        <p>Научный руководитель: {article.scientific_adviser}</p>
                        <br/>
                        <a className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150" href={route('download', article.id)}>Скачать файл</a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
