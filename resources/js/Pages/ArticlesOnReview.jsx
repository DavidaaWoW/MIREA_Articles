import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import {router} from '@inertiajs/react'

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import {useEffect} from "react";
import DangerButton from "@/Components/DangerButton";
import '../../sass/stylesArticlesOnReview.scss'
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
                    <div className="articlesOnReviewList  overflow-hidden shadow-sm sm:rounded-lg">
                        {
                            articles.map((article) => {
                                return (
                                    <div className={"acceptPanel bg-blue-300"}>
                                        <div className={"spanPanel"}>
                                            <span className={"spanName"}>Title: {article.title}</span>
                                            <br/>
                                            <span className={"spanName"}>Indexability: {article.indexability}</span>
                                            <br/>
                                            <span className={"spanName"}>UDC: {article.udc}</span>
                                            <br/>
                                        </div>


                                        <br/>
                                        <form className={"dpsBtn"} onSubmit={submit}>

                                            <DangerButton onClick={
                                                (e) => {setData({result: 'declined', id: article.id})}
                                            }>Отклонить</DangerButton>
                                            <PrimaryButton onClick={
                                                (e) => {setData({result: 'accepted', id: article.id})}
                                            }>Принять</PrimaryButton>
                                            <SecondaryButton>
                                                <a href={route('download', article.id)}>Скачать файл</a>
                                            </SecondaryButton>
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
