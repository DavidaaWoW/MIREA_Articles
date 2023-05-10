import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import {useEffect} from "react";

export default function AnotherProfile({auth, articles = [], another_user}) {
    const user = usePage().props.auth.user;
    const {data, setData, post, processing, errors, reset} = useForm({

    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{another_user.name}</h2>}
        >
            <Head title={another_user.name}/>

            <div className="py-12 Form">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h1>Профиль пользователя: {another_user.name}</h1>
                        <h1>Институт: {another_user.institute}</h1>
                        <h1>Факультет: {another_user.faculty}</h1>
                        <h1>Учебная группа: {another_user.group}</h1>
                        <h1>Курс: {another_user.course}</h1>
                        <br/>
                        <span>Список статей пользователя:</span>
                        <br/>
                        {
                            articles.map((article) => {
                                return (
                                    <div className="Form">
                                        <a style={{backgroundColor: "rgb(147 197 253)", fontSize: "1.2em"}} href={route('singleArticle', article.id)}>{article.title}</a>
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
